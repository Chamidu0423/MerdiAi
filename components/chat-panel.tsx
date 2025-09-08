"use client";
import { ChevronLeft, SendHorizonal , Settings } from "lucide-react";
import { useRouter } from "next/navigation";
const ChatPanel = () => {
  const router = useRouter();
  return (
    <div
      className="
            flex flex-col justify-between 
            w-full md:w-1/2 p-6 
            bg-[radial-gradient(circle_at_center,_rgba(255,192,203,0.6),_rgba(221,160,221,0.4),_rgba(255,255,255,1))] 
            dark:bg-[radial-gradient(circle_at_center,_rgba(139,0,139,0.6),_rgba(75,0,130,0.5),_rgba(18,18,18,1))]
          "
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <button className="p-2 cursor-pointer" onClick={() => router.push("/")}>
          <ChevronLeft className=" w-7 h-7 text-black dark:text-white" />
        </button>
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="MerdiAI Logo" className="w-8 h-8 rounded" />
          <span className="text-xl font-semibold text-foreground">MerdiAI</span>
        </div>
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <div className="text-2xl mb-4 text-black dark:text-white">✨</div>
        <h1 className="text-xl md:text-2xl text-black dark:text-white">
          Say our AI anything
        </h1>
      </div>

      {/* Input area */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Say your Scenario..."
          className="w-full rounded-full border bg-white dark:bg-neutral-800/50 px-6 py-6 pr-20 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black/50 duration-300"
        />

        {/* Button container - positioned inside the input */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {/* Settings button */}
          <button 
            onClick={() => router.push('/settings')}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition cursor-pointer text-black/50 hover:text-black duration-300 dark:text-white/50 dark:hover:text-white"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          {/* Send button */}
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition cursor-pointer text-black/50 hover:text-black duration-300 dark:text-white/50 dark:hover:text-white">
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
