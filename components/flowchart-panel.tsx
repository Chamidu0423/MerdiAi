'use client';

import { MermaidDiagram } from "./mermaid-diagram";

interface FlowchartPanelProps {
  mermaidCode: string;
  error: string;
}

const FlowchartPanel = ({ mermaidCode, error }: FlowchartPanelProps) => {
  return (
    <div className="flex w-full md:w-1/2 bg-gray-50 dark:bg-black items-start justify-center p-4 h-full overflow-auto">
      <div className="w-full h-full">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Generated Diagram
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your AI-generated Mermaid diagram will appear here
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Error
                </h3>
                <div className="mt-1 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Diagram Display */}
        <div className="flex-1">
          <MermaidDiagram 
            code={mermaidCode} 
            onError={(err) => console.error('Mermaid rendering error:', err)}
          />
        </div>

        {mermaidCode && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              View Mermaid Code
            </summary>
            <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Raw code received from AI:
              </div>
              <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto whitespace-pre-wrap">
                <code>{mermaidCode}</code>
              </pre>
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

export default FlowchartPanel;
