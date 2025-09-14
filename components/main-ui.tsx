'use client'

import { useState } from "react";
import ChatPanel from "./chat-panel";
import FlowchartPanel from "./flowchart-panel";

const MainUI = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'diagram'>('chat');
  const [mermaidCode, setMermaidCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleDiagramGenerated = (code: string) => {
    setMermaidCode(code);
    setError(""); // Clear any previous errors

    if (window.innerWidth < 768) {
      setActiveTab('diagram');
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setMermaidCode(""); // Clear any previous diagram
  };

  return (
    <>
      <div className="md:hidden flex bg-white dark:bg-neutral-900 border-b border-gray-200/60 dark:border-neutral-700/60 px-4 py-2">
        <div className="flex w-full bg-gray-100 dark:bg-neutral-800 rounded-full p-1 relative overflow-hidden">
          <div 
            className={`absolute top-1 bottom-1 w-1/2 bg-white dark:bg-neutral-700 rounded-full shadow-sm transition-transform duration-300 ease-out ${
              activeTab === 'chat' ? 'transform translate-x-0' : 'transform translate-x-full'
            }`}
          />
          
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 px-6 text-center font-medium text-sm tracking-wide transition-all duration-300 relative z-10 rounded-full ${
              activeTab === 'chat'
                ? 'text-black dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('diagram')}
            className={`flex-1 py-3 px-6 text-center font-medium text-sm tracking-wide transition-all duration-300 relative z-10 rounded-full ${
              activeTab === 'diagram'
                ? 'text-black dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Diagram
          </button>
        </div>
      </div>

      <main className="flex h-screen w-full bg-white dark:bg-neutral-900 transition-colors">
        <div className="hidden md:flex w-full">
          <ChatPanel 
            onDiagramGenerated={handleDiagramGenerated}
            onError={handleError}
          />
          <FlowchartPanel 
            mermaidCode={mermaidCode}
            error={error}
            key={mermaidCode ? mermaidCode : 'empty'}
          />
        </div>

        <div className="md:hidden w-full relative">
          <div style={{ display: activeTab === 'chat' ? 'block' : 'none' }} className="h-full">
            <ChatPanel 
              onDiagramGenerated={handleDiagramGenerated}
              onError={handleError}
            />
          </div>
          <div style={{ display: activeTab === 'diagram' ? 'block' : 'none' }} className="h-full">
            <FlowchartPanel 
              mermaidCode={mermaidCode}
              error={error}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default MainUI;
