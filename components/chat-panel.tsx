"use client";
import { ChevronLeft, SendHorizonal, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LLMService } from "@/lib/llm-service";

interface ChatPanelProps {
  onDiagramGenerated: (mermaidCode: string) => void;
  onError: (error: string) => void;
}

const ChatPanel = ({ onDiagramGenerated, onError }: ChatPanelProps) => {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const handleSendMessage = async () => {
    if (!inputText.trim() || isGenerating) return;
    
    try {
      setIsGenerating(true);
      onError(""); // Clear any previous errors
      
      const response = await LLMService.generateMermaidDiagram(inputText.trim());
      
      if (response.success && response.mermaidCode) {
        onDiagramGenerated(response.mermaidCode);
        setInputText(""); // Clear input on success
      } else {
        onError(response.error || "Failed to generate diagram");
      }
    } catch (error) {
      console.error("Error generating diagram:", error);
      onError("An unexpected error occurred while generating the diagram");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className="
            flex flex-col relative
            w-full md:w-1/2 h-full
            bg-[radial-gradient(circle_at_center,_rgba(255,192,203,0.6),_rgba(221,160,221,0.4),_rgba(255,255,255,1))] 
            dark:bg-[radial-gradient(circle_at_center,_rgba(139,0,139,0.6),_rgba(75,0,130,0.5),_rgba(18,18,18,1))]
          "
    >
      <div className="flex items-center gap-2 p-6 pb-0">
        <button className="p-2 cursor-pointer" onClick={() => router.push("/")}>
          <ChevronLeft className=" w-7 h-7 text-black dark:text-white" />
        </button>
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="MerdiAI Logo" className="w-8 h-8 rounded" />
          <span className="text-xl font-semibold text-foreground">MerdiAI</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 text-center px-6">
          <div className="text-2xl mb-4 text-black dark:text-white">
            {isGenerating ? (
              <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/2728/512.gif" alt="✨" width="32" height="32" className="mx-auto" />
            ) : (
              '✨'
            )}
          </div>
          <h1 className="text-xl md:text-2xl text-black dark:text-white">
            {isGenerating ? "Generating your diagram..." : "Say our AI anything"}
          </h1>
        </div>

        <div className={`fixed bottom-0 left-0 right-0 md:right-1/2 p-6 bg-gradient-to-t from-white/95 via-white/90 to-transparent dark:from-neutral-900/95 dark:via-neutral-900/90 backdrop-blur-sm`}>
          <div className="relative w-full max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Say your Scenario..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isGenerating}
              className={`w-full rounded-full border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-6 py-6 pr-20 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isGenerating ? 'rainbow-border-animate' : ''}`}
            />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button 
              onClick={() => router.push('/settings')}
              disabled={isGenerating}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition cursor-pointer text-black/50 hover:text-black duration-300 dark:text-white/50 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Settings className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isGenerating}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition cursor-pointer text-black/50 hover:text-black duration-300 dark:text-white/50 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SendHorizonal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="h-24"></div>
    </div>
  );
};

export default ChatPanel;
