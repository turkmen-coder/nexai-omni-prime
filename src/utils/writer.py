"""
Output Writer and Analytics
Handles efficient file writing and performance tracking
"""

import json
import logging
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from datetime import datetime
import os

logger = logging.getLogger(__name__)


class OutputWriter:
    """
    Efficient output file writer with analytics
    Supports multiple formats (txt, json, csv)
    """
    
    def __init__(
        self,
        output_file: str,
        format: str = 'txt',
        buffer_size: int = 8192
    ):
        """
        Initialize output writer
        
        Args:
            output_file: Path to output file
            format: Output format ('txt', 'json', 'csv')
            buffer_size: Write buffer size (bytes)
        """
        self.output_file = Path(output_file)
        self.format = format
        self.buffer_size = buffer_size
        self.buffer = []
        self.total_writes = 0
        self.total_bytes_written = 0
        self.start_time = datetime.now()
        
        # Validate format
        if format not in ['txt', 'json', 'csv']:
            raise ValueError(f"Unsupported format: {format}")
        
        logger.info(f"Initialized OutputWriter: {self.output_file} ({format})")
    
    def write(self, data: str, metadata: Optional[Dict] = None):
        """
        Write data to buffer
        Flushes to disk when buffer is full
        
        Args:
            data: Text data to write
            metadata: Optional metadata (used for json/csv)
        """
        self.buffer.append((data, metadata))
        
        # Flush if buffer full
        total_size = sum(len(item[0].encode('utf-8')) for item in self.buffer)
        if total_size >= self.buffer_size:
            self.flush()
    
    def flush(self):
        """Flush buffer to disk"""
        if not self.buffer:
            return
        
        try:
            with open(self.output_file, 'a', encoding='utf-8') as f:
                for data, metadata in self.buffer:
                    if self.format == 'txt':
                        f.write(data + '\n')
                    elif self.format == 'json':
                        obj = {'text': data}
                        if metadata:
                            obj.update(metadata)
                        f.write(json.dumps(obj, ensure_ascii=False) + '\n')
                    elif self.format == 'csv':
                        # Simple CSV: escape quotes
                        escaped = data.replace('"', '""')
                        f.write(f'"{escaped}"\n')
                    
                    self.total_writes += 1
                    self.total_bytes_written += len(data.encode('utf-8'))
            
            self.buffer = []
            
        except Exception as e:
            logger.error(f"Write error: {e}")
            raise
    
    def close(self):
        """Flush and close"""
        self.flush()
        logger.info(f"Writer closed. Wrote {self.total_writes} items")
    
    def get_stats(self) -> Dict:
        """Get write statistics"""
        elapsed = (datetime.now() - self.start_time).total_seconds()
        throughput = self.total_bytes_written / elapsed / 1024 / 1024 if elapsed > 0 else 0
        
        return {
            'total_writes': self.total_writes,
            'total_bytes': self.total_bytes_written,
            'elapsed_seconds': elapsed,
            'throughput_mbps': throughput,
            'output_file': str(self.output_file),
            'output_size_mb': self.output_file.stat().st_size / 1024 / 1024 if self.output_file.exists() else 0
        }


class Analytics:
    """
    Processing analytics and reporting
    """
    
    def __init__(self, name: str = 'data_processor'):
        """Initialize analytics"""
        self.name = name
        self.metrics = {
            'start_time': datetime.now(),
            'end_time': None,
            'total_input_bytes': 0,
            'total_output_bytes': 0,
            'total_chunks': 0,
            'reduction_percent': 0.0,
            'errors': 0,
            'processing_time_seconds': 0.0
        }
    
    def update(self, **kwargs):
        """Update metrics"""
        self.metrics.update(kwargs)
    
    def finalize(self):
        """Calculate final metrics"""
        self.metrics['end_time'] = datetime.now()
        
        elapsed = (
            self.metrics['end_time'] - self.metrics['start_time']
        ).total_seconds()
        self.metrics['processing_time_seconds'] = elapsed
        
        if self.metrics['total_input_bytes'] > 0:
            reduction = (
                (self.metrics['total_input_bytes'] - self.metrics['total_output_bytes']) /
                self.metrics['total_input_bytes'] * 100
            )
            self.metrics['reduction_percent'] = reduction
    
    def get_summary(self) -> str:
        """Get formatted summary"""
        summary = f"""
╔════════════════════════════════════════════════════╗
║       {self.name.upper()} - PROCESSING SUMMARY        ║
╚════════════════════════════════════════════════════╝

📊 Metrics:
  Chunks processed: {self.metrics['total_chunks']}
  Errors: {self.metrics['errors']}

📈 Data Reduction:
  Input size: {self.metrics['total_input_bytes'] / 1024 / 1024:.2f}MB
  Output size: {self.metrics['total_output_bytes'] / 1024 / 1024:.2f}MB
  Reduction: {self.metrics['reduction_percent']:.1f}%

⏱️  Performance:
  Duration: {self.metrics['processing_time_seconds']:.2f}s
  Throughput: {self.metrics['total_input_bytes'] / 1024 / 1024 / max(self.metrics['processing_time_seconds'], 0.1):.2f}MB/s

📅 Timestamps:
  Start: {self.metrics['start_time'].strftime('%Y-%m-%d %H:%M:%S')}
  End: {self.metrics['end_time'].strftime('%Y-%m-%d %H:%M:%S') if self.metrics['end_time'] else 'N/A'}
"""
        return summary
    
    def to_dict(self) -> Dict:
        """Export as dictionary"""
        return {
            'name': self.name,
            'start_time': self.metrics['start_time'].isoformat(),
            'end_time': self.metrics['end_time'].isoformat() if self.metrics['end_time'] else None,
            'total_input_bytes': self.metrics['total_input_bytes'],
            'total_output_bytes': self.metrics['total_output_bytes'],
            'total_chunks': self.metrics['total_chunks'],
            'reduction_percent': self.metrics['reduction_percent'],
            'errors': self.metrics['errors'],
            'processing_time_seconds': self.metrics['processing_time_seconds']
        }
    
    def save_to_json(self, filepath: str):
        """Save metrics to JSON file"""
        with open(filepath, 'w') as f:
            json.dump(self.to_dict(), f, indent=2)
        logger.info(f"Analytics saved to: {filepath}")


# ============================================
# UTILITY FUNCTIONS
# ============================================

def compare_files(input_file: str, output_file: str) -> Dict:
    """
    Compare input and output files
    
    Args:
        input_file: Path to input file
        output_file: Path to output file
        
    Returns:
        dict: Comparison metrics
    """
    input_path = Path(input_file)
    output_path = Path(output_file)
    
    if not input_path.exists() or not output_path.exists():
        raise FileNotFoundError("One or both files not found")
    
    input_size = input_path.stat().st_size
    output_size = output_path.stat().st_size
    reduction = (input_size - output_size) / input_size * 100 if input_size > 0 else 0
    
    return {
        'input_file': str(input_path),
        'output_file': str(output_path),
        'input_size_bytes': input_size,
        'output_size_bytes': output_size,
        'input_size_mb': input_size / 1024 / 1024,
        'output_size_mb': output_size / 1024 / 1024,
        'reduction_bytes': input_size - output_size,
        'reduction_percent': reduction
    }


def print_comparison(input_file: str, output_file: str):
    """Print file comparison"""
    try:
        comparison = compare_files(input_file, output_file)
        
        print(f"""
╔════════════════════════════════════════════════════╗
║          FILE COMPARISON REPORT                    ║
╚════════════════════════════════════════════════════╝

📁 Files:
  Input: {comparison['input_file']}
  Output: {comparison['output_file']}

📊 Sizes:
  Input: {comparison['input_size_mb']:.2f}MB ({comparison['input_size_bytes']} bytes)
  Output: {comparison['output_size_mb']:.2f}MB ({comparison['output_size_bytes']} bytes)

📈 Reduction:
  Saved: {comparison['reduction_bytes'] / 1024 / 1024:.2f}MB
  Reduction: {comparison['reduction_percent']:.1f}%
""")
    except Exception as e:
        logger.error(f"Comparison error: {e}")


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    
    # Example: Write and compare
    input_file = '/tmp/test_input.txt'
    output_file = '/tmp/test_output.txt'
    
    # Create test input
    print("Creating test files...")
    with open(input_file, 'w') as f:
        for i in range(1000):
            f.write(f"Line {i}: This is a sample line with some text and data.\n")
    
    # Write to output
    writer = OutputWriter(output_file)
    for i in range(100):
        writer.write(f"Reduced line {i}")
    writer.close()
    
    # Compare
    print_comparison(input_file, output_file)
    
    # Analytics
    analytics = Analytics('test_processor')
    analytics.update(
        total_input_bytes=Path(input_file).stat().st_size,
        total_output_bytes=Path(output_file).stat().st_size,
        total_chunks=100,
        errors=0,
        processing_time_seconds=2.5
    )
    analytics.finalize()
    print(analytics.get_summary())
