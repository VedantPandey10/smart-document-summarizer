from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # API Configuration
    app_name: str = "Smart Document Summarizer"
    app_version: str = "1.0.0"
    debug: bool = False
    
    # OpenAI Configuration
    openai_api_key: str
    openai_model: str = "gpt-3.5-turbo"
    max_tokens: int = 1000
    temperature: float = 0.7
    
    # File Upload Configuration
    max_file_size: int = 10 * 1024 * 1024  # 10MB in bytes
    allowed_extensions: list[str] = [".pdf", ".txt"]
    
    # CORS Configuration
    cors_origins: list[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    class Config:
        env_file = "../.env"
        env_file_encoding = "utf-8"


settings = Settings()
