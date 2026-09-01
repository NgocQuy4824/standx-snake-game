import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// Only load the weights actually used (regular + bold + extrabold) to keep the font payload small
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

// Set this to your production domain before deploying
const SITE_URL = "https://snake-game.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Snake Game — Play Classic Snake Online Free",
    template: "%s | Snake Game",
  },
  description:
    "Play the classic Snake game online for free. Eat apples, grow longer, and beat your high score. No download, no sign-up.",
  applicationName: "Snake Game",
  appleWebApp: {
    capable: true,
    title: "Snake Game",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#161616",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
