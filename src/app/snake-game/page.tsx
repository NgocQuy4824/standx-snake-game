import type { Metadata } from "next";
import { Suspense } from "react";
import { SnakeShell } from "./_Shell";

export const metadata: Metadata = {
  title: "Snake Game",
  description:
    "The classic Snake Game is back with many exciting new improvements and is completely free-to-play online. Let's see, how patient are you?",
};

export default function SnakeGameRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#161616]" />}>
      <SnakeShell />
    </Suspense>
  );
}
