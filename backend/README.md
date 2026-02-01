# Smart Document Summarizer - Backend

AI-powered document summarization API built with FastAPI and OpenAI.

## Features

- 📄 **PDF & Text Processing**: Extract text from PDF and TXT files
- 🤖 **AI Summarization**: Generate summaries using OpenAI GPT models
- 📊 **Multiple Summary Types**: Concise, detailed, or bullet-point summaries
- 🔒 **File Validation**: Size limits and type checking
- 🚀 **Fast API**: Built with FastAPI for high performance

## Prerequisites

- Python 3.9 or higher
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Setup Instructions

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment
Create a `.env` file from the example:
```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 4. Run the Server
```bash
# Development mode
uvicorn app.main:app --reload

# Or using Python
python -m app.main
```

The API will be available at `http://localhost:8000`

## API Endpoints

### 📚 Documentation
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### 🔗 Endpoints

#### 1. Upload Document
```http
POST /api/upload
Content-Type: multipart/form-data

file: <PDF or TXT file>
```

**Response:**
```json
{
  "filename": "document.pdf",
  "file_size": 12345,
  "extracted_text": "...",
  "text_length": 5000,
  "message": "Document uploaded and processed successfully"
}
```

#### 2. Summarize Text
```http
POST /api/summarize
Content-Type: application/json

{
  "text": "Long text to summarize...",
  "summary_type": "concise",
  "max_length": 500
}
```

**Response:**
```json
{
  "summary": "Generated summary...",
  "original_length": 5000,
  "summary_length": 250,
  "compression_ratio": 0.05,
  "timestamp": "2026-02-01T14:00:00"
}
```

#### 3. Summarize Document (All-in-One)
```http
POST /api/summarize-document
Content-Type: multipart/form-data

file: <PDF or TXT file>
summary_type: concise
max_length: 500
```

**Response:** Same as summarize endpoint

## Summary Types

- `concise` - Brief, focused summary (default)
- `detailed` - Comprehensive summary with key points
- `bullet_points` - Main ideas as bullet points

## Configuration

All settings can be configured via environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | Required | Your OpenAI API key |
| `OPENAI_MODEL` | `gpt-3.5-turbo` | OpenAI model to use |
| `MAX_TOKENS` | `1000` | Maximum tokens for summary |
| `TEMPERATURE` | `0.7` | AI creativity (0.0-1.0) |
| `MAX_FILE_SIZE` | `10485760` | Max upload size (bytes) |
| `DEBUG` | `False` | Enable debug mode |

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration & settings
│   ├── models/
│   │   └── schemas.py       # Pydantic models
│   ├── routers/
│   │   └── summarize.py     # API endpoints
│   ├── services/
│   │   ├── pdf_utils.py     # PDF extraction
│   │   ├── text_cleaner.py  # Text processing
│   │   └── summarize.py     # OpenAI integration
│   └── utils/
├── requirements.txt
├── .env.example
└── README.md
```

## Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `400` - Bad Request (invalid file type, size, etc.)
- `500` - Internal Server Error

## Development

Run with auto-reload for development:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Docker Support

```bash
docker build -t smart-summarizer-backend .
docker run -p 8000:8000 --env-file .env smart-summarizer-backend
```

## License

MIT
