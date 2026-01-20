"""
Configuration Constants for Data Processor
"""

import os
from pathlib import Path

# ============================================
# PATHS
# ============================================

BASE_DIR = Path(__file__).parent.parent.parent
DATA_DIR = BASE_DIR / 'data'
OUTPUT_DIR = BASE_DIR / 'output'

# Create directories if not exist
DATA_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)

# ============================================
# PROCESSING PARAMETERS
# ============================================

# File Reading
DEFAULT_CHUNK_SIZE = 1024 * 50  # 50KB chunks
DEFAULT_ENCODING = 'utf-8'

# Multiprocessing
DEFAULT_NUM_WORKERS = None  # Auto-detect CPU count
DEFAULT_CHUNKSIZE = 1  # Items per worker batch

# Stop Words (Turkish + English)
STOP_WORDS = {
    # Turkish
    've', 'veya', 'ile', 'için', 'olarak', 'gibi', 'kadar', 'ancak', 'fakat',
    'eğer', 'ise', 'bu', 'şu', 'o', 'ben', 'sen', 'o', 'biz', 'siz', 'onlar',
    'var', 'yok', 'bu', 'bunun', 'bundan', 'burada', 'bugün', 'hatta', 'yani',
    'çünkü', 'mı', 'mi', 'mu', 'mü', 'mi', 'başka', 'ama', 'daha', 'çok', 'az',
    'yer', 'zaman', 'kişi', 'şey', 'söz', 'durumda', 'göz', 'baş', 'el', 'ayak',
    
    # English
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'can', 'must', 'shall', 'i', 'you',
    'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
    'my', 'your', 'his', 'her', 'its', 'our', 'their', 'this', 'that',
    'these', 'those', 'am', 'as', 'if', 'just', 'no', 'not', 'so', 'than',
    'too', 'very', 'how', 'what', 'which', 'when', 'where', 'who', 'why'
}

# Regex Patterns for Cleaning
PATTERNS = {
    'html': r'<[^>]+>',                              # HTML tags
    'url': r'https?://\S+',                          # URLs
    'email': r'[^\s]+@[^\s]+\.[^\s]+',              # Email addresses
    'extra_whitespace': r'\s+',                      # Multiple whitespace
    'special_chars': r'[^a-zA-Z0-9\s\-\.\_ç ğ ı ö ş ü Ç Ğ İ Ö Ş Ü]',  # Keep alphanumeric + Turkish chars
    'numbers': r'\d+',                               # Numbers (optional removal)
}

# NLP Modes
NLP_MODES = {
    'basic': 'Stop-word removal only',
    'pos': 'POS tagging (Noun + Verb)',
    'aggressive': 'Stop-word + POS + lemmatization'
}

# Default NLP Mode
DEFAULT_NLP_MODE = 'basic'

# ============================================
# LOGGING
# ============================================

LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
LOG_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'

# ============================================
# PERFORMANCE THRESHOLDS
# ============================================

MAX_MEMORY_MB = 500  # Memory threshold for warning
PROGRESS_UPDATE_FREQ = 100  # Update progress every N chunks
STAT_UPDATE_FREQ = 10  # Stats update frequency

# ============================================
# OUTPUT FORMATS
# ============================================

OUTPUT_FORMATS = ['txt', 'json', 'csv']
DEFAULT_OUTPUT_FORMAT = 'txt'
