import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Target, History, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LEAGUE_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: "About BPL",
  description: "Learn about the Baseball Premier League — Malaysia's first structured adult baseball league. Our story, our mission, and the team behind Season 1.",
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 relative" aria-labelledby="about-hero-heading">
        <div className="section-container">
          <div className="max-w-3xl">
            <span className="badge badge-crimson mb-6" aria-hidden="true">Our Story</span>
            <h1
              id="about-hero-heading"
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl mb-6"
              style={{ color: "var(--slate-50)" }}
            >
              We filled the gap
              <br />
              <span className="gradient-text">nobody else would.</span>
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed mb-4" style={{ color: "var(--slate-400)" }}>
              Malaysia had players. Malaysia had passion. Malaysia had communities from Japan, Korea, the United States — 
              all of them looking for the same thing: organised, competitive adult baseball.
            </p>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--slate-500)" }}>
              What it didn&apos;t have was a league. Until now.
            </p>
          </div>
        </div>
      </section>

      {/* Photo */}
      <section className="py-6 relative" aria-label="League in action">
        <div className="section-container">
          <div className="relative rounded-2xl overflow-hidden" style={{ height: "clamp(240px, 40vw, 500px)" }}>
            <Image
              src="/images/hero-shot.png"
              alt="Players at Baseball Premier League Malaysia"
              fill
              quality={85}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1280px"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(2,11,24,0.8) 0%, transparent 60%)" }}
            />
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-20" aria-labelledby="mission-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                text: "To create Malaysia's most competitive and inclusive adult baseball league — one that meets international standards while serving a deeply local community.",
              },
              {
                icon: History,
                title: "Our Vision",
                text: "A multi-state national baseball circuit by Season 3, with 300+ players, government recognition, and a clear pathway for talent to reach the national squad.",
              },
              {
                icon: Heart,
                title: "Our Values",
                text: "Respect for the game, respect for the culture. Every match pauses for the Azan. Every player — regardless of nationality — is treated as family.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="glass-card p-8">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(227,27,35,0.12)", border: "1px solid rgba(227,27,35,0.2)" }}
                >
                  <Icon size={22} style={{ color: "var(--crimson-400)" }} aria-hidden="true" />
                </div>
                <h2 id="mission-heading" className="font-heading font-bold text-xl mb-3" style={{ color: "var(--slate-50)" }}>
                  {title}
                </h2>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--slate-400)" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 animated-gradient-bg" aria-labelledby="leadership-heading">
        <div className="section-container">
          <h2
            id="leadership-heading"
            className="font-heading font-bold text-2xl sm:text-3xl mb-10"
            style={{ color: "var(--slate-50)" }}
          >
            League Leadership
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { role: "Commissioner", name: LEAGUE_INFO.commissioner.name, phone: LEAGUE_INFO.commissioner.phone, detail: "All final disciplinary decisions, emergency contact." },
              { role: "Deputy Commissioner", name: LEAGUE_INFO.deputyCommissioner.name, phone: LEAGUE_INFO.deputyCommissioner.phone, detail: "First aid kit custodian, field operations." },
              { role: "Director of Player Development", name: "Shinji", phone: "—", detail: "Manages the Free Agent Draft and evaluation process." },
            ].map(({ role, name, phone, detail }) => (
              <div key={role} className="glass-card p-6">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--crimson-400)" }}>
                  {role}
                </p>
                <h3 className="font-heading font-bold text-xl mb-1" style={{ color: "var(--slate-50)" }}>{name}</h3>
                {phone !== "—" && (
                  <a
                    href={`tel:+60${phone.replace(/-/g, "")}`}
                    className="text-sm transition-colors hover:text-white block mb-2"
                    style={{ color: "var(--slate-400)" }}
                  >
                    {phone}
                  </a>
                )}
                <p className="text-sm" style={{ color: "var(--slate-500)" }}>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" aria-label="Register call to action">
        <div className="section-container text-center">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4" style={{ color: "var(--slate-50)" }}>
            Ready to be part of history?
          </h2>
          <p className="text-base sm:text-lg mb-8" style={{ color: "var(--slate-400)" }}>
            Season 1 registration is open now. Don&apos;t wait.
          </p>
          <Button variant="primary" size="xl" asChild className="group">
            <Link href="/register">
              Register Now <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
