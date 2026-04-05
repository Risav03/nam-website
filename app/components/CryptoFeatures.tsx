"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Apple,
  CreditCard,
  Send,
  ArrowLeftRight,
  Wallet,
  ShieldCheck,
  PieChart,
  TrendingUp,
  RotateCcw,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Wallet,
    title: "Built-In Crypto Wallet",
    description:
      "A full crypto wallet built right into the app. Your NAM Coins go straight here — no external apps or browser extensions needed.",
  },
  {
    icon: Apple,
    title: "Fiat Onramp",
    description:
      "Buy crypto instantly with Apple Pay or bank transfer. Go from dollars to tokens in seconds, right inside NAM Rewards.",
  },
  {
    icon: ArrowLeftRight,
    title: "Buy & Sell Tokens",
    description:
      "Trade NAM Coins and other tokens directly within the app. Simple interface designed for everyone, not just crypto experts.",
  },
  {
    icon: Send,
    title: "Send to Any Wallet",
    description:
      "Send NAM Coins or other tokens to any Base wallet address. Full self-custody — you own and control your tokens.",
  },
  {
    icon: PieChart,
    title: "Expense Dashboard",
    description:
      "Receipts transform into a full personal finance dashboard. Categorized spending, monthly summaries, merchant breakdowns, and budget tracking.",
  },
  {
    icon: TrendingUp,
    title: "Smart Financial Insights",
    description:
      "Get financial recommendations and spending pattern analysis. The app is valuable even on days you don't upload receipts.",
  },
  {
    icon: RotateCcw,
    title: "Habit-Forming Loop",
    description:
      "Upload receipts → earn crypto → unlock insights → insights motivate more uploads. A retention loop that builds long-term engagement.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Risk Onboarding",
    description:
      "No money, no trading knowledge needed. Your everyday purchases introduce you to crypto and build your NAM Coin balance risk-free.",
  },
  {
    icon: CreditCard,
    title: "Multiple Tokens",
    description:
      "Manage NAM Coin, USDC, ETH, and more — all from a single wallet. Your one-stop crypto hub.",
  },
];

export default function CryptoFeatures() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(".cf-title",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: { trigger: ".cf-title", start: "top 85%" },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      gsap.fromTo(".cf-card",
        { y: 60, opacity: 0 },
        {
          scrollTrigger: { trigger: ".cf-grid", start: "top 80%" },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="cf-title text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            More Than{" "}
            <span className="text-gradient-green">Mining</span>
          </h2>
          <p className="mt-4 text-foreground/50 text-base md:text-lg max-w-2xl mx-auto">
            NAM Rewards combines crypto rewards with a full personal finance
            dashboard. Buy, sell, send, and manage tokens — plus get spending
            insights from every receipt.
          </p>
        </div>

        <div className="cf-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="cf-card glass rounded-2xl p-6 md:p-8 hover:bg-white/[0.06] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-nam-green/10 flex items-center justify-center mb-5 group-hover:bg-nam-green/20 transition-colors">
                <feature.icon className="w-6 h-6 text-nam-green" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-foreground/50 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
