import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { BaseballIcon } from "@/components/ui/BplIcons";
import { Button } from "@/components/ui/Button";
import { Countdown } from "@/components/ui/Countdown";

const SEASON_START = new Date("2026-05-04T09:00:00+08:00");

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero — Baseball Premier League Season 1"
    >
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero-bg.png"
          alt="Golden hour on Malaysia's baseball field"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(2,11,24,0.85)] via-[rgba(2,11,24,0.6)] to-[rgba(2,11,24,0.95)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(2,11,24,0.8)] via-transparent to-[rgba(2,11,24,0.4)]" />
      </div>

      {/* Animated radial glow behind CTA */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(227,27,35,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Grid texture */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative section-container flex flex-col items-center text-center pt-32 pb-20">
        {/* Season badge */}
        <div className="badge badge-crimson mb-8 animate-float">
          <BaseballIcon size={12} aria-hidden="true" />
          <span>Season 1 — May 2026</span>
        </div>

        {/* Headline */}
        <h1
          className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight text-balance max-w-5xl mb-6"
          style={{ color: "var(--slate-50)" }}
        >
          Malaysia&apos;s Premier{" "}
          <span className="gradient-text">Adult Baseball</span>{" "}
          League
        </h1>

        {/* Sub-headline */}
        <p
          className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mb-4"
          style={{ color: "var(--slate-400)" }}
        >
          Season 1 · Selangor · May–July 2026
        </p>
        <p
          className="text-base sm:text-lg leading-relaxed max-w-xl mb-12"
          style={{ color: "var(--slate-500)" }}
        >
          WBSC-standard rules. Certified umpires. Statistical tracking.
          A real league for real players.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <Button variant="primary" size="xl" asChild>
            <Link href="/register/team" className="group">
              Register a Team
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="outline" size="xl" asChild>
            <Link href="/register/free-agent">
              Free Agent
            </Link>
          </Button>
        </div>

        {/* Countdown */}
        <Countdown targetDate={SEASON_START} label="Season 1 kick-off" />

        {/* Trust snips */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--slate-600)" }}
          aria-label="League credentials"
        >
          <span>WBSC Official Rules</span>
          <span className="w-1 h-1 rounded-full bg-current" aria-hidden="true" />
          <span>100+ Players</span>
          <span className="w-1 h-1 rounded-full bg-current" aria-hidden="true" />
          <span>6–8 Competitive Teams</span>
          <span className="w-1 h-1 rounded-full bg-current" aria-hidden="true" />
          <span>13 Weeks of Play</span>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="text-xs uppercase tracking-widest" style={{ color: "var(--slate-600)" }}>Scroll</span>
        <ChevronDown size={16} className="animate-bounce" style={{ color: "var(--slate-600)" }} />
      </div>
    </section>
  );
}
