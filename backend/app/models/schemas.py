from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class SummaryRequest(BaseModel):
    """Request model for text summarization"""
    text: str = Field(..., description="Text content to summarize", min_length=1)
    max_length: Optional[int] = Field(None, description="Maximum length of summary")
    summary_type: Optional[str] = Field("concise", description="Type of summary: concise, detailed, or bullet_points")


class SummaryResponse(BaseModel):
    """Response model for summarization"""
    summary: str = Field(..., description="Generated summary")
    original_length: int = Field(..., description="Character count of original text")
    summary_length: int = Field(..., description="Character count of summary")
    compression_ratio: float = Field(..., description="Ratio of summary to original length")
    timestamp: datetime = Field(default_factory=datetime.now)


class DocumentUploadResponse(BaseModel):
    """Response model for document upload"""
    filename: str
    file_size: int
    extracted_text: str
    text_length: int
    message: str


class ErrorResponse(BaseModel):
    """Standard error response"""
    error: str
    detail: Optional[str] = None
    code: Optional[int] = None
