"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Tokenomics", href: "#tokenomics" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useGSAP(() => {
    const showAnim = gsap
      .from(navRef.current, {
        yPercent: -100,
        paused: true,
        duration: 0.3,
        ease: "power2.out",
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play();
        } else {
          showAnim.reverse();
        }
      },
    });
  });

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-nam-border"
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <Image
              src="/assets/icon.svg"
              alt="NAM Rewards"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-lg font-bold tracking-tight">NAM</span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm text-foreground/70 hover:text-nam-green transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={(e) => handleLinkClick(e, "#waitlist")}
              className="text-sm font-semibold bg-nam-green text-black px-5 py-2.5 rounded-full hover:brightness-110 transition-all duration-200"
            >
              Join Waitlist
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-2xl font-medium text-foreground/80 hover:text-nam-green transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={(e) => handleLinkClick(e, "#waitlist")}
            className="text-lg font-semibold bg-nam-green text-black px-8 py-3 rounded-full hover:brightness-110 transition-all"
          >
            Join Waitlist
          </a>
        </div>
      )}
    </>
  );
}
