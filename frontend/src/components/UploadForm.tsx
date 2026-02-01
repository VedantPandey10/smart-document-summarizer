import React, { useState, useCallback } from 'react';

interface UploadFormProps {
    onFileSelect: (file: File) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onFileSelect }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) onFileSelect(file);
    }, [onFileSelect]);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onFileSelect(file);
    };

    return (
        <div
            className={`glass-card p-12 w-full max-w-2xl border-dashed border-2 transition-all duration-300 ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-glass-border hover:border-primary/50'
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="flex flex-col items-center gap-6">
                <div className="p-6 rounded-full bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                </div>

                <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Upload Document</h3>
                    <p className="text-zinc-400">Drag & drop your PDF or text file here</p>
                </div>

                <label className="btn-primary cursor-pointer">
                    Browse Files
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFileInput}
                        accept=".pdf,.txt,.docx"
                    />
                </label>

                <p className="text-xs text-zinc-500 uppercase tracking-widest">
                    Supported: PDF, TXT, DOCX
                </p>
            </div>
        </div>
    );
};

export default UploadForm;
