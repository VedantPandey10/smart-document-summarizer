import React from 'react';

interface SummaryViewProps {
    summary: string;
    onReset: () => void;
}

const SummaryView: React.FC<SummaryViewProps> = ({ summary, onReset }) => {
    return (
        <div className="glass-card p-8 w-full max-w-3xl text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-glass-border">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>
                    Generated Summary
                </h2>
                <div className="flex gap-2">
                    <button
                        className="p-2 rounded-lg bg-glass border border-glass-border hover:bg-zinc-800 transition-colors"
                        title="Download PDF"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </button>
                    <button
                        onClick={onReset}
                        className="p-2 rounded-lg bg-glass border border-glass-border hover:bg-zinc-800 transition-colors text-zinc-400"
                        title="Upload New"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="prose prose-invert max-w-none">
                {summary.split('\n').map((line, i) => (
                    <p key={i} className="text-zinc-300 leading-relaxed mb-4">
                        {line}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default SummaryView;
