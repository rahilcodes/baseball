import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Target, History, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About BPL",
  description: "Learn about the Baseball Premier League — Malaysia's first structured adult baseball league. Our story, our mission, and the team behind Season 1.",
};

const LEADERSHIP = [
  {
    role: "Commissioner",
    name: "Basit",
    phone: "10-227 6014",
    detail: "All final disciplinary decisions, emergency contact, and league operations.",
    image: "/images/team/basit.jpeg",
  },
  {
    role: "Deputy Commissioner",
    name: "Shinji Konishi",
    phone: "11-2790 4034",
    detail: "First aid kit custodian, field operations, and day-of-game coordination.",
    image: "/images/team/shinji.jpeg",
  },
  {
    role: "Operations Manager",
    name: "Yusuf Sadahiro",
    phone: null,
    detail: "Manages league logistics, scheduling, and operational workflows.",
    image: "/images/team/yusuf.jpeg",
  },
  {
    role: "University & Media Coordinator",
    name: "Tomoki",
    phone: null,
    detail: "University partnerships, media coverage, and content production.",
    image: null,
  },
  {
    role: "Director of Player Development & Community Outreach",
    name: "Riley Pitts",
    phone: null,
    detail: "Player development programs, community initiatives, and clinics.",
    image: "/images/team/riley.jpeg",
  },
];

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
              Malaysia had players from local communities and from Japan, Korea, United States, China — 
              all of them looking for the same game.
            </p>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--slate-500)" }}>
              What it didn&apos;t have was a league. Until now.
            </p>
          </div>
        </div>
      </section>

      {/* Full-screen Photo */}
      <section className="relative" style={{ height: "70vh", minHeight: "400px" }} aria-label="League in action">
        <Image
          src="/images/hero-shot.png"
          alt="Players at Baseball Premier League Malaysia"
          fill
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(2,11,24,1) 0%, rgba(2,11,24,0.4) 50%, rgba(2,11,24,0.2) 100%)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 section-container pb-12">
          <blockquote className="max-w-2xl">
            <p className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl leading-snug" style={{ color: "var(--slate-50)" }}>
              &ldquo;Malaysia had players from local communities and from Japan, Korea, United States, China —{" "}
              <span className="gradient-text">all of them looking for the same game.&rdquo;</span>
            </p>
          </blockquote>
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
            className="font-heading font-bold text-2xl sm:text-3xl mb-3"
            style={{ color: "var(--slate-50)" }}
          >
            League Leadership
          </h2>
          <p className="text-sm mb-10" style={{ color: "var(--slate-500)" }}>
            The BPL is built by baseball people, for baseball people. Season 1 is powered by this founding team.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LEADERSHIP.map(({ role, name, phone, detail, image }) => (
              <div 
                key={role} 
                className="glass-card flex flex-col items-center text-center relative overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(227,27,35,0.2)]"
                style={{ padding: "3rem 2rem 2.5rem", borderTop: "2px solid transparent" }}
              >
                {/* Subtle top gradient border effect via pseudo-element behavior on hover handled by shadow, but let's add a top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-crimson-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div 
                  className="w-32 h-32 shrink-0 rounded-full p-[3px] mb-6 relative"
                  style={{ background: "linear-gradient(135deg, rgba(227,27,35,0.8), rgba(245,166,35,0.8))" }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-navy-900 border-4 border-navy-950 flex items-center justify-center relative">
                    {image ? (
                      <Image 
                        src={image} 
                        alt={name} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                        sizes="(max-width: 768px) 128px, 128px"
                      />
                    ) : (
                      <User size={40} style={{ color: "var(--slate-400)" }} />
                    )}
                  </div>
                </div>

                <div className="badge badge-crimson mb-4 px-3 py-1 text-[10px]">
                  {role}
                </div>
                
                <h3 className="font-heading font-bold text-2xl mb-2" style={{ color: "var(--slate-50)" }}>
                  {name}
                </h3>
                
                {phone && (
                  <a
                    href={`tel:+60${phone.replace(/[-\s]/g, "")}`}
                    className="text-sm transition-colors hover:text-white block mb-4 font-medium"
                    style={{ color: "var(--gold-300)" }}
                  >
                    {phone}
                  </a>
                )}
                
                <p className="text-sm leading-relaxed mt-auto" style={{ color: "var(--slate-400)" }}>
                  {detail}
                </p>
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


