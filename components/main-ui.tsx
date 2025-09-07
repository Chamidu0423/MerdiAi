'use client'

import ChatPanel from "./chat-panel";
import FlowchartPanel from "./flowchart-panel";

// components/main-ui.tsx

const MainUI = () => {
  return (
    <>
      <main className="flex h-screen w-full bg-white dark:bg-neutral-900 transition-colors">
        {/* Left Panel */}
        <ChatPanel />
        {/* Right Panel */}
        <FlowchartPanel />
      </main>
    </>
  );
};

export default MainUI;
