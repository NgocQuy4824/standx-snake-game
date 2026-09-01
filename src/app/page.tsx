import type { Metadata } from "next";
import { Suspense } from "react";
import { SnakeShell } from "./_Shell";

export const metadata: Metadata = {
  title: "Snake Game — Play Classic Snake Online Free",
  description:
    "Play the classic Snake game online for free. Eat apples, grow longer, and beat your high score. No download, no sign-up — just press play.",
  keywords: [
    "snake game",
    "play snake",
    "classic snake",
    "free online game",
    "snake io",
    "retro game",
    "browser game",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Snake Game — Play Classic Snake Online Free",
    description:
      "The classic Snake game, free to play in your browser. Eat apples, grow longer, beat your high score.",
    url: "/",
    siteName: "Snake Game",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snake Game — Play Classic Snake Online Free",
    description: "The classic Snake game, free to play in your browser.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// JSON-LD structured data so search engines understand the page is a game
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "Snake Game",
  description:
    "The classic Snake game. Control the snake, eat apples, grow longer, and avoid hitting the walls or yourself.",
  url: "/",
  genre: ["Arcade Game", "Casual Game"],
  gamePlatform: "Web Browser",
  applicationCategory: "Game",
  operatingSystem: "Any",
  playMode: "SinglePlayer",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="min-h-[100dvh] bg-[#161616]" />}>
        <SnakeShell />
      </Suspense>
    </>
  );
}
