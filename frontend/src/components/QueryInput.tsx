import React, { useState } from 'react';

interface QueryInputProps {
    onQuery: (query: string) => void;
    isPending: boolean;
}

const QueryInput: React.FC<QueryInputProps> = ({ onQuery, isPending }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() && !isPending) {
            onQuery(query);
            setQuery('');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl mt-8"
        >
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
                <div className="relative flex bg-bg-dark rounded-xl border border-glass-border focus-within:border-primary/50 transition-all overflow-hidden">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask a specific question about this document..."
                        className="flex-1 bg-transparent px-6 py-4 outline-none text-zinc-200 placeholder-zinc-600"
                    />
                    <button
                        type="submit"
                        disabled={isPending || !query.trim()}
                        className="px-6 py-4 bg-primary/10 hover:bg-primary/20 text-primary transition-colors disabled:opacity-50"
                    >
                        {isPending ? '...' : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default QueryInput;
