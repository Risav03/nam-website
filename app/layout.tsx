import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NAM Rewards — Mine Crypto From Your Receipts",
  description:
    "Upload receipts, earn NAM Coins on-chain, and get a powerful expense dashboard. Risk-free crypto rewards for everyday purchases.",
  keywords: [
    "NAM Rewards",
    "crypto rewards",
    "receipt mining",
    "expense tracker",
    "NAM Coin",
    "decentralized finance",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
