"""
Text Reduction Logic
Cleans, filters, and reduces text density
"""

import re
import logging
from typing import Optional, List, Dict, Set
from pathlib import Path

# Optional NLP imports
try:
    import nltk
    from nltk.corpus import stopwords as nltk_stopwords
    from nltk.tokenize import word_tokenize, sent_tokenize
    NLTK_AVAILABLE = True
except ImportError:
    NLTK_AVAILABLE = False
    logging.warning("NLTK not installed. Stop-word filtering limited.")

try:
    import spacy
    SPACY_AVAILABLE = True
except ImportError:
    SPACY_AVAILABLE = False
    logging.warning("spaCy not installed. POS tagging disabled.")

from .config import PATTERNS, STOP_WORDS, DEFAULT_NLP_MODE

logger = logging.getLogger(__name__)


class TextReducer:
    """
    Text density reduction engine
    
    Provides:
    - HTML/special character cleaning
    - Stop-word filtering (NLTK + custom)
    - Optional POS tagging (spaCy)
    - Metrics calculation
    """
    
    def __init__(
        self,
        nlp_mode: str = DEFAULT_NLP_MODE,
        custom_stop_words: Optional[Set[str]] = None,
        preserve_case: bool = False
    ):
        """
        Initialize text reducer
        
        Args:
            nlp_mode: 'basic', 'pos', 'aggressive' (default 'basic')
            custom_stop_words: Additional stop words to filter
            preserve_case: Keep original case (default False - lowercase)
        """
        self.nlp_mode = nlp_mode
        self.preserve_case = preserve_case
        
        # Combine stop words
        self.stop_words = set(STOP_WORDS)
        if custom_stop_words:
            self.stop_words.update(custom_stop_words)
        
        # Load additional stop words from NLTK if available
        if NLTK_AVAILABLE:
            try:
                # Ensure stopwords are downloaded
                try:
                    nltk_stopwords.words('english')
                except LookupError:
                    logger.info("Downloading NLTK stopwords...")
                    nltk.download('stopwords', quiet=True)
                    nltk.download('punkt', quiet=True)
                    nltk.download('averaged_perceptron_tagger', quiet=True)
                    nltk.download('universal_tagset', quiet=True)
                
                # Add NLTK stopwords
                en_stops = nltk_stopwords.words('english')
                self.stop_words.update(en_stops)
                logger.info(f"Loaded {len(self.stop_words)} stop words")
            except Exception as e:
                logger.warning(f"Could not load NLTK stopwords: {e}")
        
        # Load spaCy model for POS tagging
        self.nlp = None
        if nlp_mode in ['pos', 'aggressive'] and SPACY_AVAILABLE:
            try:
                self.nlp = spacy.load('en_core_web_sm')
                logger.info("Loaded spaCy model: en_core_web_sm")
            except OSError:
                logger.warning(
                    "spaCy model not found. Run: python -m spacy download en_core_web_sm"
                )
                self.nlp = None
        
        # Statistics
        self.stats = {
            'chunks_processed': 0,
            'total_chars_in': 0,
            'total_chars_out': 0,
            'reduction_percent': 0.0,
            'errors': 0
        }
    
    def reduce(self, text: str) -> str:
        """
        Reduce text density
        
        Pipeline:
        1. Cleaning (HTML, URLs, etc.)
        2. Stop-word filtering
        3. Optional POS tagging
        
        Args:
            text: Input text
            
        Returns:
            str: Reduced text
        """
        try:
            original_length = len(text)
            
            # STEP 1: Cleaning
            text = self._clean_text(text)
            
            # STEP 2: Stop-word filtering
            if self.nlp_mode in ['basic', 'pos', 'aggressive']:
                text = self._remove_stop_words(text)
            
            # STEP 3: POS tagging (if enabled and available)
            if self.nlp_mode in ['pos', 'aggressive'] and self.nlp:
                text = self._pos_tagging(text)
            
            # STEP 4: Final cleanup
            text = self._final_cleanup(text)
            
            # Update statistics
            self.stats['chunks_processed'] += 1
            self.stats['total_chars_in'] += original_length
            self.stats['total_chars_out'] += len(text)
            
            return text
            
        except Exception as e:
            logger.error(f"Error in text reduction: {e}")
            self.stats['errors'] += 1
            return text  # Return original on error
    
    def _clean_text(self, text: str) -> str:
        """
        Clean HTML, URLs, emails, and special characters
        
        Args:
            text: Input text
            
        Returns:
            str: Cleaned text
        """
        # Remove HTML tags
        text = re.sub(PATTERNS['html'], '', text)
        
        # Remove URLs
        text = re.sub(PATTERNS['url'], '', text)
        
        # Remove emails
        text = re.sub(PATTERNS['email'], '', text)
        
        # Remove extra whitespace
        text = re.sub(PATTERNS['extra_whitespace'], ' ', text)
        
        # Normalize case
        if not self.preserve_case:
            text = text.lower()
        
        return text.strip()
    
    def _remove_stop_words(self, text: str) -> str:
        """
        Remove stop words using tokenization
        
        Args:
            text: Input text
            
        Returns:
            str: Text without stop words
        """
        try:
            # Tokenize
            if NLTK_AVAILABLE:
                tokens = word_tokenize(text)
            else:
                # Fallback: simple split
                tokens = text.split()
            
            # Filter stop words
            filtered = [
                token for token in tokens
                if token.lower() not in self.stop_words
                and len(token) > 1  # Remove single chars
            ]
            
            return ' '.join(filtered)
            
        except Exception as e:
            logger.warning(f"Stop-word filtering error: {e}")
            return text
    
    def _pos_tagging(self, text: str) -> str:
        """
        POS tagging: Keep only Nouns and Verbs
        Significantly reduces text while maintaining semantics
        
        Args:
            text: Input text
            
        Returns:
            str: Noun+Verb phrases only
        """
        if not self.nlp:
            return text
        
        try:
            doc = self.nlp(text)
            
            # Keep only NOUN and VERB tokens
            important_tokens = [
                token.text for token in doc
                if token.pos_ in ['NOUN', 'VERB', 'PROPN']  # Noun, Verb, Proper noun
            ]
            
            result = ' '.join(important_tokens)
            return result if result else text
            
        except Exception as e:
            logger.warning(f"POS tagging error: {e}")
            return text
    
    def _final_cleanup(self, text: str) -> str:
        """
        Final cleanup: Remove extra whitespace, normalize
        
        Args:
            text: Input text
            
        Returns:
            str: Cleaned text
        """
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text)
        
        # Remove punctuation (except hyphens, dots for abbreviations)
        text = re.sub(r'[^\w\s\-\.]', '', text)
        
        return text.strip()
    
    def get_stats(self) -> Dict:
        """
        Get reduction statistics
        
        Returns:
            dict: Stats including reduction percentage
        """
        if self.stats['total_chars_in'] > 0:
            reduction_percent = (
                (self.stats['total_chars_in'] - self.stats['total_chars_out']) /
                self.stats['total_chars_in'] * 100
            )
            self.stats['reduction_percent'] = reduction_percent
        
        return self.stats.copy()
    
    def reset_stats(self):
        """Reset statistics"""
        for key in self.stats:
            if isinstance(self.stats[key], (int, float)):
                self.stats[key] = 0 if isinstance(self.stats[key], int) else 0.0


# ============================================
# UTILITY FUNCTIONS
# ============================================

def reduce_text(
    text: str,
    nlp_mode: str = 'basic',
    custom_stop_words: Optional[Set[str]] = None
) -> str:
    """
    Convenience function: Reduce text in one call
    
    Args:
        text: Input text
        nlp_mode: Processing mode ('basic', 'pos', 'aggressive')
        custom_stop_words: Additional stop words
        
    Returns:
        str: Reduced text
    """
    reducer = TextReducer(nlp_mode, custom_stop_words)
    return reducer.reduce(text)


if __name__ == '__main__':
    # Example usage
    logging.basicConfig(level=logging.INFO)
    
    sample_text = """
    <h1>Welcome to Data Processing</h1>
    
    This is a sample text for testing the text reduction engine.
    We will analyze how much data can be reduced using various techniques.
    
    HTML tags and URLs like https://example.com will be removed.
    Stop words such as 'and', 'or', 'the', 'a', 'an' will be filtered out.
    
    Contact us at: support@example.com for more information.
    
    The reduction pipeline includes:
    1. HTML cleaning
    2. URL removal
    3. Stop-word filtering
    4. Optional POS tagging (keeping nouns and verbs)
    5. Final normalization
    """
    
    print("Original text:")
    print(f"Length: {len(sample_text)} characters\n")
    print(sample_text[:200] + "...\n")
    
    # Test different modes
    for mode in ['basic', 'pos']:
        print(f"\n--- Mode: {mode} ---")
        reducer = TextReducer(nlp_mode=mode)
        
        reduced = reducer.reduce(sample_text)
        stats = reducer.get_stats()
        
        print(f"Reduced length: {len(reduced)} characters")
        print(f"Reduction: {stats['reduction_percent']:.1f}%")
        print(f"Reduced text: {reduced[:100]}...\n")
