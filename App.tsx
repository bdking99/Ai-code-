import React, { useState } from 'react';
import { Header } from './components/Header';
import { GeneratorForm } from './components/GeneratorForm';
import { Editor } from './components/Editor';
import { GeneratedFile, GenerationRequest, FileTypeExtensions } from './types';
import { generateFileContent } from './services/geminiService';

export default function App() {
  const [currentFile, setCurrentFile] = useState<GeneratedFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (request: GenerationRequest) => {
    setIsLoading(true);
    setCurrentFile(null); // Clear previous results while loading to give visual feedback

    try {
      const content = await generateFileContent(request.prompt, request.type);
      
      const newFile: GeneratedFile = {
        id: crypto.randomUUID(),
        filename: request.filename,
        extension: FileTypeExtensions[request.type],
        content: content,
        timestamp: Date.now()
      };
      
      setCurrentFile(newFile);
    } catch (error) {
      alert(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateContent = (newContent: string) => {
    if (currentFile) {
      setCurrentFile({ ...currentFile, content: newContent });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-500/30">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)] min-h-[600px]">
          
          {/* Left Panel: Inputs */}
          <div className="lg:col-span-4 h-full">
            <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>

          {/* Right Panel: Output/Editor */}
          <div className="lg:col-span-8 h-full">
            <Editor 
              file={currentFile} 
              isLoading={isLoading} 
              onUpdateContent={handleUpdateContent}
            />
          </div>
        </div>
      </main>
    </div>
  );
}