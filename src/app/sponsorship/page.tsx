import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { BaseballIcon, DiamondIcon, ScoreboardIcon, JerseyIcon } from "@/components/ui/BplIcons";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SPONSOR_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Become a Sponsor",
  description: "Partner with Malaysia's premier adult baseball league. Title, Gold, and Silver sponsorship packages from RM 1,000–15,000. 100,000+ total impressions. Be the founding sponsor.",
};

const AUDIENCE = [
  { label: "Malaysian Nationals", pct: 60, color: "var(--crimson-400)" },
  { label: "Japanese & Korean Expats", pct: 25, color: "var(--gold-400)" },
  { label: "Other International", pct: 15, color: "var(--slate-400)" },
];

const ADVANTAGES = [
  { title: "First-Mover Advantage", text: "There will only ever be ONE founding sponsor of Malaysia's premier adult baseball league." },
  { title: "Exclusivity", text: "Title sponsorship: one partner only. Gold: three maximum. The earlier you commit, the more premium your position." },
  { title: "Unmatched Value", text: "At RM 0.10–0.15 per impression, BPL sponsorship outperforms digital ads, billboards, and radio — with community depth." },
  { title: "National Recognized", text: "Government proposal being submitted to National Sports Council and Ministry of Sports & Youth." },
];

export default function SponsorshipPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 relative" aria-labelledby="sponsor-page-heading">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(245,166,35,0.06) 0%, transparent 60%)" }}
          aria-hidden="true"
        />
        <div className="section-container">
          <div className="max-w-3xl">
            <span className="badge badge-gold mb-6" aria-hidden="true">Sponsorship Prospectus 2026</span>
            <h1
              id="sponsor-page-heading"
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl mb-6"
              style={{ color: "var(--slate-50)" }}
            >
              Be where Malaysia
              <br />
              <span className="gradient-text">steps up to the plate.</span>
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed mb-8" style={{ color: "var(--slate-400)" }}>
              The Baseball Premier League is Malaysia&apos;s premier adult baseball league — a premium sports property
              reaching a multicultural, mid-to-high-income audience every Sunday for 13 weeks.
            </p>
            <Button variant="primary" size="lg" asChild className="group">
              <Link href="/register/sponsor?tier=title">
                Enquire Now
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ROI Stats */}
      <section className="py-16" aria-labelledby="roi-heading">
        <div className="section-container">
          <h2
            id="roi-heading"
            className="font-heading font-bold text-2xl sm:text-3xl mb-2 sr-only"
            style={{ color: "var(--slate-50)" }}
          >
            Return on Investment
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { value: 100000, suffix: "+", label: "Total Impressions (Season)", icon: BaseballIcon },
              { value: 600, suffix: "/wk", label: "Game-Day Reach (Weekly)", icon: DiamondIcon },
              { value: 13, suffix: " Sundays", label: "Live Brand Exposure", icon: ScoreboardIcon },
              { value: 0.15, suffix: "", prefix: "RM ", label: "Max Cost Per Impression", icon: JerseyIcon, decimals: 2 },
            ].map(({ value, suffix, prefix, label, icon: Icon, decimals }) => (
              <div key={label} className="glass-card p-6 text-center">
                <Icon size={20} className="mx-auto mb-3" style={{ color: "var(--gold-400)" }} aria-hidden="true" />
                <div className="font-heading font-bold text-2xl sm:text-3xl mb-2" style={{ color: "var(--gold-400)" }}>
                  <AnimatedCounter end={value} suffix={suffix} prefix={prefix} decimals={decimals} />
                </div>
                <p className="text-xs sm:text-sm font-medium" style={{ color: "var(--slate-300)" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Audience */}
          <div className="glass-card p-8 sm:p-12 mb-12">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-8" style={{ color: "var(--slate-50)" }}>
              A Premium, Untapped Audience
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="text-sm mb-6" style={{ color: "var(--slate-400)" }}>
                  BPL &apos;s audience is active, professional, mid-to-high income adults aged 18–45. 
                  A rare multicultural mix that includes Malaysia&apos;s strong Japanese and Korean expat communities.
                </p>
                <div className="space-y-4">
                  {AUDIENCE.map(({ label, pct, color }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium" style={{ color: "var(--slate-300)" }}>{label}</span>
                        <span className="text-sm font-bold" style={{ color }}>{pct}%</span>
                      </div>
                      <div
                        className="h-2 rounded-full overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                        role="progressbar"
                        aria-valuenow={pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${label}: ${pct}%`}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${pct}%`, background: color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "18–45", label: "Age Range" },
                  { stat: "Mid-High", label: "Income Bracket" },
                  { stat: "Weekly", label: "Physical Activity" },
                  { stat: "Families", label: "Sunday Game Crowd" },
                ].map(({ stat, label }) => (
                  <div key={label} className="glass-card p-5 text-center">
                    <p className="font-heading font-bold text-xl mb-1" style={{ color: "var(--slate-50)" }}>{stat}</p>
                    <p className="text-xs" style={{ color: "var(--slate-500)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 animated-gradient-bg" aria-labelledby="packages-heading">
        <div className="section-container">
          <h2
            id="packages-heading"
            className="font-heading font-bold text-3xl sm:text-4xl mb-3 text-center"
            style={{ color: "var(--slate-50)" }}
          >
            Sponsorship Packages
          </h2>
          <p className="text-center text-base mb-12" style={{ color: "var(--slate-400)" }}>
            Choose your position. The earlier you commit, the more premium your placement.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SPONSOR_PACKAGES.map((pkg) => {
              const tierStyles = (() => {
                if (pkg.tier === "title") return { color: "var(--crimson-400)", bg: "linear-gradient(135deg, var(--crimson-500) 0%, var(--crimson-400) 100%)", shadow: "rgba(227,27,35,0.35)", border: "rgba(227,27,35,0.4)", cardBg: "rgba(227,27,35,0.03)" };
                if (pkg.tier === "gold") return { color: "#FBBF24", bg: "linear-gradient(135deg, #D97706 0%, #FBBF24 100%)", shadow: "rgba(251,191,36,0.25)", border: "rgba(251,191,36,0.2)", cardBg: "rgba(251,191,36,0.02)" };
                if (pkg.tier === "silver") return { color: "#E2E8F0", bg: "linear-gradient(135deg, #475569 0%, #94A3B8 100%)", shadow: "rgba(148,163,184,0.25)", border: "rgba(255,255,255,0.1)", cardBg: "rgba(255,255,255,0.02)" };
                return { color: "var(--crimson-400)", bg: "var(--crimson-400)", shadow: "rgba(227,27,35,0.35)", border: "var(--glass-border)", cardBg: "transparent" };
              })();

              return (
                <div
                  key={pkg.tier}
                  className={`glass-card p-8 flex flex-col ${pkg.tier === "title" ? "relative" : ""}`}
                  style={{
                    border: `1px solid ${tierStyles.border}`,
                    background: tierStyles.cardBg,
                  }}
                >
                {pkg.tier === "title" && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 badge"
                    style={{ fontSize: "0.7rem", background: "var(--crimson-500)", color: "white", border: "1px solid rgba(227,27,35,0.4)" }}
                  >
                    Most Exclusive
                  </div>
                )}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading font-bold text-xl" style={{ color: "var(--slate-50)" }}>
                      {pkg.name}
                    </h3>
                    <span
                      className="badge text-xs"
                      style={pkg.slotsAvailable <= 1
                        ? { background: "rgba(183,28,28,0.15)", color: "var(--crimson-300)", border: "1px solid rgba(183,28,28,0.25)", fontSize: "0.65rem" }
                        : { background: "rgba(255,255,255,0.06)", color: "var(--slate-400)", border: "1px solid var(--glass-border)", fontSize: "0.65rem" }
                      }
                    >
                      {pkg.slotsAvailable} slot{pkg.slotsAvailable !== 1 ? "s" : ""} left
                    </span>
                  </div>
                  <p
                    className="font-heading font-bold text-3xl"
                    style={{ color: tierStyles.color }}
                  >
                    {pkg.priceRange}
                  </p>
                </div>

                <ul className="space-y-3 flex-1 mb-8" role="list" aria-label={`${pkg.name} benefits`}>
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm" style={{ color: "var(--slate-300)" }}>
                      <CheckCircle
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: tierStyles.color }}
                        aria-hidden="true"
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  asChild
                  className={`w-full border-0 transition-transform hover:-translate-y-1 ${pkg.tier === "silver" ? "text-[var(--navy-950)]" : "text-white"}`}
                  style={{
                    background: tierStyles.bg,
                    boxShadow: `0 0 24px ${tierStyles.shadow}`,
                  }}
                >
                  <Link href={`/register/sponsor?tier=${pkg.tier}`}>
                    Claim {pkg.name}
                  </Link>
                </Button>
              </div>
            );
          })}
          </div>
        </div>
      </section>

      {/* Why Now */}
      <section className="py-20" aria-labelledby="why-now-heading">
        <div className="section-container">
          <h2
            id="why-now-heading"
            className="font-heading font-bold text-3xl sm:text-4xl mb-12"
            style={{ color: "var(--slate-50)" }}
          >
            Why partner <span className="gradient-text">right now</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ADVANTAGES.map(({ title, text }) => (
              <div key={title} className="glass-card glass-card-hover p-6 sm:p-8">
                <h3 className="font-heading font-semibold text-lg mb-3" style={{ color: "var(--slate-50)" }}>
                  {title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--slate-400)" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" aria-label="Sponsorship call to action">
        <div className="section-container text-center">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4" style={{ color: "var(--slate-50)" }}>
            Let&apos;s build something historic together.
          </h2>
          <p className="text-lg mb-8" style={{ color: "var(--slate-400)" }}>
            Reply to this page, reach out via WhatsApp, or email us directly. We&apos;ll arrange a 15-minute call.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="xl" asChild>
              <Link href="/register/sponsor">Claim Sponsorship Now</Link>
            </Button>
            <Button size="xl" asChild style={{ background: "#25D366", color: "#ffffff", border: "none" }} className="hover:opacity-90">
              <a href="https://wa.me/60102276014" target="_blank" rel="noopener noreferrer">
                WhatsApp Commissioner
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
