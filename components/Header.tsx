import React from 'react';
import { FileCode, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 bg-opacity-90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
            <FileCode className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              GenAI File Smith <span className="text-xs font-normal text-blue-400 border border-blue-400/30 px-2 py-0.5 rounded-full">v1.0</span>
            </h1>
            <p className="text-xs text-slate-400">Powered by Gemini 3 Flash</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-500">
           <Sparkles className="w-4 h-4 text-amber-400" />
           <span>Intelligent Generation</span>
        </div>
      </div>
    </header>
  );
};