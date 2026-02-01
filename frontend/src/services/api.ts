import type { SummaryResponse, DocumentUploadResponse, SummaryRequest, SummaryMode } from '../types/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    /**
     * Upload a document and extract its text
     */
    async uploadDocument(file: File): Promise<DocumentUploadResponse> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${this.baseUrl}/api/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to upload document');
        }

        return response.json();
    }

    /**
     * Summarize text with specified mode and options
     */
    async summarizeText(
        text: string,
        summaryType: SummaryMode = 'concise',
        maxLength?: number
    ): Promise<SummaryResponse> {
        const request: SummaryRequest = {
            text,
            summary_type: summaryType,
            max_length: maxLength,
        };

        const response = await fetch(`${this.baseUrl}/api/summarize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to generate summary');
        }

        return response.json();
    }

    /**
     * Upload a document and get its summary in one call
     */
    async summarizeDocument(
        file: File,
        summaryType: SummaryMode = 'concise',
        maxLength?: number
    ): Promise<SummaryResponse> {
        const formData = new FormData();
        formData.append('file', file);

        const params = new URLSearchParams();
        params.append('summary_type', summaryType);
        if (maxLength) {
            params.append('max_length', maxLength.toString());
        }

        const response = await fetch(`${this.baseUrl}/api/summarize-document?${params}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to summarize document');
        }

        return response.json();
    }

    /**
     * Check API health
     */
    async healthCheck(): Promise<{ status: string; service: string }> {
        const response = await fetch(`${this.baseUrl}/health`);

        if (!response.ok) {
            throw new Error('API is not responding');
        }

        return response.json();
    }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
