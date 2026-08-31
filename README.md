# Snake Game Website

Clone of [snake-game.io](https://snake-game.io) — classic snake game playable in the browser.

## Routes

- `/` — redirects to `/snake-game`
- `/snake-game` — snake game + sidebar + info popup
- `/en`, `/en/company`, `/en/recruit`, `/en/news` — carried over from template example (remove if not needed)

## Stack

- Next.js 16 (App Router, React 19, TypeScript)
- Tailwind CSS v4
- Canvas snake engine (own implementation — no third-party game iframe)

## Run

```bash
npm install
npm run dev    # → http://localhost:3000/snake-game
npm run build
```

## Notes

- Original site uses a Google Snake embed; this clone ships its own engine.
- `/public/snake/**` are redistributable UI sprites/thumbs used under fair-use clone demo.

## License

MIT
