import { useState } from 'react';
import './App.css';
import apiService from './services/api';
import type { SummaryMode } from './types/types';
import UploadForm from './components/UploadForm';
import ModeSelector from './components/ModeSelector';
import SummaryView from './components/SummaryView';
import QueryInput from './components/QueryInput';
import Loader from './components/Loader';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState('balanced');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    // Auto-start summarization mock
    startSummarization(selectedFile);
  };

  const startSummarization = async (selectedFile: File, selectedMode: string = mode) => {
    setIsSummarizing(true);
    setSummary(null);

    try {
      const response = await apiService.summarizeDocument(selectedFile, selectedMode as SummaryMode);
      setSummary(response.summary);
    } catch (error) {
      console.error('Summarization failed:', error);
      setSummary(`Error: ${error instanceof Error ? error.message : 'Failed to generate summary'}`);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleQuery = async (query: string) => {
    if (!summary) return;

    setIsQuerying(true);
    try {
      // For Q&A, we can use the summarizeText endpoint with the context
      const response = await apiService.summarizeText(
        `Context: ${summary}\n\nQuestion: ${query}`,
        'concise'
      );
      setSummary(prev => `${prev}\n\n**Q&A Response for "${query}":**\n${response.summary}`);
    } catch (error) {
      console.error('Query failed:', error);
      alert('Failed to get answer. Please try again.');
    } finally {
      setIsQuerying(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setSummary(null);
    setMode('balanced');
  };

  return (
    <div className="main-container">
      <div className="glow"></div>
      <div className="glow glow-2"></div>

      <header className="hero-section">
        <h1 className="hero-title">Smart Summarizer</h1>
        <p className="hero-subtitle">Transform long documents into concise, actionable insights using AI.</p>
      </header>

      {!file && !isSummarizing && (
        <UploadForm onFileSelect={handleFileSelect} />
      )}

      {file && (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
          {!summary && !isSummarizing ? (
            <div className="glass-card p-6 flex items-center gap-4">
              <span className="text-zinc-400">File: {file.name}</span>
              <button onClick={resetAll} className="text-xs text-red-400 hover:text-red-300">Remove</button>
            </div>
          ) : null}

          {isSummarizing ? (
            <Loader />
          ) : (
            <>
              {summary && (
                <>
                  <ModeSelector currentMode={mode} onModeChange={(m) => { setMode(m); startSummarization(file, m); }} />
                  <SummaryView summary={summary} onReset={resetAll} />
                  <QueryInput onQuery={handleQuery} isPending={isQuerying} />
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;