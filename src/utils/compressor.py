#!/usr/bin/env python3
"""
High-Performance Parallel File Compressor
=========================================

Streaming compression engine with multiprocessing support.
Compresses large files without loading them entirely into RAM.

Features:
- Streaming compression (constant RAM usage regardless of file size)
- Multi-core parallel processing
- zstd (preferred) with gzip fallback
- Integrity verification (xxhash/crc32)
- Progress visualization with tqdm
- Error resilient (logs errors, continues processing)

Author: NEXAI Team
Version: 1.0.0
"""

import os
import sys
import logging
import hashlib
import argparse
from pathlib import Path
from typing import Optional, List, Tuple, Generator, Dict, Any
from dataclasses import dataclass, field
from datetime import datetime
from concurrent.futures import ProcessPoolExecutor, as_completed
from multiprocessing import cpu_count
import time
import json

# Progress bar
try:
    from tqdm import tqdm
    TQDM_AVAILABLE = True
except ImportError:
    TQDM_AVAILABLE = False
    print("Warning: tqdm not installed. Progress bar disabled. Install with: pip install tqdm")

# Compression libraries with fallback
try:
    import zstandard as zstd
    ZSTD_AVAILABLE = True
except ImportError:
    ZSTD_AVAILABLE = False
    print("Warning: zstandard not installed. Using gzip fallback. Install with: pip install zstandard")

import gzip

# Fast hash (optional, falls back to crc32)
try:
    import xxhash
    XXHASH_AVAILABLE = True
except ImportError:
    XXHASH_AVAILABLE = False
    import zlib  # For crc32 fallback

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============================================
# CONFIGURATION
# ============================================

@dataclass
class CompressionConfig:
    """Compression configuration parameters"""
    
    # Chunk size for streaming (64KB default, configurable up to 4MB)
    chunk_size: int = 64 * 1024  # 64KB
    
    # Minimum file size to process (default: 10MB)
    min_file_size: int = 10 * 1024 * 1024  # 10MB
    
    # Number of worker processes (None = auto-detect)
    num_workers: Optional[int] = None
    
    # Compression level (zstd: 1-22, gzip: 1-9)
    compression_level: int = 3
    
    # Delete original files after successful compression
    delete_original: bool = False
    
    # Verify integrity after compression
    verify_integrity: bool = True
    
    # File extensions to include (None = all files)
    include_extensions: Optional[List[str]] = None
    
    # File extensions to exclude
    exclude_extensions: List[str] = field(default_factory=lambda: [
        '.zst', '.gz', '.zip', '.rar', '.7z', '.tar', '.bz2', '.xz',
        '.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mp3', '.mkv'
    ])
    
    # Output directory (None = same as input)
    output_dir: Optional[str] = None
    
    # Error log file
    error_log_file: str = 'compression_errors.log'
    
    def __post_init__(self):
        if self.num_workers is None:
            self.num_workers = cpu_count()


# ============================================
# STREAMING COMPRESSOR
# ============================================

class StreamingCompressor:
    """
    Memory-efficient streaming compression engine
    
    RAM Usage: O(chunk_size) - constant regardless of file size!
    """
    
    def __init__(self, config: CompressionConfig):
        self.config = config
        self.use_zstd = ZSTD_AVAILABLE
        
        # Initialize zstd compressor if available
        if self.use_zstd:
            self.zstd_compressor = zstd.ZstdCompressor(
                level=config.compression_level,
                threads=1  # Single thread per file (parallelism at file level)
            )
        
        logger.info(f"Compression engine: {'zstd' if self.use_zstd else 'gzip'}")
        logger.info(f"Chunk size: {config.chunk_size / 1024:.1f}KB")
    
    def _stream_chunks(self, filepath: Path) -> Generator[bytes, None, None]:
        """
        Generator that yields file chunks
        
        NEVER loads entire file into memory!
        
        Args:
            filepath: Path to file
            
        Yields:
            bytes: File chunks
        """
        with open(filepath, 'rb') as f:
            while True:
                chunk = f.read(self.config.chunk_size)
                if not chunk:
                    break
                yield chunk
    
    def _calculate_checksum(self, filepath: Path) -> str:
        """
        Calculate file checksum using streaming
        
        Args:
            filepath: Path to file
            
        Returns:
            str: Hex checksum
        """
        if XXHASH_AVAILABLE:
            hasher = xxhash.xxh64()
            for chunk in self._stream_chunks(filepath):
                hasher.update(chunk)
            return hasher.hexdigest()
        else:
            # Fallback to CRC32
            checksum = 0
            for chunk in self._stream_chunks(filepath):
                checksum = zlib.crc32(chunk, checksum)
            return format(checksum & 0xFFFFFFFF, '08x')
    
    def compress_file(self, input_path: Path, output_path: Optional[Path] = None) -> Dict[str, Any]:
        """
        Compress a single file using streaming
        
        Args:
            input_path: Path to input file
            output_path: Path to output file (auto-generated if None)
            
        Returns:
            dict: Compression result with statistics
        """
        start_time = time.time()
        
        # Determine output path
        if output_path is None:
            ext = '.zst' if self.use_zstd else '.gz'
            output_path = input_path.with_suffix(input_path.suffix + ext)
        
        result = {
            'input_file': str(input_path),
            'output_file': str(output_path),
            'success': False,
            'original_size': 0,
            'compressed_size': 0,
            'compression_ratio': 0.0,
            'time_seconds': 0.0,
            'throughput_mbps': 0.0,
            'error': None,
            'checksum_original': None,
            'checksum_verified': False
        }
        
        try:
            # Get original size
            original_size = input_path.stat().st_size
            result['original_size'] = original_size
            
            # Calculate original checksum (for verification)
            if self.config.verify_integrity:
                result['checksum_original'] = self._calculate_checksum(input_path)
            
            # Streaming compression
            bytes_written = 0
            
            if self.use_zstd:
                # ZSTD streaming compression
                with open(input_path, 'rb') as f_in:
                    with open(output_path, 'wb') as f_out:
                        with self.zstd_compressor.stream_writer(f_out) as compressor:
                            while True:
                                chunk = f_in.read(self.config.chunk_size)
                                if not chunk:
                                    break
                                compressor.write(chunk)
                
                bytes_written = output_path.stat().st_size
            else:
                # Gzip streaming compression
                with open(input_path, 'rb') as f_in:
                    with gzip.open(output_path, 'wb', compresslevel=min(9, self.config.compression_level)) as f_out:
                        while True:
                            chunk = f_in.read(self.config.chunk_size)
                            if not chunk:
                                break
                            f_out.write(chunk)
                
                bytes_written = output_path.stat().st_size
            
            # Update statistics
            result['compressed_size'] = bytes_written
            result['compression_ratio'] = (1 - bytes_written / original_size) * 100 if original_size > 0 else 0
            result['time_seconds'] = time.time() - start_time
            result['throughput_mbps'] = (original_size / 1024 / 1024) / result['time_seconds'] if result['time_seconds'] > 0 else 0
            
            # Verify integrity
            if self.config.verify_integrity:
                verified = self._verify_compressed_file(input_path, output_path)
                result['checksum_verified'] = verified
                if not verified:
                    result['error'] = "Integrity verification failed"
                    return result
            
            result['success'] = True
            
            # Delete original if configured
            if self.config.delete_original and result['success']:
                input_path.unlink()
                logger.info(f"Deleted original: {input_path}")
            
            return result
            
        except Exception as e:
            result['error'] = str(e)
            result['time_seconds'] = time.time() - start_time
            logger.error(f"Compression failed for {input_path}: {e}")
            
            # Clean up partial output
            if output_path.exists():
                try:
                    output_path.unlink()
                except:
                    pass
            
            return result
    
    def _verify_compressed_file(self, original_path: Path, compressed_path: Path) -> bool:
        """
        Verify compressed file by decompressing and comparing checksums
        
        Args:
            original_path: Path to original file
            compressed_path: Path to compressed file
            
        Returns:
            bool: True if verification passed
        """
        try:
            if XXHASH_AVAILABLE:
                hasher = xxhash.xxh64()
            else:
                checksum = 0
            
            # Decompress and calculate checksum
            if self.use_zstd:
                decompressor = zstd.ZstdDecompressor()
                with open(compressed_path, 'rb') as f_in:
                    with decompressor.stream_reader(f_in) as reader:
                        while True:
                            chunk = reader.read(self.config.chunk_size)
                            if not chunk:
                                break
                            if XXHASH_AVAILABLE:
                                hasher.update(chunk)
                            else:
                                checksum = zlib.crc32(chunk, checksum)
            else:
                with gzip.open(compressed_path, 'rb') as f_in:
                    while True:
                        chunk = f_in.read(self.config.chunk_size)
                        if not chunk:
                            break
                        if XXHASH_AVAILABLE:
                            hasher.update(chunk)
                        else:
                            checksum = zlib.crc32(chunk, checksum)
            
            # Compare checksums
            if XXHASH_AVAILABLE:
                decompressed_checksum = hasher.hexdigest()
            else:
                decompressed_checksum = format(checksum & 0xFFFFFFFF, '08x')
            
            original_checksum = self._calculate_checksum(original_path)
            
            return decompressed_checksum == original_checksum
            
        except Exception as e:
            logger.error(f"Verification failed: {e}")
            return False


# ============================================
# FILE WALKER
# ============================================

def find_large_files(
    directory: Path,
    min_size: int,
    include_extensions: Optional[List[str]] = None,
    exclude_extensions: Optional[List[str]] = None
) -> List[Path]:
    """
    Find files larger than min_size in directory
    
    Args:
        directory: Directory to scan
        min_size: Minimum file size in bytes
        include_extensions: Extensions to include (None = all)
        exclude_extensions: Extensions to exclude
        
    Returns:
        List[Path]: List of file paths
    """
    files = []
    exclude_extensions = exclude_extensions or []
    
    for root, _, filenames in os.walk(directory):
        for filename in filenames:
            filepath = Path(root) / filename
            
            try:
                # Check file size
                file_size = filepath.stat().st_size
                if file_size < min_size:
                    continue
                
                # Check extension filters
                ext = filepath.suffix.lower()
                
                if include_extensions and ext not in include_extensions:
                    continue
                
                if ext in exclude_extensions:
                    continue
                
                files.append(filepath)
                
            except (OSError, PermissionError) as e:
                logger.warning(f"Cannot access file {filepath}: {e}")
                continue
    
    # Sort by size (largest first for better parallelism)
    files.sort(key=lambda f: f.stat().st_size, reverse=True)
    
    return files


# ============================================
# PARALLEL COMPRESSOR
# ============================================

def _compress_worker(args: Tuple[Path, CompressionConfig, Optional[Path]]) -> Dict[str, Any]:
    """
    Worker function for parallel compression
    Runs in separate process
    
    Args:
        args: Tuple of (input_path, config, output_path)
        
    Returns:
        dict: Compression result
    """
    input_path, config, output_path = args
    compressor = StreamingCompressor(config)
    return compressor.compress_file(input_path, output_path)


class ParallelCompressor:
    """
    Multi-process file compression orchestrator
    
    Distributes files across CPU cores for maximum throughput.
    """
    
    def __init__(self, config: CompressionConfig):
        self.config = config
        self.results: List[Dict[str, Any]] = []
        self.errors: List[Dict[str, Any]] = []
        
        logger.info(f"Initialized ParallelCompressor with {config.num_workers} workers")
    
    def compress_directory(self, directory: str) -> Dict[str, Any]:
        """
        Compress all large files in directory using parallel processing
        
        Args:
            directory: Directory path to process
            
        Returns:
            dict: Overall statistics
        """
        start_time = time.time()
        directory = Path(directory)
        
        if not directory.exists():
            raise FileNotFoundError(f"Directory not found: {directory}")
        
        # Find files to compress
        files = find_large_files(
            directory,
            min_size=self.config.min_file_size,
            include_extensions=self.config.include_extensions,
            exclude_extensions=self.config.exclude_extensions
        )
        
        if not files:
            logger.warning(f"No files found larger than {self.config.min_file_size / 1024 / 1024:.1f}MB")
            return self._generate_report(start_time)
        
        total_size = sum(f.stat().st_size for f in files)
        logger.info(f"Found {len(files)} files ({total_size / 1024 / 1024 / 1024:.2f}GB total)")
        
        # Prepare output directory
        output_dir = Path(self.config.output_dir) if self.config.output_dir else None
        if output_dir:
            output_dir.mkdir(parents=True, exist_ok=True)
        
        # Prepare work items
        work_items = []
        for filepath in files:
            if output_dir:
                output_path = output_dir / (filepath.name + ('.zst' if ZSTD_AVAILABLE else '.gz'))
            else:
                output_path = None
            work_items.append((filepath, self.config, output_path))
        
        # Process in parallel
        self.results = []
        self.errors = []
        
        with ProcessPoolExecutor(max_workers=self.config.num_workers) as executor:
            futures = {executor.submit(_compress_worker, item): item[0] for item in work_items}
            
            # Progress bar
            if TQDM_AVAILABLE:
                pbar = tqdm(
                    total=len(files),
                    desc="🗜️  Compressing",
                    unit="file",
                    ncols=100,
                    bar_format='{l_bar}{bar}| {n_fmt}/{total_fmt} [{elapsed}<{remaining}, {rate_fmt}]'
                )
            
            for future in as_completed(futures):
                filepath = futures[future]
                
                try:
                    result = future.result()
                    self.results.append(result)
                    
                    if not result['success']:
                        self.errors.append(result)
                        self._log_error(result)
                    
                except Exception as e:
                    error_result = {
                        'input_file': str(filepath),
                        'success': False,
                        'error': str(e)
                    }
                    self.errors.append(error_result)
                    self._log_error(error_result)
                
                if TQDM_AVAILABLE:
                    pbar.update(1)
            
            if TQDM_AVAILABLE:
                pbar.close()
        
        return self._generate_report(start_time)
    
    def compress_files(self, files: List[str]) -> Dict[str, Any]:
        """
        Compress specific list of files
        
        Args:
            files: List of file paths
            
        Returns:
            dict: Overall statistics
        """
        start_time = time.time()
        
        # Convert to Path objects and validate
        file_paths = []
        for f in files:
            path = Path(f)
            if path.exists() and path.is_file():
                file_paths.append(path)
            else:
                logger.warning(f"File not found: {f}")
        
        if not file_paths:
            logger.warning("No valid files to process")
            return self._generate_report(start_time)
        
        # Prepare work items
        work_items = [(fp, self.config, None) for fp in file_paths]
        
        # Process in parallel
        self.results = []
        self.errors = []
        
        with ProcessPoolExecutor(max_workers=self.config.num_workers) as executor:
            futures = {executor.submit(_compress_worker, item): item[0] for item in work_items}
            
            if TQDM_AVAILABLE:
                pbar = tqdm(
                    total=len(file_paths),
                    desc="🗜️  Compressing",
                    unit="file",
                    ncols=100
                )
            
            for future in as_completed(futures):
                filepath = futures[future]
                
                try:
                    result = future.result()
                    self.results.append(result)
                    
                    if not result['success']:
                        self.errors.append(result)
                        self._log_error(result)
                    
                except Exception as e:
                    error_result = {
                        'input_file': str(filepath),
                        'success': False,
                        'error': str(e)
                    }
                    self.errors.append(error_result)
                    self._log_error(error_result)
                
                if TQDM_AVAILABLE:
                    pbar.update(1)
            
            if TQDM_AVAILABLE:
                pbar.close()
        
        return self._generate_report(start_time)
    
    def _log_error(self, error_result: Dict[str, Any]):
        """Log error to file"""
        error_log_path = Path(self.config.error_log_file)
        
        with open(error_log_path, 'a', encoding='utf-8') as f:
            timestamp = datetime.now().isoformat()
            f.write(f"[{timestamp}] {error_result['input_file']}: {error_result.get('error', 'Unknown error')}\n")
    
    def _generate_report(self, start_time: float) -> Dict[str, Any]:
        """Generate compression report"""
        total_time = time.time() - start_time
        
        successful = [r for r in self.results if r.get('success')]
        failed = [r for r in self.results if not r.get('success')]
        
        total_original = sum(r.get('original_size', 0) for r in successful)
        total_compressed = sum(r.get('compressed_size', 0) for r in successful)
        
        report = {
            'timestamp': datetime.now().isoformat(),
            'summary': {
                'total_files': len(self.results),
                'successful': len(successful),
                'failed': len(failed),
                'total_original_size_bytes': total_original,
                'total_compressed_size_bytes': total_compressed,
                'overall_compression_ratio': (1 - total_compressed / total_original) * 100 if total_original > 0 else 0,
                'total_time_seconds': total_time,
                'throughput_mbps': (total_original / 1024 / 1024) / total_time if total_time > 0 else 0,
                'space_saved_bytes': total_original - total_compressed,
                'workers_used': self.config.num_workers
            },
            'compression_engine': 'zstd' if ZSTD_AVAILABLE else 'gzip',
            'config': {
                'chunk_size': self.config.chunk_size,
                'compression_level': self.config.compression_level,
                'verify_integrity': self.config.verify_integrity,
                'delete_original': self.config.delete_original
            },
            'results': self.results,
            'errors': self.errors
        }
        
        self._print_report(report)
        
        return report
    
    def _print_report(self, report: Dict[str, Any]):
        """Print formatted report to console"""
        summary = report['summary']
        
        print("\n")
        print("╔══════════════════════════════════════════════════════════════════╗")
        print("║               🗜️  COMPRESSION COMPLETE                           ║")
        print("╚══════════════════════════════════════════════════════════════════╝")
        print()
        print(f"  📊 Files Processed:    {summary['total_files']}")
        print(f"     ✅ Successful:      {summary['successful']}")
        print(f"     ❌ Failed:          {summary['failed']}")
        print()
        print(f"  💾 Storage:")
        print(f"     Original Size:      {summary['total_original_size_bytes'] / 1024 / 1024 / 1024:.2f} GB")
        print(f"     Compressed Size:    {summary['total_compressed_size_bytes'] / 1024 / 1024 / 1024:.2f} GB")
        print(f"     Space Saved:        {summary['space_saved_bytes'] / 1024 / 1024 / 1024:.2f} GB ({summary['overall_compression_ratio']:.1f}%)")
        print()
        print(f"  ⚡ Performance:")
        print(f"     Total Time:         {summary['total_time_seconds']:.2f}s")
        print(f"     Throughput:         {summary['throughput_mbps']:.2f} MB/s")
        print(f"     Workers Used:       {summary['workers_used']}")
        print()
        print(f"  🔧 Engine:             {report['compression_engine']}")
        print()
        
        if report['errors']:
            print(f"  ⚠️  Errors logged to:   {self.config.error_log_file}")
        
        print("═" * 70)


# ============================================
# CLI INTERFACE
# ============================================

def parse_args():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(
        description='High-Performance Parallel File Compressor',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Compress all files > 10MB in directory
  python compressor.py /path/to/data

  # Custom settings
  python compressor.py /path/to/data --min-size 50 --workers 4 --level 5

  # Delete originals after compression (use with caution!)
  python compressor.py /path/to/data --delete-original

  # Output to different directory
  python compressor.py /path/to/data --output-dir /path/to/compressed
        """
    )
    
    parser.add_argument(
        'directory',
        type=str,
        help='Directory containing files to compress'
    )
    
    parser.add_argument(
        '--min-size',
        type=int,
        default=10,
        help='Minimum file size in MB (default: 10)'
    )
    
    parser.add_argument(
        '--chunk-size',
        type=int,
        default=64,
        help='Chunk size in KB for streaming (default: 64)'
    )
    
    parser.add_argument(
        '--workers',
        type=int,
        default=None,
        help='Number of worker processes (default: CPU count)'
    )
    
    parser.add_argument(
        '--level',
        type=int,
        default=3,
        help='Compression level (zstd: 1-22, gzip: 1-9, default: 3)'
    )
    
    parser.add_argument(
        '--delete-original',
        action='store_true',
        default=False,
        help='Delete original files after successful compression (default: False)'
    )
    
    parser.add_argument(
        '--no-verify',
        action='store_true',
        default=False,
        help='Skip integrity verification (faster but risky)'
    )
    
    parser.add_argument(
        '--output-dir',
        type=str,
        default=None,
        help='Output directory for compressed files (default: same as input)'
    )
    
    parser.add_argument(
        '--include-ext',
        type=str,
        nargs='+',
        default=None,
        help='File extensions to include (e.g., .txt .log .csv)'
    )
    
    parser.add_argument(
        '--error-log',
        type=str,
        default='compression_errors.log',
        help='Error log file path (default: compression_errors.log)'
    )
    
    parser.add_argument(
        '--json-report',
        type=str,
        default=None,
        help='Save detailed JSON report to file'
    )
    
    return parser.parse_args()


def main():
    """Main entry point"""
    args = parse_args()
    
    # Build configuration
    config = CompressionConfig(
        chunk_size=args.chunk_size * 1024,  # Convert KB to bytes
        min_file_size=args.min_size * 1024 * 1024,  # Convert MB to bytes
        num_workers=args.workers,
        compression_level=args.level,
        delete_original=args.delete_original,
        verify_integrity=not args.no_verify,
        include_extensions=args.include_ext,
        output_dir=args.output_dir,
        error_log_file=args.error_log
    )
    
    print()
    print("╔══════════════════════════════════════════════════════════════════╗")
    print("║          🚀 HIGH-PERFORMANCE PARALLEL COMPRESSOR                 ║")
    print("╚══════════════════════════════════════════════════════════════════╝")
    print()
    print(f"  📁 Target Directory:   {args.directory}")
    print(f"  📏 Min File Size:      {args.min_size} MB")
    print(f"  🔧 Compression Engine: {'zstd' if ZSTD_AVAILABLE else 'gzip (fallback)'}")
    print(f"  📊 Compression Level:  {args.level}")
    print(f"  🧵 Workers:            {config.num_workers}")
    print(f"  📦 Chunk Size:         {args.chunk_size} KB")
    print(f"  🔒 Verify Integrity:   {'Yes' if config.verify_integrity else 'No'}")
    print(f"  🗑️  Delete Original:   {'Yes ⚠️' if config.delete_original else 'No'}")
    print()
    print("═" * 70)
    print()
    
    # Create compressor and run
    compressor = ParallelCompressor(config)
    
    try:
        report = compressor.compress_directory(args.directory)
        
        # Save JSON report if requested
        if args.json_report:
            with open(args.json_report, 'w', encoding='utf-8') as f:
                json.dump(report, f, indent=2)
            print(f"\n📄 Detailed report saved to: {args.json_report}")
        
        # Exit code based on success
        if report['summary']['failed'] > 0:
            sys.exit(1)
        sys.exit(0)
        
    except KeyboardInterrupt:
        print("\n\n⚠️  Compression interrupted by user")
        sys.exit(130)
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
