import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-12">
            <div className="relative w-24 h-24">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                {/* Inner Ring */}
                <div className="absolute inset-4 rounded-full border-4 border-secondary/20 border-b-secondary animate-reverse-spin"></div>
                {/* Center Glow */}
                <div className="absolute inset-8 bg-primary/30 rounded-full blur-md animate-pulse"></div>
            </div>
            <p className="mt-8 text-zinc-400 font-medium tracking-wider animate-pulse">
                PROCESSING DOCUMENT...
            </p>
            <style>{`
        @keyframes reverse-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-reverse-spin {
          animation: reverse-spin 1.5s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default Loader;
