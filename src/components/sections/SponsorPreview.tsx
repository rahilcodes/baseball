import Link from "next/link";
import { TrendingUp, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SPONSOR_PACKAGES } from "@/lib/data";

export function SponsorPreview() {
  return (
    <section
      className="relative py-24"
      aria-labelledby="sponsor-heading"
    >
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge badge-gold mb-4" aria-hidden="true">
            For Brands & Businesses
          </span>
          <h2
            id="sponsor-heading"
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4"
            style={{ color: "var(--slate-50)" }}
          >
            Be first.{" "}
            <span className="gradient-text">Be historic.</span>
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "var(--slate-400)" }}>
            There will only ever be ONE founding sponsor of Malaysia&apos;s premier adult baseball league.
            That story belongs to your brand.
          </p>
        </div>

        {/* ROI metrics */}
        <div
          className="glass-card p-8 sm:p-12 mb-12 relative overflow-hidden"
          style={{ border: "1px solid rgba(245,166,35,0.15)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 0% 50%, rgba(245,166,35,0.04) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: 100000, suffix: "+", label: "Total Impressions", sub: "Over full season" },
              { value: 600, suffix: "/wk", label: "Weekly Game-Day Reach", sub: "13 Sundays" },
              { value: 5000, suffix: "+/mo", label: "Social Media Reach", sub: "Growing audience" },
              { value: 0.15, suffix: "", prefix: "RM ", label: "Per Impression (Max)", sub: "vs RM 0.50+ for digital ads", decimals: 2 },
            ].map(({ value, suffix, prefix, label, sub, decimals }) => (
              <div key={label}>
                <div
                  className="font-heading font-bold text-3xl sm:text-4xl mb-2"
                  style={{ color: "var(--gold-400)" }}
                >
                  <AnimatedCounter
                    end={value}
                    suffix={suffix}
                    prefix={prefix}
                    decimals={decimals}
                  />
                </div>
                <p
                  className="font-semibold text-sm sm:text-base mb-1"
                  style={{ color: "var(--slate-200)" }}
                >
                  {label}
                </p>
                <p className="text-xs" style={{ color: "var(--slate-500)" }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tier preview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {SPONSOR_PACKAGES.map((pkg) => (
            <div
              key={pkg.tier}
              className={`glass-card glass-card-hover p-6 sm:p-8 flex flex-col ${
                pkg.tier === "title" ? "md:col-span-1" : ""
              }`}
              style={
                pkg.tier === "title"
                  ? { border: "1px solid rgba(245,166,35,0.3)", background: "rgba(245,166,35,0.03)" }
                  : {}
              }
            >
              {pkg.slotsAvailable === 1 && pkg.tier === "title" && (
                <span className="badge badge-gold mb-4 self-start text-xs">
                  <Award size={10} aria-hidden="true" />
                  1 slot only
                </span>
              )}
              <div className="flex items-start justify-between mb-3">
                <h3
                  className="font-heading font-bold text-xl"
                  style={{ color: "var(--slate-50)" }}
                >
                  {pkg.name}
                </h3>
                <span
                  className="badge badge-navy text-xs"
                  style={{ fontSize: "0.7rem" }}
                >
                  {pkg.slotsAvailable} left
                </span>
              </div>
              <p
                className="font-heading font-bold text-2xl sm:text-3xl mb-4"
                style={{ color: pkg.tier === "title" ? "var(--gold-400)" : "var(--crimson-400)" }}
              >
                {pkg.priceRange}
              </p>
              <ul className="space-y-2 flex-1">
                {pkg.highlights.slice(0, 4).map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm" style={{ color: "var(--slate-400)" }}>
                    <TrendingUp size={12} className="mt-1 shrink-0" style={{ color: "var(--crimson-400)" }} aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="primary" size="xl" asChild className="group">
            <Link href="/sponsorship">
              View Full Sponsorship Packages
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
          <p className="mt-4 text-sm" style={{ color: "var(--slate-600)" }}>
            Title sponsorship is exclusively available to one brand.
          </p>
        </div>
      </div>
    </section>
  );
}
