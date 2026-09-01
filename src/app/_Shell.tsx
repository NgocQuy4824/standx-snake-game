"use client";

import { SnakeGame } from "@/components/snake/SnakeGame";

export function SnakeShell() {
  return (
    <div className="relative flex h-[100dvh] w-screen overflow-hidden bg-[#0a0a0a] font-[var(--font-nunito)]">
      {/* Background image — covers full screen */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/snake/ui/standx-banner.png)" }}
        aria-hidden
      />
      {/* Dark overlay — light so the banner shows clearly */}
      <div className="absolute inset-0 bg-black/30" aria-hidden />
      {/* Game on top */}
      <div className="relative z-10 flex h-full w-full">
        <SnakeGame />
      </div>
    </div>
  );
}
