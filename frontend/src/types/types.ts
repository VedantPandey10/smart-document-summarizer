export interface SummaryResponse {
    summary: string;
    original_length: number;
    summary_length: number;
    compression_ratio: number;
    timestamp: string;
}

export interface DocumentUploadResponse {
    filename: string;
    file_size: number;
    extracted_text: string;
    text_length: number;
    message: string;
}

export interface SummaryRequest {
    text: string;
    summary_type?: 'concise' | 'detailed' | 'bullet_points';
    max_length?: number;
}

export interface ApiError {
    error: string;
    detail?: string;
    code?: number;
}

export type SummaryMode = 'concise' | 'detailed' | 'bullet_points';
