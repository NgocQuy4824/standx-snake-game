"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Pt = { x: number; y: number };
type Dir = { x: number; y: number };
type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number; color: string;
};

const COLS = 26;
const ROWS = 18;
const TICK_MS_INITIAL = 200;
const TICK_MS_MIN = 60;
const MS_PER_SEGMENT = 4;
const INITIAL_LENGTH = 3;
const SHAKE_DURATION = 400;
const FLASH_DURATION = 350;
const PARTICLE_COUNT = 28;
const PARTICLE_LIFE = 700;

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

function spawnParticles(cx: number, cy: number): Particle[] {
  const colors = ["#ff5252", "#ff8a65", "#ffd54f", "#fff176", "#e53935", "#ff7043"];
  const particles: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.5;
    const speed = 1.5 + Math.random() * 3.5;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: PARTICLE_LIFE,
      maxLife: PARTICLE_LIFE,
      size: 2 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
  return particles;
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [flashing, setFlashing] = useState(false);

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
  const bannerRef = useRef<HTMLImageElement | null>(null);
  const deathPosRef = useRef<Pt | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const deathAnimRef = useRef<number | null>(null);

  // load StandX banner
  useEffect(() => {
    const img = new Image();
    img.src = "/snake/ui/standx-banner.png";
    img.onload = () => { bannerRef.current = img; };
  }, []);

  // hydrate best
  useEffect(() => {
    const v = Number(localStorage.getItem("snake-best") || "0");
    if (!Number.isNaN(v) && v !== 0) {
      bestRef.current = v;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBest(v);
    }
  }, []);

  // cleanup death animation on unmount
  useEffect(() => {
    return () => {
      if (deathAnimRef.current) cancelAnimationFrame(deathAnimRef.current);
    };
  }, []);

  const triggerDeathEffects = (deathCell: Pt) => {
    deathPosRef.current = deathCell;
    setIsNewRecord(scoreRef.current > 0 && scoreRef.current >= bestRef.current);

    // screen shake
    setShaking(true);
    setTimeout(() => setShaking(false), SHAKE_DURATION);

    // red flash
    setFlashing(true);
    setTimeout(() => setFlashing(false), FLASH_DURATION);

    // spawn particles at death position (canvas coords computed in draw)
    const c = canvasRef.current;
    if (c) {
      const dpr = window.devicePixelRatio || 1;
      const W = c.width / dpr;
      const H = c.height / dpr;
      const cellW = W / COLS;
      const cellH = H / ROWS;
      const cx = deathCell.x * cellW + cellW / 2;
      const cy = deathCell.y * cellH + cellH / 2;
      particlesRef.current = spawnParticles(cx, cy);

      // animate particles
      let lastTime = performance.now();
      const animateParticles = (now: number) => {
        const dt = now - lastTime;
        lastTime = now;
        particlesRef.current = particlesRef.current.filter((p) => {
          p.life -= dt;
          if (p.life <= 0) return false;
          p.x += p.vx * (dt / 16);
          p.y += p.vy * (dt / 16);
          p.vy += 0.05 * (dt / 16); // gravity
          return true;
        });
        // redraw canvas with particles
        drawFrame();
        if (particlesRef.current.length > 0) {
          deathAnimRef.current = requestAnimationFrame(animateParticles);
        }
      };
      deathAnimRef.current = requestAnimationFrame(animateParticles);
    }
  };

  const resetGame = useCallback(() => {
    if (deathAnimRef.current) cancelAnimationFrame(deathAnimRef.current);
    particlesRef.current = [];
    deathPosRef.current = null;
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
    setIsNewRecord(false);
    setShaking(false);
    setFlashing(false);
    runningRef.current = true;
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

  // drawLogo — StandX "6" icon
  const drawLogo = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
    const size = Math.min(w, h);
    const ox = x + (w - size) / 2;
    const oy = y + (h - size) / 2;
    const s = size / 100;

    // neon-green border
    const bw = Math.max(2, size * 0.06);
    ctx.fillStyle = "#56AD1E";
    ctx.fillRect(ox - bw, oy - bw, size + bw * 2, size + bw * 2);

    // black bg
    ctx.fillStyle = "#000";
    ctx.fillRect(ox, oy, size, size);

    // white bar
    ctx.fillStyle = "#fff";
    ctx.fillRect(ox + 14 * s, oy + 12 * s, 72 * s, 18 * s);

    // white bowl
    ctx.beginPath();
    ctx.arc(ox + 47 * s, oy + 64 * s, 33 * s, 0, Math.PI * 2);
    ctx.fill();

    // black counter
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(ox + 47 * s, oy + 65 * s, 14 * s, 0, Math.PI * 2);
    ctx.fill();
  };

  // main draw — extracted so particle animation can call it
  const drawFrame = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const W = c.width / dpr;
    const H = c.height / dpr;
    const cellW = W / COLS;
    const cellH = H / ROWS;

    // banner background
    {
      const img = bannerRef.current;
      if (img && img.complete && img.naturalWidth !== 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, W, H);
        ctx.clip();
        const cropRatio = 0.23;
        const srcX = img.naturalWidth * cropRatio;
        const srcW = img.naturalWidth * (1 - cropRatio);
        const srcH = img.naturalHeight;
        const drawH = (srcH * W) / srcW;
        const offset = drawH > 0 ? ((H % drawH) / 2) : 0;
        for (let y = offset - drawH; y < H; y += drawH) {
          ctx.drawImage(img, srcX, 0, srcW, srcH, 0, y, W, drawH);
        }
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
      } else {
        ctx.fillStyle = "#0d120b";
        ctx.fillRect(0, 0, W, H);
      }
    }

    // grid
    ctx.strokeStyle = "rgba(255,255,255,0.07)";
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

    // food
    drawLogo(ctx, foodRef.current.x * cellW, foodRef.current.y * cellH, cellW, cellH);

    // snake — red tones when dead
    const isDead = !runningRef.current;
    snakeRef.current.forEach((p, i) => {
      const x = p.x * cellW;
      const y = p.y * cellH;
      const pad = 2.5;
      const rr = 7;
      const isHead = i === 0;

      if (isDead) {
        ctx.fillStyle = isHead ? "#b71c1c" : i % 2 === 0 ? "#d32f2f" : "#c62828";
      } else {
        ctx.fillStyle = isHead ? "#2e7d32" : i % 2 === 0 ? "#43a047" : "#388e3c";
      }

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
        // X eyes when dead
        if (isDead) {
          const cx = x + cellW / 2;
          const cy = y + cellH / 2;
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 2;
          // left X
          ctx.beginPath();
          ctx.moveTo(cx - 8, cy - 6);
          ctx.lineTo(cx - 3, cy - 1);
          ctx.moveTo(cx - 3, cy - 6);
          ctx.lineTo(cx - 8, cy - 1);
          ctx.stroke();
          // right X
          ctx.beginPath();
          ctx.moveTo(cx + 3, cy - 6);
          ctx.lineTo(cx + 8, cy - 1);
          ctx.moveTo(cx + 8, cy - 6);
          ctx.lineTo(cx + 3, cy - 1);
          ctx.stroke();
        } else {
          // normal eyes
          const eyeR = 3.2;
          const dir = dirRef.current;
          let ex1 = x + cellW / 2 - 6, ey1 = y + cellH / 2 - 4;
          let ex2 = x + cellW / 2 + 6, ey2 = y + cellH / 2 - 4;
          if (dir.y === -1) { ex1 = x + cellW / 2 - 5; ey1 = y + cellH / 2 - 5; ex2 = x + cellW / 2 + 5; ey2 = y + cellH / 2 - 5; }
          else if (dir.y === 1) { ex1 = x + cellW / 2 - 5; ey1 = y + cellH / 2 + 5; ex2 = x + cellW / 2 + 5; ey2 = y + cellH / 2 + 5; }
          else if (dir.x === -1) { ex1 = x + cellW / 2 - 6; ey1 = y + cellH / 2 - 5; ex2 = x + cellW / 2 - 6; ey2 = y + cellH / 2 + 5; }
          else { ex1 = x + cellW / 2 + 6; ey1 = y + cellH / 2 - 5; ex2 = x + cellW / 2 + 6; ey2 = y + cellH / 2 + 5; }
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
          // tongue
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
      }
    });

    // particles
    particlesRef.current.forEach((p) => {
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  };

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
        drawFrame();
        triggerDeathEffects(head);
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
        drawFrame();
        triggerDeathEffects(nh);
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
        const growth = next.length - INITIAL_LENGTH;
        tickMsRef.current = Math.max(TICK_MS_MIN, TICK_MS_INITIAL - growth * MS_PER_SEGMENT);
        if (scoreRef.current > bestRef.current) {
          bestRef.current = scoreRef.current;
          setBest(scoreRef.current);
          localStorage.setItem("snake-best", String(scoreRef.current));
        }
      }
      snakeRef.current = next;
      drawFrame();
      id = setTimeout(tick, tickMsRef.current);
    };

    // size canvas
    const syncSize = () => {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = window.devicePixelRatio || 1;
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
      }
      const ctx = c.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame();
    };

    const raf = requestAnimationFrame(syncSize);
    const ro = new ResizeObserver(syncSize);
    if (canvasRef.current) ro.observe(canvasRef.current);

    id = setTimeout(tick, tickMsRef.current);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, gameOver]);

  // swipe
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
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* Header */}
      <div className="relative flex h-[96px] shrink-0 items-center justify-between bg-[#3d6b1e] px-6 select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="grid h-[34px] w-[34px] place-items-center overflow-hidden rounded-sm bg-white/10">
              {/* eslint-disable @next/next/no-img-element */}
              <img src="/snake/ui/standx-logo.svg" alt="" aria-hidden className="h-[26px] w-[26px] object-contain" />
            </span>
            <span className="min-w-[36px] font-[var(--font-nunito)] text-[20px] font-bold text-white tabular-nums">{score}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="grid h-[34px] w-[34px] place-items-center overflow-hidden rounded-sm bg-white/10">
              <img src="/snake/ui/trophy.png" alt="" aria-hidden className="h-[34px] w-auto object-contain" />
            </span>
            <span className="min-w-[36px] font-[var(--font-nunito)] text-[20px] font-bold text-white tabular-nums">{best}</span>
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-4">
          <img src="/snake/ui/standx-logo.svg" alt="StandX" className="h-[56px] w-[56px] object-contain" />
          <span className="font-[var(--font-nunito)] text-[36px] font-extrabold text-white tracking-[0.3em]">StandX</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Social links */}
          <div className="mr-3 flex items-center gap-1.5">
            <a
              href="https://x.com/StandX_Official"
              target="_blank"
              rel="noreferrer"
              aria-label="StandX on X"
              className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://discord.gg/standx"
              target="_blank"
              rel="noreferrer"
              aria-label="StandX Discord"
              className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href="https://t.me/standx_community"
              target="_blank"
              rel="noreferrer"
              aria-label="StandX Telegram"
              className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </div>

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

      {/* Canvas field */}
      <div
        className={`relative min-h-0 flex-1 ${shaking ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ touchAction: "none" }}
          aria-label="Snake game board"
        />

        {/* Red flash overlay */}
        {flashing && (
          <div className="pointer-events-none absolute inset-0 z-20 animate-[flash_0.35s_ease-out_forwards] bg-red-600" />
        )}

        {/* D-pad */}
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
            <div className="rounded-xl bg-[#3d6b1e] px-8 py-6 text-center shadow-xl">
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

        {/* Game over — animated panel */}
        {gameOver && (
          <div className="absolute inset-0 z-30 grid place-items-center bg-black/70 p-4 animate-[fadeIn_0.3s_ease-out]">
            <div className="w-full max-w-[320px] rounded-[12px] bg-[#3d6b1e] p-0 text-center shadow-2xl animate-[popIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
              {/* New record badge */}
              {isNewRecord && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-4 py-1 font-[var(--font-nunito)] text-[11px] font-extrabold uppercase tracking-wider text-black shadow-lg animate-[bounce_0.6s_ease-in-out_infinite]">
                  New Record!
                </div>
              )}
              <div className="rounded-t-[12px] bg-[#2e5216] px-6 py-5">
                <p className="font-[var(--font-nunito)] text-[13px] font-bold uppercase tracking-[0.12em] text-white/70">Game Over — StandX</p>
                <p className="mt-1 font-[var(--font-nunito)] text-[32px] font-extrabold leading-none text-white">{score} StandX</p>
                <p className="mt-1 font-[var(--font-nunito)] text-[12px] text-white/70">
                  Best <span className="font-bold text-white">{best} StandX</span>
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
        {!gameOver && !paused && score === 0 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-[52px] flex justify-center lg:bottom-3">
            <span className="rounded-full bg-black/55 px-3 py-1 font-[var(--font-nunito)] text-[12px] font-bold text-white backdrop-blur">
              Use arrows · WASD · swipe
            </span>
          </div>
        )}
      </div>

      {/* Sub-bar */}
      <div className="flex items-center justify-between bg-[#2e5216] px-3 py-2 font-[var(--font-nunito)] text-[11px] text-white/70">
        <span>Classic snake — eat the apples, don&apos;t hit the wall or yourself.</span>
        <span className="hidden sm:inline">by Kyo</span>
      </div>
    </div>
  );
}
