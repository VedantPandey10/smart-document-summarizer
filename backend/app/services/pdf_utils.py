import PyPDF2
from io import BytesIO
from typing import BinaryIO


def extract_text_from_pdf(file: BinaryIO) -> str:
    """
    Extract text content from a PDF file.
    
    Args:
        file: Binary file object (PDF)
        
    Returns:
        Extracted text as a string
        
    Raises:
        ValueError: If PDF is empty or cannot be read
    """
    try:
        pdf_reader = PyPDF2.PdfReader(file)
        
        if len(pdf_reader.pages) == 0:
            raise ValueError("PDF file is empty")
        
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        
        if not text.strip():
            raise ValueError("Could not extract text from PDF. The file might be image-based.")
        
        return text.strip()
    
    except Exception as e:
        raise ValueError(f"Error processing PDF: {str(e)}")


def extract_text_from_txt(file: BinaryIO) -> str:
    """
    Extract text content from a TXT file.
    
    Args:
        file: Binary file object (TXT)
        
    Returns:
        Extracted text as a string
        
    Raises:
        ValueError: If file cannot be decoded
    """
    try:
        content = file.read()
        # Try UTF-8 first, fall back to latin-1
        try:
            text = content.decode('utf-8')
        except UnicodeDecodeError:
            text = content.decode('latin-1')
        
        if not text.strip():
            raise ValueError("File is empty")
        
        return text.strip()
    
    except Exception as e:
        raise ValueError(f"Error processing text file: {str(e)}")
