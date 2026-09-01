# Snake Game

Classic Snake game — free to play in the browser. Own Canvas engine, no third-party embed.

## Stack

- Next.js 16 (App Router, React 19, TypeScript)
- Tailwind CSS v4
- Canvas snake engine (own implementation)

## Run

```bash
npm install
npm run dev    # → http://localhost:3000
npm run build
```

## Controls

- Arrows / WASD — move
- P / Space — pause · R — restart · Enter — replay after game over
- Touch: swipe or on-screen D-pad

## Structure

```
src/
  app/
    page.tsx        # root page — metadata + JSON-LD + game
    _Shell.tsx      # full-screen layout wrapper
    layout.tsx      # root layout — fonts, viewport, SEO metadata
    robots.ts       # /robots.txt
    sitemap.ts      # /sitemap.xml
    globals.css     # Tailwind entry
  components/
    snake/
      SnakeGame.tsx # game engine + UI (canvas, HUD, overlays)
public/
  snake/ui/         # sprite icons (apple, trophy, refresh, shuffle)
```

## Deploy

Set `SITE_URL` in `src/app/layout.tsx`, `src/app/robots.ts`, and `src/app/sitemap.ts` to your production domain before deploying.

## License

MIT
