from openai import OpenAI
from app.config import settings
from app.services.text_cleaner import clean_text, truncate_text
from typing import Optional


class SummarizationService:
    """Service for generating text summaries using OpenAI"""
    
    def __init__(self):
        self.client = OpenAI(api_key=settings.openai_api_key)
        self.model = settings.openai_model
        self.max_tokens = settings.max_tokens
        self.temperature = settings.temperature
    
    def generate_summary(
        self, 
        text: str, 
        summary_type: str = "concise",
        max_length: Optional[int] = None
    ) -> str:
        """
        Generate a summary of the given text.
        
        Args:
            text: Text to summarize
            summary_type: Type of summary (concise, detailed, bullet_points)
            max_length: Optional maximum length for the summary
            
        Returns:
            Generated summary text
            
        Raises:
            Exception: If OpenAI API call fails
        """
        # Clean and truncate text if needed
        cleaned_text = clean_text(text)
        truncated_text = truncate_text(cleaned_text, max_chars=15000)
        
        # Create prompt based on summary type
        prompt = self._create_prompt(truncated_text, summary_type, max_length)
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that creates concise and accurate summaries of documents."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                max_tokens=max_length or self.max_tokens,
                temperature=self.temperature
            )
            
            summary = response.choices[0].message.content.strip()
            return summary
        
        except Exception as e:
            raise Exception(f"Failed to generate summary: {str(e)}")
    
    def _create_prompt(
        self, 
        text: str, 
        summary_type: str,
        max_length: Optional[int]
    ) -> str:
        """Create appropriate prompt based on summary type"""
        
        base_instruction = f"Please summarize the following text"
        
        if summary_type == "detailed":
            instruction = f"{base_instruction} in detail, capturing all key points and important information:"
        elif summary_type == "bullet_points":
            instruction = f"{base_instruction} as a list of bullet points highlighting the main ideas:"
        else:  # concise
            instruction = f"{base_instruction} concisely, focusing on the most important information:"
        
        if max_length:
            instruction += f"\n\nKeep the summary under {max_length} characters."
        
        return f"{instruction}\n\n{text}"


# Create singleton instance
summarization_service = SummarizationService()
