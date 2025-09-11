'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  code: string;
  onError?: (error: string) => void;
}

export function MermaidDiagram({ code, onError }: MermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [diagramId] = useState(() => `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    // Initialize mermaid with configuration
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'Inter, system-ui, sans-serif',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      },
      sequence: {
        useMaxWidth: true,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35
      },
      class: {
        useMaxWidth: true
      },
      er: {
        useMaxWidth: true
      },
      journey: {
        useMaxWidth: true
      },
      gantt: {
        useMaxWidth: true,
        fontSize: 11,
        numberSectionStyles: 4
      }
    });
  }, []);

  useEffect(() => {
    if (!code || !elementRef.current) {
      setIsLoading(false);
      return;
    }

    const renderDiagram = async () => {
      try {
        setIsLoading(true);
        
        console.log('Attempting to render Mermaid code:', code);
        
        // Clear previous content
        if (elementRef.current) {
          elementRef.current.innerHTML = '';
        }

        // Clean the code one more time to ensure it's valid
        const cleanCode = code
          .replace(/^---+\s*/g, '') // Remove leading dashes
          .replace(/\s*---+$/g, '') // Remove trailing dashes
          .trim();

        console.log('Cleaned code for rendering:', cleanCode);

        // Validate and render the diagram
        const isValid = await mermaid.parse(cleanCode);
        if (!isValid) {
          throw new Error('Invalid Mermaid syntax');
        }

        const { svg } = await mermaid.render(diagramId, cleanCode);
        
        if (elementRef.current) {
          elementRef.current.innerHTML = svg;
          
          // Make the SVG responsive
          const svgElement = elementRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.height = 'auto';
            svgElement.style.display = 'block';
            svgElement.style.margin = '0 auto';
          }
        }
        
        console.log('Diagram rendered successfully');
        setIsLoading(false);
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
        console.error('Failed code:', code);
        setIsLoading(false);
        
        const errorMessage = error instanceof Error ? error.message : 'Failed to render diagram';
        onError?.(errorMessage);
        
        // Show error in the component
        if (elementRef.current) {
          elementRef.current.innerHTML = `
            <div class="flex items-center justify-center h-40 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div class="text-center">
                <div class="text-red-600 dark:text-red-400 text-sm font-medium mb-1">
                  Diagram Render Error
                </div>
                <div class="text-red-500 dark:text-red-300 text-xs mb-2">
                  ${errorMessage}
                </div>
                <details class="text-left">
                  <summary class="text-xs text-red-400 cursor-pointer">Show code</summary>
                  <pre class="text-xs text-red-300 mt-1 p-2 bg-red-900/10 rounded whitespace-pre-wrap">${code}</pre>
                </details>
              </div>
            </div>
          `;
        }
      }
    };

    renderDiagram();
  }, [code, diagramId, onError]);

  if (!code) {
    return (
      <div className="flex items-center justify-center h-40 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="text-center">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            No diagram to display
          </div>
          <div className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Generate a diagram from your text
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Rendering diagram...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div 
        ref={elementRef} 
        className="mermaid-container w-full overflow-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
        style={{
          minHeight: '200px',
          maxHeight: '80vh'
        }}
      />
    </div>
  );
}