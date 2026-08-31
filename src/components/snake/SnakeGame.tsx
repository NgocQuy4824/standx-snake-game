"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Pt = { x: number; y: number };
type Dir = { x: number; y: number };

const COLS = 26;
const ROWS = 18;
const TICK_MS_INITIAL = 140;
const TICK_MS_MIN = 65;
const SPEED_STEP_EVERY = 4;

const DIR_UP: Dir = { x: 0, y: -1 };
const DIR_DOWN: Dir = { x: 0, y: 1 };
const DIR_LEFT: Dir = { x: -1, y: 0 };
const DIR_RIGHT: Dir = { x: 1, y: 0 };

function opposite(a: Dir, b: Dir) {
  return a.x === -b.x && a.y === -b.y;
}

function randomFood(snake: Pt[]): Pt {
  const taken = new Set(snake.map((p) => `${p.x},${p.y}`));
  let p: Pt;
  do {
    p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (taken.has(`${p.x},${p.y}`));
  return p;
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [muted] = useState(false);

  // refs so tick closure reads fresh state without tearing down interval
  const snakeRef = useRef<Pt[]>([
    { x: 6, y: 9 },
    { x: 5, y: 9 },
    { x: 4, y: 9 },
  ]);
  const dirRef = useRef<Dir>(DIR_RIGHT);
  const nextDirRef = useRef<Dir>(DIR_RIGHT);
  const foodRef = useRef<Pt>({ x: 14, y: 9 });
  const scoreRef = useRef(0);
  const runningRef = useRef(true);
  const tickMsRef = useRef(TICK_MS_INITIAL);

  const bestRef = useRef(0);

  const resetGame = useCallback(() => {
    const init: Pt[] = [
      { x: 6, y: 9 },
      { x: 5, y: 9 },
      { x: 4, y: 9 },
    ];
    snakeRef.current = init;
    dirRef.current = DIR_RIGHT;
    nextDirRef.current = DIR_RIGHT;
    foodRef.current = randomFood(init);
    scoreRef.current = 0;
    tickMsRef.current = TICK_MS_INITIAL;
    setScore(0);
    setGameOver(false);
    setPaused(false);
    runningRef.current = true;
  }, []);

  // load best from storage
  useEffect(() => {
    const v = Number(localStorage.getItem("snake-best") || "0");
    if (!Number.isNaN(v)) {
      setBest(v);
      bestRef.current = v;
    }
  }, []);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
      if (e.key === "p" || e.key === "P" || e.key === " ") {
        if (!gameOver) setPaused((p) => !p);
        return;
      }
      if (e.key === "r" || e.key === "R") {
        resetGame();
        return;
      }
      if (gameOver && e.key === "Enter") {
        resetGame();
        return;
      }
      let nd: Dir | null = null;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") nd = DIR_UP;
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") nd = DIR_DOWN;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") nd = DIR_LEFT;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") nd = DIR_RIGHT;
      if (nd && !opposite(nd, dirRef.current)) nextDirRef.current = nd;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gameOver, resetGame]);

  // game loop
  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (paused || gameOver || !runningRef.current) {
        id = setTimeout(tick, tickMsRef.current);
        return;
      }
      dirRef.current = nextDirRef.current;
      const head = snakeRef.current[0];
      const nh: Pt = { x: head.x + dirRef.current.x, y: head.y + dirRef.current.y };

      // wall collision
      if (nh.x < 0 || nh.x >= COLS || nh.y < 0 || nh.y >= ROWS) {
        setGameOver(true);
        runningRef.current = false;
        const cur = scoreRef.current;
        if (cur > bestRef.current) {
          bestRef.current = cur;
          setBest(cur);
          localStorage.setItem("snake-best", String(cur));
        }
        draw();
        id = setTimeout(tick, tickMsRef.current);
        return;
      }
      // self collision
      if (snakeRef.current.some((p) => p.x === nh.x && p.y === nh.y)) {
        setGameOver(true);
        runningRef.current = false;
        const cur = scoreRef.current;
        if (cur > bestRef.current) {
          bestRef.current = cur;
          setBest(cur);
          localStorage.setItem("snake-best", String(cur));
        }
        draw();
        id = setTimeout(tick, tickMsRef.current);
        return;
      }

      const ate = nh.x === foodRef.current.x && nh.y === foodRef.current.y;
      const next = [nh, ...snakeRef.current];
      if (!ate) next.pop();
      else {
        foodRef.current = randomFood(next);
        scoreRef.current += 1;
        setScore(scoreRef.current);
        const steps = Math.floor(scoreRef.current / SPEED_STEP_EVERY);
        tickMsRef.current = Math.max(TICK_MS_MIN, TICK_MS_INITIAL - steps * 10);
        if (scoreRef.current > bestRef.current) {
          bestRef.current = scoreRef.current;
          setBest(scoreRef.current);
          localStorage.setItem("snake-best", String(scoreRef.current));
        }
        if (!muted) {
          // tiny click — no audio file needed
        }
      }
      snakeRef.current = next;
      draw();
      id = setTimeout(tick, tickMsRef.current);
    };

    const draw = () => {
      const c = canvasRef.current;
      if (!c) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const W = c.width;
      const H = c.height;
      const cellW = W / COLS;
      const cellH = H / ROWS;

      // field — two-tone checker like Google snake
      ctx.clearRect(0, 0, W, H);
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const even = (x + y) % 2 === 0;
          ctx.fillStyle = even ? "#7ec850" : "#8ed05a";
          ctx.fillRect(x * cellW, y * cellH, cellW, cellH);
        }
      }
      // subtle inner stroke
      ctx.strokeStyle = "rgba(0,0,0,0.08)";
      ctx.lineWidth = 1;
      for (let x = 1; x < COLS; x++) {
        ctx.beginPath();
        ctx.moveTo(x * cellW, 0);
        ctx.lineTo(x * cellW, H);
        ctx.stroke();
      }
      for (let y = 1; y < ROWS; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * cellH);
        ctx.lineTo(W, y * cellH);
        ctx.stroke();
      }

      // food — apple sprite slice (use canvas clip from sprite if available)
      const fx = foodRef.current.x * cellW;
      const fy = foodRef.current.y * cellH;
      // apple glow
      ctx.fillStyle = "rgba(200,30,30,0.15)";
      ctx.beginPath();
      ctx.ellipse(fx + cellW / 2, fy + cellH / 2 + 3, cellW * 0.42, cellH * 0.32, 0, 0, Math.PI * 2);
      ctx.fill();
      // apple body
      const r = Math.min(cellW, cellH) * 0.38;
      ctx.fillStyle = "#e53935";
      ctx.beginPath();
      ctx.ellipse(fx + cellW / 2, fy + cellH / 2 + 1, r, r * 0.92, 0, 0, Math.PI * 2);
      ctx.fill();
      // highlight
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.beginPath();
      ctx.ellipse(fx + cellW / 2 - r * 0.35, fy + cellH / 2 - r * 0.2, r * 0.3, r * 0.22, -0.6, 0, Math.PI * 2);
      ctx.fill();
      // stem
      ctx.fillStyle = "#5d4037";
      ctx.fillRect(fx + cellW / 2 - 2, fy + cellH / 2 - r * 0.9, 4, 7);
      // leaf
      ctx.fillStyle = "#66bb3a";
      ctx.beginPath();
      ctx.ellipse(fx + cellW / 2 + 7, fy + cellH / 2 - r * 0.65, 8, 5, -0.5, 0, Math.PI * 2);
      ctx.fill();

      // snake
      snakeRef.current.forEach((p, i) => {
        const x = p.x * cellW;
        const y = p.y * cellH;
        const pad = 2.5;
        const rr = 7;
        const isHead = i === 0;
        ctx.fillStyle = isHead ? "#2e7d32" : i % 2 === 0 ? "#43a047" : "#388e3c";
        // rounded rect per segment
        const rx = x + pad;
        const ry = y + pad;
        const rw = cellW - pad * 2;
        const rh = cellH - pad * 2;
        ctx.beginPath();
        if (typeof ctx.roundRect === "function") ctx.roundRect(rx, ry, rw, rh, rr);
        else {
          ctx.moveTo(rx + rr, ry);
          ctx.arcTo(rx + rw, ry, rx + rw, ry + rh, rr);
          ctx.arcTo(rx + rw, ry + rh, rx, ry + rh, rr);
          ctx.arcTo(rx, ry + rh, rx, ry, rr);
          ctx.arcTo(rx, ry, rx + rw, ry, rr);
          ctx.closePath();
        }
        ctx.fill();
        if (isHead) {
          // eyes
          const eyeR = 3.2;
          const dir = dirRef.current;
          let ex1 = x + cellW / 2 - 6,
            ey1 = y + cellH / 2 - 4;
          let ex2 = x + cellW / 2 + 6,
            ey2 = y + cellH / 2 - 4;
          if (dir.y === -1) {
            ex1 = x + cellW / 2 - 5;
            ey1 = y + cellH / 2 - 5;
            ex2 = x + cellW / 2 + 5;
            ey2 = y + cellH / 2 - 5;
          } else if (dir.y === 1) {
            ex1 = x + cellW / 2 - 5;
            ey1 = y + cellH / 2 + 5;
            ex2 = x + cellW / 2 + 5;
            ey2 = y + cellH / 2 + 5;
          } else if (dir.x === -1) {
            ex1 = x + cellW / 2 - 6;
            ey1 = y + cellH / 2 - 5;
            ex2 = x + cellW / 2 - 6;
            ey2 = y + cellH / 2 + 5;
          } else {
            ex1 = x + cellW / 2 + 6;
            ey1 = y + cellH / 2 - 5;
            ex2 = x + cellW / 2 + 6;
            ey2 = y + cellH / 2 + 5;
          }
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(ex1, ey1, eyeR, 0, Math.PI * 2);
          ctx.arc(ex2, ey2, eyeR, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#111";
          ctx.beginPath();
          ctx.arc(ex1 + 0.8, ey1 + 0.8, 1.6, 0, Math.PI * 2);
          ctx.arc(ex2 + 0.8, ey2 + 0.8, 1.6, 0, Math.PI * 2);
          ctx.fill();
          // tongue if moving horizontally
          if (dir.x !== 0) {
            ctx.strokeStyle = "#ff5252";
            ctx.lineWidth = 1.7;
            ctx.beginPath();
            const tx = dir.x === 1 ? x + cellW - 1 : x + 1;
            const ty = y + cellH / 2;
            ctx.moveTo(tx, ty);
            ctx.lineTo(tx + dir.x * 7, ty - 3);
            ctx.moveTo(tx, ty);
            ctx.lineTo(tx + dir.x * 7, ty + 3);
            ctx.stroke();
          }
        }
      });
    };

    // initial paint + size canvas to its CSS pixel size * dpr
    const syncSize = () => {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      c.width = Math.round(rect.width * dpr);
      c.height = Math.round(rect.height * dpr);
      const ctx = c.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    syncSize();
    window.addEventListener("resize", syncSize);
    id = setTimeout(tick, tickMsRef.current);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", syncSize);
    };
    // muted intentionally not a dep — tick reads via closure would reset interval
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, gameOver]);

  // swipe controls
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) return;
    let nd: Dir | null = null;
    if (Math.abs(dx) > Math.abs(dy)) nd = dx > 0 ? DIR_RIGHT : DIR_LEFT;
    else nd = dy > 0 ? DIR_DOWN : DIR_UP;
    if (nd && !opposite(nd, dirRef.current)) nextDirRef.current = nd;
    touchStart.current = null;
  };

  return (
    <div className="flex w-full max-w-[800px] flex-col overflow-hidden rounded-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      {/* Header bar — matches Google snake header: #644d1f, 70px, top rounded */}
      <div className="flex h-[70px] shrink-0 items-center justify-between rounded-t-[10px] bg-[#644d1f] px-5 select-none">
        <div className="flex items-center gap-4">
          {/* apple + score */}
          <div className="flex items-center gap-2">
            <span className="grid h-[38px] w-[38px] place-items-center overflow-hidden rounded-sm bg-white/10">
              {/* eslint-disable @next/next/no-img-element */}
              <img src="/snake/ui/apple.png" alt="" aria-hidden className="h-[38px] w-auto object-contain" style={{ objectPosition: "0 0" }} />
            </span>
            <span className="min-w-[44px] font-[var(--font-nunito)] text-[20px] font-bold text-white tabular-nums">{score}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="grid h-[38px] w-[38px] place-items-center overflow-hidden rounded-sm bg-white/10">
              <img src="/snake/ui/trophy.png" alt="" aria-hidden className="h-[38px] w-auto object-contain" />
            </span>
            <span className="min-w-[44px] font-[var(--font-nunito)] text-[20px] font-bold text-white tabular-nums">{best}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume" : "Pause"}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <span aria-hidden className="text-[14px] font-bold">
              {paused ? "▶" : "❚❚"}
            </span>
          </button>
          <button
            type="button"
            onClick={resetGame}
            aria-label="Restart"
            className="grid h-8 w-8 place-items-center rounded-full bg-white/15 hover:bg-white/25"
            title="Restart (R)"
          >
            <img src="/snake/ui/refresh.png" alt="" aria-hidden className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Canvas field — like #578a34 / green checker */}
      <div className="relative aspect-[26/18] w-full bg-[#578a34]" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full rounded-b-[10px]"
          style={{ touchAction: "none" }}
          aria-label="Snake game board"
        />

        {/* D-pad for touch */}
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1 lg:hidden">
          {[
            { k: "↑", d: DIR_UP, label: "Up" },
            { k: "↓", d: DIR_DOWN, label: "Down" },
            { k: "←", d: DIR_LEFT, label: "Left" },
            { k: "→", d: DIR_RIGHT, label: "Right" },
          ].map((b) => (
            <button
              key={b.k}
              type="button"
              aria-label={b.label}
              onTouchStart={(e) => {
                e.preventDefault();
                if (!opposite(b.d, dirRef.current)) nextDirRef.current = b.d;
              }}
              onMouseDown={() => {
                if (!opposite(b.d, dirRef.current)) nextDirRef.current = b.d;
              }}
              className="grid h-11 w-11 place-items-center rounded-lg bg-black/55 text-[18px] font-bold text-white backdrop-blur active:bg-black/75"
            >
              {b.k}
            </button>
          ))}
        </div>

        {/* Paused */}
        {paused && !gameOver && (
          <div className="absolute inset-0 grid place-items-center bg-black/55 backdrop-blur-[1px]">
            <div className="rounded-xl bg-[#644d1f] px-8 py-6 text-center shadow-xl">
              <p className="font-[var(--font-nunito)] text-lg font-bold text-white">Paused</p>
              <button
                type="button"
                onClick={() => setPaused(false)}
                className="mt-3 rounded-[10px] bg-[#56AD1E] px-6 py-2.5 font-[var(--font-nunito)] text-[15px] font-bold text-white hover:brightness-110"
              >
                Resume
              </button>
            </div>
          </div>
        )}

        {/* Game over */}
        {gameOver && (
          <div className="absolute inset-0 grid place-items-center bg-black/70 p-4">
            <div className="w-full max-w-[300px] rounded-[8px] bg-[#644d1f] p-0 text-center">
              <div className="rounded-t-[8px] bg-[#4a3a18] px-6 py-5">
                <p className="font-[var(--font-nunito)] text-[13px] font-bold uppercase tracking-[0.12em] text-white/70">Game Over</p>
                <p className="mt-1 font-[var(--font-nunito)] text-[28px] font-extrabold leading-none text-white">{score}</p>
                <p className="mt-1 font-[var(--font-nunito)] text-[12px] text-white/70">
                  Best <span className="font-bold text-white">{best}</span>
                </p>
              </div>
              <div className="flex gap-2 p-3">
                <button
                  type="button"
                  onClick={resetGame}
                  className="flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#56AD1E] py-3 font-[var(--font-nunito)] text-[16px] font-bold text-white hover:brightness-110"
                >
                  <img src="/snake/ui/refresh.png" alt="" aria-hidden className="h-5 w-5" />
                  Replay
                </button>
                <button
                  type="button"
                  onClick={resetGame}
                  aria-label="Shuffle and replay"
                  className="grid h-[48px] w-[48px] place-items-center rounded-[10px] bg-white/15 hover:bg-white/25"
                >
                  <img src="/snake/ui/shuffle.png" alt="" aria-hidden className="h-5 w-5" />
                </button>
              </div>
              <p className="pb-3 font-[var(--font-nunito)] text-[11px] text-white/60">Press Enter to replay · Arrows / WASD to move</p>
            </div>
          </div>
        )}

        {/* Idle hint */}
        {!gameOver && !paused && score === 0 && snakeRef.current.length === 3 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-[52px] flex justify-center lg:bottom-3">
            <span className="rounded-full bg-black/55 px-3 py-1 font-[var(--font-nunito)] text-[12px] font-bold text-white backdrop-blur">
              Use arrows · WASD · swipe
            </span>
          </div>
        )}
      </div>

      {/* Sub-bar hint */}
      <div className="flex items-center justify-between bg-[#2f2110] px-3 py-2 font-[var(--font-nunito)] text-[11px] text-white/70">
        <span>Classic snake — eat the apples, don&apos;t hit the wall or yourself.</span>
        <span className="hidden sm:inline">P to pause · R to restart</span>
      </div>
    </div>
  );
}
