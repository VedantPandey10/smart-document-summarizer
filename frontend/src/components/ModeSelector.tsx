import React from 'react';

interface ModeSelectorProps {
    currentMode: string;
    onModeChange: (mode: string) => void;
}

const modes = [
    { id: 'concise', name: 'Concise', desc: 'Short, point-based summary' },
    { id: 'balanced', name: 'Balanced', desc: 'Detailed but readable' },
    { id: 'comprehensive', name: 'Comprehensive', desc: 'In-depth analysis' }
];

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
            <div className="grid grid-cols-3 gap-4">
                {modes.map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => onModeChange(mode.id)}
                        className={`p-4 rounded-xl border transition-all duration-300 text-left ${currentMode === mode.id
                                ? 'bg-primary/20 border-primary shadow-[0_0_15px_var(--primary-glow)]'
                                : 'bg-glass border-glass-border hover:border-zinc-700'
                            }`}
                    >
                        <div className={`font-bold ${currentMode === mode.id ? 'text-primary' : 'text-white'}`}>
                            {mode.name}
                        </div>
                        <div className="text-xs text-zinc-500 mt-1">
                            {mode.desc}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ModeSelector;
