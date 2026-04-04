"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Store,
  CreditCard,
  Handshake,
  BarChart3,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const distribution = [
  { label: "Users", percent: 60, color: "#01D243" },
  { label: "Treasury", percent: 25, color: "#01D24380" },
  { label: "Businesses", percent: 15, color: "#01D24340" },
];

const roadmap = [
  { icon: Store, title: "POS Software", description: "Point-of-sale integrations for local businesses" },
  { icon: CreditCard, title: "Crypto Payments", description: "Pay with NAM Coins at participating merchants" },
  { icon: Handshake, title: "Brand Partnerships", description: "Affiliate rewards and brand deals" },
  { icon: BarChart3, title: "Prediction Markets", description: "Predict daily receipt uploads, product prices, and spending trends — powered by real receipt data" },
];

export default function Tokenomics() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".token-title",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: { trigger: ".token-title", start: "top 85%" },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Animate distribution bars
      gsap.from(".dist-bar-fill", {
        scrollTrigger: { trigger: ".dist-bars", start: "top 80%" },
        width: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Count up percentages
      distribution.forEach((item, i) => {
        const el = document.querySelector(`.dist-percent-${i}`);
        if (el) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: item.percent,
            duration: 1.2,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: ".dist-bars", start: "top 80%" },
            onUpdate: () => {
              el.textContent = `${Math.round(obj.val)}%`;
            },
          });
        }
      });

      gsap.fromTo(
        ".roadmap-card",
        { y: 50, opacity: 0 },
        {
          scrollTrigger: { trigger: ".roadmap-grid", start: "top 80%" },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="tokenomics"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
    >
      <div className="mx-auto max-w-7xl">
        {/* Title */}
        <div className="token-title text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            NAM Coin{" "}
            <span className="text-gradient-green">Tokenomics</span>
          </h2>
          <p className="mt-4 text-foreground/50 text-base md:text-lg max-w-2xl mx-auto">
            An inflation model similar to Dogecoin — fixed initial supply with
            yearly issuance. Transparent, on-chain, and community-driven.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Distribution */}
          <div>
            <h3 className="text-xl font-semibold mb-8">Token Distribution</h3>
            <div className="dist-bars space-y-6">
              {distribution.map((item, i) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground/70">
                      {item.label}
                    </span>
                    <span
                      className={`dist-percent-${i} text-sm font-mono font-semibold text-nam-green`}
                    >
                      0%
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="dist-bar-fill h-full rounded-full"
                      style={{
                        width: `${item.percent}%`,
                        background: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 glass rounded-xl p-5">
              <p className="text-sm text-foreground/50 leading-relaxed">
                <span className="text-nam-green font-semibold">NAM</span> =
                Non-Automated Mined tokens. Each receipt uploaded verifies
                real-world spending and generates coins through on-chain mining.
                No bots. No automation. Just real people earning real crypto.
              </p>
            </div>
          </div>

          {/* Roadmap */}
          <div>
            <h3 className="text-xl font-semibold mb-8">What&apos;s Coming</h3>
            <div className="roadmap-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roadmap.map((item) => (
                <div
                  key={item.title}
                  className="roadmap-card glass rounded-xl p-5 hover:bg-white/[0.06] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-nam-green/10 flex items-center justify-center mb-3 group-hover:bg-nam-green/20 transition-colors">
                    <item.icon className="w-5 h-5 text-nam-green" />
                  </div>
                  <h4 className="text-sm font-semibold mb-1">{item.title}</h4>
                  <p className="text-xs text-foreground/40 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
