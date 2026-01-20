"""
Multiprocessing Pipeline Orchestrator
Manages parallel text reduction using worker processes
"""

import logging
from multiprocessing import Pool, cpu_count, Manager
from pathlib import Path
from typing import Optional, Callable, Set
import sys

from tqdm import tqdm

from .reader import FileReader, read_file_lines
from .reducer import TextReducer, reduce_text
from .config import DEFAULT_NUM_WORKERS, DEFAULT_CHUNKSIZE, PROGRESS_UPDATE_FREQ

logger = logging.getLogger(__name__)


class ParallelProcessor:
    """
    Parallel text reduction processor
    
    - Reads file in chunks (generator)
    - Distributes to worker pool (multiprocessing)
    - Collects results efficiently (imap_unordered)
    - Writes output in real-time
    
    Memory: Bounded by chunk size, not file size!
    CPU: Uses all available cores
    """
    
    def __init__(
        self,
        input_file: str,
        output_file: str,
        num_workers: Optional[int] = None,
        nlp_mode: str = 'basic',
        custom_stop_words: Optional[Set[str]] = None,
        chunk_size: int = 1024 * 50,
        max_lines_per_chunk: Optional[int] = 50,
        use_lines: bool = True,
        verbose: bool = True
    ):
        """
        Initialize parallel processor
        
        Args:
            input_file: Path to input file
            output_file: Path to output file
            num_workers: Number of worker processes (default: CPU count)
            nlp_mode: Text reduction mode ('basic', 'pos', 'aggressive')
            custom_stop_words: Additional stop words
            chunk_size: Bytes per chunk (if use_lines=False)
            max_lines_per_chunk: Lines per chunk (if use_lines=True)
            use_lines: Read by lines (True) or bytes (False)
            verbose: Show progress bar
        """
        self.input_file = Path(input_file)
        self.output_file = Path(output_file)
        self.num_workers = num_workers or cpu_count()
        self.nlp_mode = nlp_mode
        self.custom_stop_words = custom_stop_words
        self.chunk_size = chunk_size
        self.max_lines_per_chunk = max_lines_per_chunk
        self.use_lines = use_lines
        self.verbose = verbose
        
        # Validation
        if not self.input_file.exists():
            raise FileNotFoundError(f"Input file not found: {self.input_file}")
        
        # Statistics
        self.stats = {
            'total_chunks': 0,
            'total_chars_in': 0,
            'total_chars_out': 0,
            'errors': 0,
            'processing_time': 0.0
        }
        
        logger.info(f"Initialized processor with {self.num_workers} workers")
        logger.info(f"Input: {self.input_file} ({self.input_file.stat().st_size / 1024 / 1024:.2f}MB)")
        logger.info(f"Output: {self.output_file}")
        logger.info(f"Mode: {self.nlp_mode}")
    
    def process(self) -> dict:
        """
        Run parallel processing pipeline
        
        Returns:
            dict: Processing statistics
        """
        import time
        start_time = time.time()
        
        try:
            # Initialize reader
            reader = FileReader(
                self.input_file,
                chunk_size=self.chunk_size
            )
            
            # Clear output file
            self.output_file.write_text('')
            logger.info(f"Output file cleared: {self.output_file}")
            
            # Get chunks generator
            if self.use_lines:
                chunks_generator = reader.read_lines(self.max_lines_per_chunk)
            else:
                chunks_generator = reader.read_chunks()
            
            # Process with worker pool
            self._process_with_pool(chunks_generator)
            
            self.stats['processing_time'] = time.time() - start_time
            self._log_stats()
            
            return self.stats
            
        except Exception as e:
            logger.error(f"Processing failed: {e}")
            self.stats['errors'] += 1
            raise
    
    def _process_with_pool(self, chunks_generator):
        """
        Process chunks using worker pool
        
        Args:
            chunks_generator: Generator of text chunks
        """
        total_chunks_approx = self._estimate_chunks()
        
        with Pool(self.num_workers) as pool:
            # Use imap_unordered for non-blocking result collection
            results = pool.imap_unordered(
                _worker_reduce,
                chunks_generator,
                chunksize=DEFAULT_CHUNKSIZE
            )
            
            # Write results as they arrive (real-time streaming)
            with open(self.output_file, 'a', encoding='utf-8') as out_f:
                pbar = tqdm(
                    results,
                    total=total_chunks_approx,
                    disable=not self.verbose,
                    desc='Processing',
                    unit='chunk'
                ) if self.verbose else results
                
                for chunk_result in pbar:
                    if chunk_result:
                        out_f.write(chunk_result + '\n')
                        
                        # Update statistics
                        self.stats['total_chunks'] += 1
                        
                        if isinstance(chunk_result, dict):
                            # Result with metadata
                            self.stats['total_chars_in'] += chunk_result.get('chars_in', 0)
                            self.stats['total_chars_out'] += chunk_result.get('chars_out', 0)
                        else:
                            # Simple string result
                            self.stats['total_chars_out'] += len(chunk_result)
    
    def _estimate_chunks(self) -> int:
        """Estimate number of chunks for progress bar"""
        file_size = self.input_file.stat().st_size
        if self.use_lines:
            # Estimate: avg 100 bytes per line
            return max(10, int(file_size / 100 / (self.max_lines_per_chunk or 50)))
        else:
            return max(10, int(file_size / self.chunk_size))
    
    def _log_stats(self):
        """Log final statistics"""
        reduction_percent = 0.0
        if self.stats['total_chars_in'] > 0:
            reduction_percent = (
                (self.stats['total_chars_in'] - self.stats['total_chars_out']) /
                self.stats['total_chars_in'] * 100
            )
        
        output_size = self.output_file.stat().st_size / 1024 / 1024 if self.output_file.exists() else 0
        
        logger.info(f"""
╔════════════════════════════════════════════════════╗
║          PROCESSING COMPLETE                       ║
╚════════════════════════════════════════════════════╝

📊 Statistics:
  Chunks processed: {self.stats['total_chunks']}
  Errors: {self.stats['errors']}
  
📈 Data Reduction:
  Input size: {self.stats['total_chars_in'] / 1024 / 1024:.2f}MB
  Output size: {output_size:.2f}MB
  Reduction: {reduction_percent:.1f}%
  
⏱️  Performance:
  Time: {self.stats['processing_time']:.2f}s
  Throughput: {self.stats['total_chars_in'] / 1024 / 1024 / self.stats['processing_time']:.2f}MB/s
  Workers: {self.num_workers}
""")


def _worker_reduce(chunk: str) -> Optional[str]:
    """
    Worker function for multiprocessing
    Runs in separate process (GIL is bypassed!)
    
    Args:
        chunk: Text chunk to reduce
        
    Returns:
        str: Reduced text
    """
    try:
        if not chunk or not chunk.strip():
            return None
        
        # Reduce density
        reduced = reduce_text(chunk, nlp_mode='basic')
        
        return reduced if reduced.strip() else None
        
    except Exception as e:
        logger.error(f"Worker error: {e}")
        return None


# ============================================
# CONVENIENCE FUNCTION
# ============================================

def reduce_file(
    input_file: str,
    output_file: str,
    num_workers: Optional[int] = None,
    nlp_mode: str = 'basic',
    custom_stop_words: Optional[Set[str]] = None,
    use_lines: bool = True,
    max_lines_per_chunk: int = 50,
    verbose: bool = True
) -> dict:
    """
    Reduce text density in a file
    
    Args:
        input_file: Path to input file
        output_file: Path to output file
        num_workers: Number of worker processes
        nlp_mode: Processing mode
        custom_stop_words: Additional stop words
        use_lines: Read by lines (True) or bytes (False)
        max_lines_per_chunk: Lines per chunk
        verbose: Show progress
        
    Returns:
        dict: Processing statistics
    """
    processor = ParallelProcessor(
        input_file=input_file,
        output_file=output_file,
        num_workers=num_workers,
        nlp_mode=nlp_mode,
        custom_stop_words=custom_stop_words,
        max_lines_per_chunk=max_lines_per_chunk,
        use_lines=use_lines,
        verbose=verbose
    )
    
    return processor.process()


if __name__ == '__main__':
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Example: Process a large file
    input_file = '/tmp/large_text.txt'
    output_file = '/tmp/reduced_text.txt'
    
    # Create sample input if needed
    if not Path(input_file).exists():
        print(f"Creating sample file: {input_file}")
        with open(input_file, 'w') as f:
            for i in range(100000):
                f.write(f"""
                <h2>Article {i}</h2>
                This is a sample article about data processing and parallel computing.
                The article discusses how to efficiently process large files without
                running out of memory. Visit https://example.com for more info.
                Contact support@example.com if you have questions.
                
                Key points:
                - Use generators for lazy evaluation
                - Employ multiprocessing to bypass GIL
                - Stream output in real-time
                """)
    
    # Process file
    try:
        stats = reduce_file(
            input_file=input_file,
            output_file=output_file,
            num_workers=None,
            nlp_mode='basic',
            use_lines=True,
            max_lines_per_chunk=50,
            verbose=True
        )
        
        print("\n✓ Processing complete!")
        print(f"Result saved to: {output_file}")
        
    except Exception as e:
        print(f"✗ Error: {e}")
