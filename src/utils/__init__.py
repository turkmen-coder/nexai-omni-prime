"""
NEXAI Data Processor Package
High-performance parallel text reduction pipeline + compression utilities
"""

from .reader import FileReader, read_file_chunks, read_file_lines
from .reducer import TextReducer, reduce_text
from .processor import ParallelProcessor, reduce_file, _worker_reduce
from .writer import OutputWriter, Analytics, compare_files, print_comparison
from .compressor import (
    StreamingCompressor,
    ParallelCompressor,
    CompressionConfig,
    find_large_files
)
from .config import (
    STOP_WORDS,
    PATTERNS,
    NLP_MODES,
    DEFAULT_CHUNK_SIZE,
    DEFAULT_NUM_WORKERS,
    DEFAULT_NLP_MODE
)

__version__ = '1.1.0'
__author__ = 'NEXAI Team'
__all__ = [
    # Reader
    'FileReader',
    'read_file_chunks',
    'read_file_lines',
    
    # Reducer
    'TextReducer',
    'reduce_text',
    
    # Processor
    'ParallelProcessor',
    'reduce_file',
    
    # Writer
    'OutputWriter',
    'Analytics',
    'compare_files',
    'print_comparison',
    
    # Compressor (NEW)
    'StreamingCompressor',
    'ParallelCompressor',
    'CompressionConfig',
    'find_large_files',
    
    # Config
    'STOP_WORDS',
    'PATTERNS',
    'NLP_MODES',
    'DEFAULT_CHUNK_SIZE',
    'DEFAULT_NUM_WORKERS',
    'DEFAULT_NLP_MODE'
]


def get_version():
    """Get package version"""
    return __version__
