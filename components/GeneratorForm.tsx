import React, { useState } from 'react';
import { Zap, RotateCcw, PenTool } from 'lucide-react';
import { FileType, FileTypeExtensions, GenerationRequest } from '../types';
import { PRESET_PROMPTS } from '../constants';

interface GeneratorFormProps {
  onGenerate: (request: GenerationRequest) => void;
  isLoading: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [filename, setFilename] = useState('');
  const [fileType, setFileType] = useState<FileType>(FileType.PYTHON);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !filename.trim()) return;
    onGenerate({ prompt, filename, type: fileType });
  };

  const handlePreset = (preset: typeof PRESET_PROMPTS[0]) => {
    setPrompt(preset.prompt);
    setFilename(preset.filename);
    setFileType(preset.type);
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-xl flex flex-col h-full overflow-y-auto">
      <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
        <PenTool className="w-5 h-5 mr-2 text-blue-400" />
        Configuration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
        {/* Filename & Type Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Filename</label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="e.g. script"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Extension</label>
            <div className="relative">
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value as FileType)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                {Object.values(FileType).map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)} ({FileTypeExtensions[type]})
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Prompt Input */}
        <div className="space-y-2 flex-1 flex flex-col">
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Description</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want the file to contain. E.g., 'A Python function to calculate the factorial of a number recursively'"
            className="w-full flex-1 min-h-[150px] bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none placeholder-slate-600"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center space-x-2 py-4 rounded-lg font-semibold text-lg transition-all transform active:scale-95 ${
              isLoading 
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25'
            }`}
          >
            {isLoading ? (
               <span>Processing...</span>
            ) : (
               <>
                 <Zap className="w-5 h-5 fill-current" />
                 <span>Generate File</span>
               </>
            )}
          </button>
        </div>
      </form>

      {/* Presets */}
      <div className="mt-8 pt-6 border-t border-slate-700">
        <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Quick Start Presets</h3>
        <div className="grid grid-cols-1 gap-2">
          {PRESET_PROMPTS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handlePreset(preset)}
              type="button"
              className="text-left px-3 py-2 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center group"
            >
              <RotateCcw className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              {preset.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};