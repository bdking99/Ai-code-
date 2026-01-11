import React from 'react';
import { Download, Copy, Check, FileCode } from 'lucide-react';
import { GeneratedFile } from '../types';

interface EditorProps {
  file: GeneratedFile | null;
  isLoading: boolean;
  onUpdateContent: (newContent: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ file, isLoading, onUpdateContent }) => {
  const [copied, setCopied] = React.useState(false);

  const handleDownload = () => {
    if (!file) return;
    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.filename}${file.extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!file) return;
    navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 text-slate-400 bg-slate-800/50 rounded-xl border border-slate-700 animate-pulse">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-medium">Generating magic...</p>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 bg-slate-800/30 rounded-xl border border-slate-700/50 p-8 text-center border-dashed border-2">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <FileCode className="w-8 h-8 opacity-50" />
        </div>
        <h3 className="text-lg font-medium text-slate-300">No file generated yet</h3>
        <p className="max-w-sm mt-2 text-sm">Use the panel on the left to describe what you need, and the AI will craft it for you.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">Preview:</span>
          <span className="text-blue-400 font-mono text-sm font-semibold">{file.filename}{file.extension}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded-md transition-colors"
            title="Copy to Clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="relative flex-1 group">
        <textarea
            className="w-full h-full bg-[#0d1117] text-slate-300 font-mono text-sm p-4 resize-none focus:outline-none focus:ring-0 leading-relaxed custom-scrollbar"
            value={file.content}
            onChange={(e) => onUpdateContent(e.target.value)}
            spellCheck={false}
        />
        <div className="absolute bottom-4 right-4 text-xs text-slate-600 bg-slate-900/80 px-2 py-1 rounded pointer-events-none">
            {file.content.length} characters
        </div>
      </div>
    </div>
  );
};