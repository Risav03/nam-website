"use client";

import Image from "next/image";
import { Globe, MessageCircle, Send } from "lucide-react";

const footerLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Mining", href: "#mining" },
  { label: "Features", href: "#features" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "FAQ", href: "#faq" },
  { label: "Download", href: "#download" },
];

const socials = [
  { icon: Globe, label: "X / Twitter", href: "#" },
  { icon: MessageCircle, label: "Discord", href: "#" },
  { icon: Send, label: "Telegram", href: "#" },
];

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="border-t border-nam-border py-12 md:py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-3">
            <a href="#" className="flex items-center gap-3">
              <Image
                src="/assets/icon.svg"
                alt="NAM Rewards"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <span className="text-base font-bold tracking-tight">
                NAM Rewards
              </span>
            </a>
            <p className="text-xs text-foreground/40 max-w-xs">
              Turning everyday purchases into crypto rewards. The universal
              rewards layer for real-world spending.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-sm text-foreground/50 hover:text-nam-green transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-2xl glass flex items-center justify-center hover:bg-white/[0.08] transition-all duration-200 group"
              >
                <social.icon className="w-4 h-4 text-foreground/50 group-hover:text-nam-green transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-nam-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/30">
            &copy; {new Date().getFullYear()} NAM Rewards. All rights reserved.
          </p>
          <p className="text-xs text-foreground/20">
            NAM Coins are Non-Automated Mined tokens.
          </p>
        </div>
      </div>
    </footer>
  );
}
