"use client";

import { useState } from "react";

const GAMES = [
  { href: "https://snake-game.io/goat-rampage", img: "/snake/games/goat-rampage.webp", title: "Goat Rampage" },
  { href: "https://snake-game.io/steal-an-egg", img: "/snake/games/steal-an-egg.webp", title: "Steal An Egg!" },
  { href: "https://snake-game.io/crystal-circuit", img: "/snake/games/crystal-circuit.webp", title: "Crystal Circuit" },
  { href: "https://snake-game.io/dangerous-turn", img: "/snake/games/dangerous-turn.webp", title: "Dangerous Turn" },
  { href: "https://snake-game.io/rider-rush", img: "/snake/games/rider-rush.webp", title: "Rider Rush" },
  { href: "https://snake-game.io/glowing-snake", img: "/snake/games/glowing-snake.webp", title: "Glowing Snake" },
];

export function SnakeSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      <button
        aria-label="Close sidebar"
        onClick={onClose}
        className={`fixed inset-0 z-[998] bg-black/50 transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* Drawer */}
      <nav
        className={`fixed inset-y-0 left-0 z-[1000] flex w-full max-w-[350px] flex-col bg-[#445620] transition-transform duration-200 ${
          open ? "translate-x-0 shadow-[5px_0_10px_rgba(0,0,0,0.25)]" : "-translate-x-full"
        }`}
        aria-label="Site navigation"
      >
        {/* Toggle chevron button (rotated when open) */}
        <button
          type="button"
          onClick={onClose}
          aria-label={open ? "Close menu" : "Open menu"}
          className="absolute -right-[50px] top-[50px] flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-r-[10px] border-r border-[#445620] bg-[#445620] text-white"
        >
          <span className={`inline-block transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden>
            <svg width="18" height="18" viewBox="0 0 19 28" fill="currentColor">
              <path d="M17.297 13.703l-11.594 11.594c-0.391 0.391-1.016 0.391-1.406 0l-2.594-2.594c-0.391-0.391-0.391-1.016 0-1.406l8.297-8.297-8.297-8.297c-0.391-0.391-0.391-1.016 0-1.406l2.594-2.594c0.391-0.391 1.016-0.391 1.406 0l11.594 11.594c0.391 0.391 0.391 1.016 0 1.406z" />
            </svg>
          </span>
        </button>

        {/* Info (i) button */}
        <button
          type="button"
          onClick={() => setAboutOpen((v) => !v)}
          aria-label="About this game"
          className="absolute -right-[50px] top-[130px] flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-r-[10px] border-r border-[#445620] bg-[#445620] text-white"
          aria-pressed={aboutOpen}
        >
          <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
            <path d="M14 9.5c0-0.825 0.675-1.5 1.5-1.5h1c0.825 0 1.5 0.675 1.5 1.5v1c0 0.825-0.675 1.5-1.5 1.5h-1c-0.825 0-1.5-0.675-1.5-1.5v-1z" />
            <path d="M20 24h-8v-2h2v-6h-2v-2h6v8h2z" />
            <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z" />
          </svg>
        </button>

        {/* Scroll container */}
        <div className="flex h-full flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Site title */}
          <div className="px-6 pb-2 pt-6 text-white">
            <h2 className="font-[var(--font-nunito)] text-[22px] font-bold leading-none">Snake Game</h2>
            <p className="mt-2 font-[var(--font-nunito)] text-[13px] leading-[1.6] text-white/85">
              The classic Snake Game is back with many exciting new improvements and is completely free-to-play online. Let&apos;s see, how
              patient are you?
            </p>
          </div>

          {/* Related games grid */}
          <div className="w-full px-2">
            <ul className="grid list-none grid-cols-[repeat(auto-fit,120px)] justify-center gap-[10px] px-2 py-8">
              {GAMES.map((g) => (
                <li key={g.title} className="box-border">
                  <a
                    href={g.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={g.title}
                    className="group relative block h-[120px] w-[120px] overflow-hidden rounded-[5px] border border-transparent shadow-[0_-1px_5px_0_rgba(196,192,99,0.5)] hover:border-[#fffd68]"
                  >
                    {/* eslint-disable @next/next/no-img-element */}
                    <img src={g.img} alt={g.title} className="block h-[120px] w-[120px] rounded-[5px] object-cover" />
                    <span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.7)_0,rgba(255,255,255,0)_85%)] px-[10px] pb-[2px] pt-[25px] text-center text-[14px] font-bold capitalize text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="line-clamp-2 leading-[1.5]">{g.title}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex justify-center pb-4">
              <a
                href="https://snake-game.io/new-games"
                target="_blank"
                rel="noreferrer"
                className="font-[var(--font-nunito)] text-[13px] font-bold text-[#c4bb52] hover:text-white"
              >
                More games
              </a>
            </div>
          </div>

          {/* Footer menu */}
          <div className="mt-auto border-t border-white/10 px-6 py-4">
            <ul className="flex flex-wrap gap-x-4 gap-y-1 font-[var(--font-nunito)] text-[12px] text-white/80">
              <li>
                <a href="https://snake-game.io/about-us" target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="https://snake-game.io/contact-us" target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="https://snake-game.io/dmca" target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
                  DMCA
                </a>
              </li>
              <li>
                <a href="https://snake-game.io/privacy-policy" target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://snake-game.io/terms-of-service" target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Info popup (about) — overlays the page, not the nav */}
      {aboutOpen && (
        <div className="fixed inset-0 z-[1001] overflow-y-auto bg-black/50 p-4 sm:p-8" onClick={() => setAboutOpen(false)} role="presentation">
          <div
            className="relative mx-auto max-w-[832px] rounded-[24px] bg-[#445620] p-6 sm:p-10 text-white"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="About Snake Game"
          >
            <button
              type="button"
              onClick={() => setAboutOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 text-[22px] leading-none text-white hover:opacity-70"
            >
              ✕
            </button>
            <h2 className="font-[var(--font-nunito)] text-[22px] font-bold">Snake Game</h2>
            <div className="mt-4 max-h-[65vh] space-y-4 overflow-y-auto pr-2 font-[var(--font-nunito)] text-[14px] leading-[1.8] [scrollbar-width:thin]">
              <p>
                The classic Snake Game is back with many exciting new improvements and is completely free-to-play online! With a simple
                interface and gameplay, this retro game is the perfect choice for time-killing. All you need to do is control the snake in
                the right way to eat all the yummy fruits and get longer and longer before eating its tail or hitting the wall.
              </p>
              <p>
                Born in 1997, the snake game today has countless different versions. This cool game brings a fun and easily addictive
                experience. There is nothing better than beating the records of your friends and other players.
              </p>
              <h3 className="pt-2 text-[16px] font-bold">Features</h3>
              <ul className="list-disc pl-5">
                <li>Fun and relaxing game to play with friends or family.</li>
                <li>Enjoy the feeling of a 1990s childhood.</li>
                <li>Simple gameplay for everyone</li>
                <li>Lots of fruits to choose</li>
                <li>16 different game modes</li>
                <li>Many unlockable skins and themes</li>
              </ul>
              <h3 className="pt-2 text-[16px] font-bold">How to play</h3>
              <p>
                Use the arrow keys to control your snake in the right direction and successfully eat the fruits along the way. Keep the
                snake from hitting the walls or eating its own tail. When you lose, the screen will display your achievement and your score.
              </p>
              <p>
                Click the Settings icon to change fruits, game mode (no wall, two-headed, moving targets…), number of targets, board width,
                and snake color. Press Play to start with the new settings.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["ACTION", "HYPERCASUAL", "CASUAL", "snake", "classic", "snake game", "1 player", "2d", "retro", "google games"].map(
                  (t) => (
                    <span key={t} className="rounded-full bg-white/15 px-3 py-1 text-[12px] font-bold uppercase tracking-wide">
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
