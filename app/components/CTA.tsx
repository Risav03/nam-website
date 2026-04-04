"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      gsap.from(".cta-content", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="waitlist"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(1,210,67,0.12) 0%, rgba(1,210,67,0.03) 40%, transparent 70%)",
        }}
      />

      <div className="cta-content relative mx-auto max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Ready to Start{" "}
          <span className="text-gradient-green">Mining</span>?
        </h2>
        <p className="mt-4 text-foreground/50 text-base md:text-lg max-w-lg mx-auto">
          Be the first to earn NAM Coins when we launch. Join the waitlist and
          get early access.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-3.5 rounded-full bg-white/5 border border-nam-border text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-nam-green/50 focus:ring-1 focus:ring-nam-green/30 transition-all text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-nam-green text-black font-semibold rounded-full hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2 glow-green"
            >
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="mt-8 glass rounded-2xl p-6 max-w-md mx-auto">
            <div className="text-nam-green text-2xl mb-2">✓</div>
            <p className="text-foreground/80 font-medium">
              You&apos;re on the list!
            </p>
            <p className="text-foreground/40 text-sm mt-1">
              We&apos;ll notify you when NAM Rewards launches.
            </p>
          </div>
        )}

        <p className="mt-4 text-xs text-foreground/30">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
