"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle grid background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      alpha: number;
      pulse: number;
      speed: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const spacing = 80;
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particles.push({
            x: i * spacing,
            y: j * spacing,
            baseX: i * spacing,
            baseY: j * spacing,
            size: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.15 + 0.03,
            pulse: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.005 + 0.002,
          });
        }
      }
    };

    let mouseX = -1000;
    let mouseY = -1000;

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now();

      for (const p of particles) {
        p.pulse += p.speed;
        const pulseFactor = Math.sin(p.pulse) * 0.5 + 0.5;

        // Mouse proximity glow
        const dx = mouseX - p.baseX;
        const dy = mouseY - p.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        const influence = Math.max(0, 1 - dist / maxDist);

        const alpha = p.alpha + pulseFactor * 0.08 + influence * 0.4;
        const size = p.size + influence * 2;

        // Subtle drift
        p.x = p.baseX + Math.sin(time * 0.0005 + p.pulse) * 2;
        p.y = p.baseY + Math.cos(time * 0.0005 + p.pulse) * 2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(1, 210, 67, ${alpha})`;
        ctx.fill();

        // Connection lines to nearby particles on mouse proximity
        if (influence > 0.1) {
          for (const other of particles) {
            const odx = p.x - other.x;
            const ody = p.y - other.y;
            const oDist = Math.sqrt(odx * odx + ody * ody);
            if (oDist < 100 && oDist > 0) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(1, 210, 67, ${influence * 0.08})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  // GSAP entrance animations
  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.2,
      });

      tl.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".hero-icon",
          {
            scale: 0,
            rotation: -360,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(1.5)",
          },
          "-=0.3"
        )
        .from(
          ".hero-headline-line",
          {
            y: 80,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.6"
        )
        .from(
          ".hero-sub",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.3"
        )
        .from(
          ".hero-stats > div",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
          },
          "-=0.2"
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            duration: 0.6,
          },
          "-=0.1"
        );

      // Continuous floating on icon
      gsap.to(".hero-icon", {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });

      // Pulsing glow ring
      gsap.to(".hero-glow-ring", {
        scale: 1.15,
        opacity: 0.4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef }
  );

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Radial gradient overlays */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(1,210,67,0.08) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to bottom, var(--background), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to top, var(--background), transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">
        {/* Badge */}
        <div className="hero-badge mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-nam-green tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-nam-green animate-pulse" />
            Now Building — Join Early
          </span>
        </div>

        {/* Icon with glow ring */}
        <div className="hero-icon relative mb-10">
          <div className="hero-glow-ring absolute inset-[-16px] rounded-full border border-nam-green/20" />
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl glass flex items-center justify-center">
            <Image
              src="/assets/icon.svg"
              alt="NAM Pickaxe"
              width={56}
              height={56}
              className="w-12 h-12 md:w-14 md:h-14 drop-shadow-[0_0_20px_rgba(1,210,67,0.5)]"
              priority
            />
          </div>
        </div>

        {/* Headline */}
        <h1 className="overflow-hidden">
          <span className="hero-headline-line block text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight">
            Mine Crypto From
          </span>
          <span className="hero-headline-line block text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-gradient-green">
            Your Receipts
          </span>
        </h1>

        {/* Subheadline */}
        <p className="hero-sub mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-foreground/50 max-w-2xl leading-relaxed">
          Upload everyday receipts. Earn{" "}
          <span className="text-nam-green font-medium">NAM Coins</span>{" "}
          through on-chain mining. Get a powerful expense dashboard.
          <br className="hidden sm:block" />
          Zero risk. Zero investment. Real crypto.
        </p>

        {/* CTAs */}
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="#waitlist"
            onClick={(e) => scrollTo(e, "#waitlist")}
            className="hero-cta group relative px-8 py-3.5 bg-nam-green text-black font-semibold rounded-full hover:brightness-110 transition-all duration-200 text-center overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Join the Waitlist
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="#features"
            onClick={(e) => scrollTo(e, "#features")}
            className="hero-cta px-8 py-3.5 border border-nam-border text-foreground/70 font-medium rounded-full hover:border-nam-green/30 hover:text-foreground hover:bg-nam-green/5 transition-all duration-200 text-center"
          >
            Learn More
          </a>
        </div>

        {/* Stats strip */}
        <div className="hero-stats mt-14 md:mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {[
            { value: "On-Chain", label: "Mining" },
            { value: "Zero", label: "Investment" },
            { value: "Real-Time", label: "Insights" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-lg md:text-xl font-bold text-nam-green font-mono">
                {stat.value}
              </span>
              <span className="text-xs text-foreground/30 uppercase tracking-wider mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/25 font-medium">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-foreground/15 flex items-start justify-center p-1.5">
          <div className="w-1 h-1.5 rounded-full bg-nam-green animate-bounce" />
        </div>
      </div>
    </section>
  );
}
