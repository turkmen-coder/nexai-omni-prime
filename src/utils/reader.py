"""
Memory-Safe Generator-Based File Reader
Reads large files in chunks without loading everything to RAM
"""

import os
from pathlib import Path
from typing import Generator, Optional
import logging

logger = logging.getLogger(__name__)


class FileReader:
    """
    Generator-based file reader for memory-efficient processing
    
    Memory Usage: O(chunk_size) - independent of file size!
    """
    
    def __init__(
        self,
        filepath: str,
        chunk_size: int = 1024 * 50,  # 50KB default
        encoding: str = 'utf-8',
        skip_empty: bool = True
    ):
        """
        Initialize file reader
        
        Args:
            filepath: Path to file
            chunk_size: Bytes to read per iteration (default 50KB)
            encoding: File encoding (default utf-8)
            skip_empty: Skip empty chunks (default True)
        """
        self.filepath = Path(filepath)
        self.chunk_size = chunk_size
        self.encoding = encoding
        self.skip_empty = skip_empty
        self.total_bytes = 0
        self.chunks_read = 0
        
        # Validation
        if not self.filepath.exists():
            raise FileNotFoundError(f"File not found: {filepath}")
        
        if not self.filepath.is_file():
            raise ValueError(f"Not a file: {filepath}")
        
        # Get file size
        self.file_size = self.filepath.stat().st_size
        logger.info(f"Opened file: {self.filepath.name} ({self._format_bytes(self.file_size)})")
    
    def read_chunks(self) -> Generator[str, None, None]:
        """
        Generator: Read file in chunks
        
        Yields:
            str: Text chunk
        
        Memory Usage: ~chunk_size (not file_size!)
        """
        try:
            with open(self.filepath, 'r', encoding=self.encoding, errors='replace') as f:
                while True:
                    chunk = f.read(self.chunk_size)
                    
                    if not chunk:
                        break
                    
                    # Skip empty chunks
                    if self.skip_empty and not chunk.strip():
                        continue
                    
                    self.total_bytes += len(chunk.encode(self.encoding))
                    self.chunks_read += 1
                    
                    yield chunk
                    
        except Exception as e:
            logger.error(f"Error reading file: {e}")
            raise
    
    def read_lines(self, max_lines_per_chunk: Optional[int] = None) -> Generator[str, None, None]:
        """
        Generator: Read file line by line (or grouped lines)
        
        Args:
            max_lines_per_chunk: Group lines into chunks of this size
            
        Yields:
            str: Line(s)
        """
        try:
            with open(self.filepath, 'r', encoding=self.encoding, errors='replace') as f:
                if max_lines_per_chunk is None:
                    # Read line by line
                    for line in f:
                        line = line.rstrip('\n')
                        if self.skip_empty and not line.strip():
                            continue
                        
                        self.total_bytes += len(line.encode(self.encoding))
                        self.chunks_read += 1
                        
                        yield line
                else:
                    # Group lines into chunks
                    chunk_lines = []
                    for line in f:
                        line = line.rstrip('\n')
                        if self.skip_empty and not line.strip():
                            continue
                        
                        chunk_lines.append(line)
                        
                        if len(chunk_lines) >= max_lines_per_chunk:
                            chunk = '\n'.join(chunk_lines)
                            self.total_bytes += len(chunk.encode(self.encoding))
                            self.chunks_read += 1
                            
                            yield chunk
                            chunk_lines = []
                    
                    # Yield remaining lines
                    if chunk_lines:
                        chunk = '\n'.join(chunk_lines)
                        self.total_bytes += len(chunk.encode(self.encoding))
                        self.chunks_read += 1
                        
                        yield chunk
                        
        except Exception as e:
            logger.error(f"Error reading lines: {e}")
            raise
    
    def get_stats(self) -> dict:
        """
        Get reading statistics
        
        Returns:
            dict: Stats about reading progress
        """
        return {
            'filepath': str(self.filepath),
            'file_size': self.file_size,
            'total_bytes_read': self.total_bytes,
            'chunks_read': self.chunks_read,
            'progress_percent': (self.total_bytes / self.file_size * 100) if self.file_size > 0 else 0,
            'chunk_size': self.chunk_size
        }
    
    def reset(self):
        """Reset statistics"""
        self.total_bytes = 0
        self.chunks_read = 0
    
    @staticmethod
    def _format_bytes(bytes_value: int) -> str:
        """Format bytes to human-readable format"""
        for unit in ['B', 'KB', 'MB', 'GB']:
            if bytes_value < 1024.0:
                return f"{bytes_value:.2f}{unit}"
            bytes_value /= 1024.0
        return f"{bytes_value:.2f}TB"


# ============================================
# UTILITY FUNCTIONS
# ============================================

def read_file_chunks(
    filepath: str,
    chunk_size: int = 1024 * 50
) -> Generator[str, None, None]:
    """
    Convenience function: Read file in chunks
    
    Args:
        filepath: Path to file
        chunk_size: Bytes per chunk (default 50KB)
        
    Yields:
        str: Text chunk
    """
    reader = FileReader(filepath, chunk_size)
    yield from reader.read_chunks()


def read_file_lines(
    filepath: str,
    max_lines_per_chunk: Optional[int] = None
) -> Generator[str, None, None]:
    """
    Convenience function: Read file lines
    
    Args:
        filepath: Path to file
        max_lines_per_chunk: Group lines (default: 1 line at a time)
        
    Yields:
        str: Line(s)
    """
    reader = FileReader(filepath)
    yield from reader.read_lines(max_lines_per_chunk)


if __name__ == '__main__':
    # Example usage
    import logging
    logging.basicConfig(level=logging.INFO)
    
    # Create test file
    test_file = '/tmp/test_large.txt'
    print(f"Creating test file: {test_file}")
    with open(test_file, 'w') as f:
        for i in range(10000):
            f.write(f"Line {i}: This is a sample line for testing the reader.\n")
    
    # Read in chunks
    print("\n--- Reading in chunks ---")
    reader = FileReader(test_file, chunk_size=1024)
    chunk_count = 0
    for chunk in reader.read_chunks():
        chunk_count += 1
        if chunk_count <= 3:
            print(f"Chunk {chunk_count}: {len(chunk)} bytes")
    
    print(f"\nTotal: {chunk_count} chunks")
    print(f"Stats: {reader.get_stats()}")
    
    # Read lines
    print("\n--- Reading lines (grouped by 100) ---")
    reader.reset()
    line_count = 0
    for chunk in reader.read_lines(max_lines_per_chunk=100):
        line_count += 1
        if line_count <= 2:
            lines = chunk.split('\n')
            print(f"Chunk {line_count}: {len(lines)} lines")
    
    print(f"Total: {line_count} chunks")
    
    # Cleanup
    os.remove(test_file)
    print("Test file removed.")
