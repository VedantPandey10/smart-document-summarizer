from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from app.models.schemas import (
    SummaryRequest, 
    SummaryResponse, 
    DocumentUploadResponse,
    ErrorResponse
)
from app.services.summarize import summarization_service
from app.services.pdf_utils import extract_text_from_pdf, extract_text_from_txt
from app.config import settings
from datetime import datetime
import os

router = APIRouter(prefix="/api", tags=["summarization"])


@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(file: UploadFile = File(...)):
    """
    Upload a document (PDF or TXT) and extract its text content.
    
    Args:
        file: Uploaded file
        
    Returns:
        DocumentUploadResponse with extracted text
        
    Raises:
        HTTPException: If file validation fails or extraction errors occur
    """
    # Validate file extension
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in settings.allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"File type not allowed. Supported types: {', '.join(settings.allowed_extensions)}"
        )
    
    # Read file content
    content = await file.read()
    file_size = len(content)
    
    # Validate file size
    if file_size > settings.max_file_size:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size: {settings.max_file_size / (1024*1024)}MB"
        )
    
    # Extract text based on file type
    try:
        if file_ext == ".pdf":
            from io import BytesIO
            text = extract_text_from_pdf(BytesIO(content))
        else:  # .txt
            from io import BytesIO
            text = extract_text_from_txt(BytesIO(content))
        
        return DocumentUploadResponse(
            filename=file.filename,
            file_size=file_size,
            extracted_text=text,
            text_length=len(text),
            message="Document uploaded and processed successfully"
        )
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.post("/summarize", response_model=SummaryResponse)
async def summarize_text(request: SummaryRequest):
    """
    Generate a summary of the provided text.
    
    Args:
        request: SummaryRequest containing text and options
        
    Returns:
        SummaryResponse with generated summary and metrics
        
    Raises:
        HTTPException: If summarization fails
    """
    try:
        # Generate summary
        summary = summarization_service.generate_summary(
            text=request.text,
            summary_type=request.summary_type or "concise",
            max_length=request.max_length
        )
        
        # Calculate metrics
        original_length = len(request.text)
        summary_length = len(summary)
        compression_ratio = round(summary_length / original_length, 3) if original_length > 0 else 0
        
        return SummaryResponse(
            summary=summary,
            original_length=original_length,
            summary_length=summary_length,
            compression_ratio=compression_ratio,
            timestamp=datetime.now()
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate summary: {str(e)}"
        )


@router.post("/summarize-document", response_model=SummaryResponse)
async def summarize_document(
    file: UploadFile = File(...),
    summary_type: str = "concise",
    max_length: int = None
):
    """
    Upload a document and get its summary in one step.
    
    Args:
        file: Uploaded document
        summary_type: Type of summary to generate
        max_length: Optional maximum summary length
        
    Returns:
        SummaryResponse with generated summary
        
    Raises:
        HTTPException: If processing fails
    """
    # First upload and extract text
    upload_response = await upload_document(file)
    
    # Then summarize the extracted text
    summary_request = SummaryRequest(
        text=upload_response.extracted_text,
        summary_type=summary_type,
        max_length=max_length
    )
    
    return await summarize_text(summary_request)
