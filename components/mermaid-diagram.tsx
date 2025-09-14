"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Download, Palette } from "lucide-react";

interface MermaidDiagramProps {
  code: string;
  onError?: (error: string) => void;
}

type MermaidTheme = "default" | "dark" | "forest" | "neutral";

export function MermaidDiagram({ code, onError }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<MermaidTheme>("default");
  const diagramId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const containerStyle: React.CSSProperties = {
    height: "calc(100vh - 140px)",
    maxHeight: "calc(100vh - 120px)"
  };

  useEffect(() => {
    if (!code) {
      setSvg("");
      setError(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);

    const cleanCode = code
      .replace(/^---+\s*/g, "")
      .replace(/\s*---+$/g, "")
      .trim();

    mermaid.initialize({
      startOnLoad: false,
      theme: theme,
      securityLevel: "loose",
      fontFamily: "Inter, system-ui, sans-serif",
      flowchart: { useMaxWidth: true, htmlLabels: true, curve: "basis" },
      sequence: { useMaxWidth: true, actorMargin: 50, width: 150, height: 65, boxMargin: 10, boxTextMargin: 5, noteMargin: 10, messageMargin: 35 },
      class: { useMaxWidth: true },
      er: { useMaxWidth: true },
      journey: { useMaxWidth: true },
      gantt: { useMaxWidth: true, fontSize: 11, numberSectionStyles: 4 }
    });

    (async function() {
      try {
        await mermaid.parse(cleanCode);
        const renderResult = await mermaid.render(diagramId, cleanCode);
        let svgOut = "";
        if (typeof renderResult === "string") {
          svgOut = renderResult;
        } else if (renderResult && typeof renderResult === "object" && "svg" in renderResult) {
          svgOut = renderResult.svg;
        } else {
          svgOut = String(renderResult);
        }
        setSvg(svgOut);
        setIsLoading(false);
      } catch (err) {
        setSvg("");
        setIsLoading(false);
        const errorMessage = err instanceof Error ? err.message : "Failed to render diagram";
        setError(errorMessage);
        if (onError) onError(errorMessage);
      }
    })();
  }, [code, theme]);

  const handleDownloadSvg = async () => {
    if (!svgContainerRef.current) return;
    const svgElement = svgContainerRef.current.querySelector('svg');
    if (!svgElement) return;

    setIsDownloading(true);

    const clonedSvgElement = svgElement.cloneNode(true) as SVGSVGElement;

    clonedSvgElement.removeAttribute('width');
    clonedSvgElement.removeAttribute('height');
    clonedSvgElement.style.width = '';
    clonedSvgElement.style.height = '';
    clonedSvgElement.style.maxWidth = 'none';
    clonedSvgElement.style.maxHeight = 'none';

    const style = document.createElement('style');
    let css = '';
    for (const sheet of Array.from(document.styleSheets)) {
        try {
            if (sheet.cssRules) {
                css += Array.from(sheet.cssRules)
                    .map(rule => rule.cssText)
                    .join('\\n');
            }
        } catch (e) {
            console.warn("Could not read CSS rules from stylesheet:", e);
        }
    }
    style.appendChild(document.createTextNode(css));
    clonedSvgElement.prepend(style);

    const svgString = new XMLSerializer().serializeToString(clonedSvgElement);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => setIsDownloading(false), 1000);
  };



  if (!code) {
    return (
      <div className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 flex items-center justify-center" style={containerStyle}>
        <div className="text-center">
          <div className="text-gray-500 dark:text-gray-400 text-sm">No diagram to display</div>
          <div className="text-gray-400 dark:text-gray-500 text-xs mt-1">Generate a diagram from your text</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 flex items-center justify-center" style={containerStyle}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">Rendering diagram...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6 flex items-center justify-center" style={containerStyle}>
        <div className="text-center w-full">
          <div className="text-red-600 dark:text-red-400 text-sm font-medium mb-1">Diagram Render Error</div>
          <div className="text-red-500 dark:text-red-300 text-xs mb-2">{error}</div>
          <details className="text-left">
            <summary className="text-xs text-red-400 cursor-pointer">Show code</summary>
            <pre className="text-xs text-red-300 mt-1 p-2 bg-red-900/10 rounded whitespace-pre-wrap max-h-96 overflow-auto">{code}</pre>
          </details>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-end mb-2">
        <button
          onClick={handleDownloadSvg}
          className="px-4 py-2 rounded-3xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center"
          disabled={!svg || isDownloading}
        >
          <Download className={`mr-2 h-4 w-4 ${isDownloading ? 'animate-bounce' : ''}`} />
          {isDownloading ? 'Downloading...' : 'Download SVG'}
        </button>
      </div>
      <div className="relative">
        <div
          ref={svgContainerRef}
          className="mermaid-container w-full overflow-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 h-auto"
          style={containerStyle}
        >
          <style>{`
            .mermaid-container svg {
              width: 100% !important;
              height: auto !important;
              max-width: 100%;
              max-height: 100%;
              display: block;
              margin: auto;
            }
          `}</style>
          <div className="w-full h-full flex items-start justify-center">
            <div dangerouslySetInnerHTML={{ __html: svg }} />
          </div>
        </div>

        <Menu as="div" className="absolute bottom-10 right-4">
          <div>
            <Menu.Button className="w-12 h-12 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500">
              <img src="/theme-icon.png" alt="Theme" className="w-full h-full rounded-full" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute bottom-full right-0 mb-2 w-56 origin-bottom-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setTheme("default")}
                      className={`flex w-full items-center px-4 py-2 text-sm font-medium transition-colors ${
                        active ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100" : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div className="w-3.5 h-3.5 mr-3 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                        {theme === "default" && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                      </div>
                      Default
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setTheme("dark")}
                      className={`flex w-full items-center px-4 py-2 text-sm font-medium transition-colors ${
                        active ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100" : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div className="w-3.5 h-3.5 mr-3 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                        {theme === "dark" && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                      </div>
                      Dark
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setTheme("forest")}
                      className={`flex w-full items-center px-4 py-2 text-sm font-medium transition-colors ${
                        active ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100" : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div className="w-3.5 h-3.5 mr-3 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                        {theme === "forest" && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                      </div>
                      Forest
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setTheme("neutral")}
                      className={`flex w-full items-center px-4 py-2 text-sm font-medium transition-colors ${
                        active ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100" : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div className="w-3.5 h-3.5 mr-3 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                        {theme === "neutral" && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                      </div>
                      Neutral
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}