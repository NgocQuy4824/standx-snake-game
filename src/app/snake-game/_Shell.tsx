"use client";

import { useState } from "react";
import { SnakeSidebar } from "@/components/snake/SnakeSidebar";
import { SnakeGame } from "@/components/snake/SnakeGame";

export function SnakeShell() {
  const [navOpen, setNavOpen] = useState(true);

  return (
    <div className="min-h-screen w-full bg-[#161616] font-[var(--font-nunito)]">
      <SnakeSidebar open={navOpen} onClose={() => setNavOpen((v) => !v)} />

      {/* Main game area — indented by nav width when open on desktop */}
      <div
        className={`flex min-h-screen w-full items-center justify-center px-4 py-6 transition-[padding] duration-200 lg:px-6 ${
          navOpen ? "lg:pl-[380px]" : "lg:pl-6"
        }`}
      >
        <div className="flex w-full max-w-[860px] flex-col items-center gap-5">
          {/* Small top bar: hamburger when nav is closed (mobile always needs it nearby) */}
          {!navOpen && (
            <button
              type="button"
              onClick={() => setNavOpen(true)}
              aria-label="Open navigation"
              className="self-start rounded-full bg-[#445620] px-4 py-2 text-sm font-bold text-white shadow hover:brightness-110 lg:self-auto"
            >
              ☰ Menu
            </button>
          )}

          <SnakeGame />

          <p className="max-w-[640px] text-center font-[var(--font-nunito)] text-[12px] leading-[1.6] text-white/55">
            Clone of{" "}
            <a href="https://snake-game.io" target="_blank" rel="noreferrer" className="text-[#c4bb52] hover:text-white hover:underline">
              snake-game.io
            </a>{" "}
            — built with Next.js + Canvas. The original game is a Google Snake embed; this clone implements its own classic snake
            engine. &quot;16 game modes / skins&quot; from the original description are noted in the sidebar; the playable demo here is
            classic wall-collision mode.
          </p>
        </div>
      </div>

      {/* Floating nav toggle when collapsed on mobile (so you can reopen) */}
      {!navOpen && (
        <button
          type="button"
          onClick={() => setNavOpen(true)}
          aria-label="Open menu"
          className="fixed left-0 top-[48px] z-30 flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-r-[10px] bg-[#445620] text-white shadow lg:hidden"
        >
          <span className="text-[18px]" aria-hidden>
            ›
          </span>
        </button>
      )}
    </div>
  );
}
