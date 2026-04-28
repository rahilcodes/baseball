"use client";

import { ExternalLink, Trophy, TrendingUp, Users, ArrowRight } from "lucide-react";

const GC_STANDINGS_URL = "https://web.gc.com/organizations/SrKbLlcTiUc1/standings";

export function GCStandings() {
  return (
    <div className="space-y-8">

      {/* Feature chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Trophy,     label: "Live Rankings",     desc: "W/L records updated after every game" },
          { icon: TrendingUp, label: "Run Differential",  desc: "Track runs scored and allowed per team" },
          { icon: Users,      label: "All 7 Teams",       desc: "Complete league table with all clubs" },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="glass-card p-5 flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(227,27,35,0.1)", border: "1px solid rgba(227,27,35,0.15)" }}
            >
              <Icon size={18} style={{ color: "var(--crimson-400)" }} />
            </div>
            <div>
              <p className="font-semibold text-sm mb-0.5" style={{ color: "var(--slate-100)" }}>{label}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--slate-500)" }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main CTA card with big button */}
      <div
        className="glass-card rounded-2xl relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(227,27,35,0.08) 0%, rgba(2,11,24,0.9) 60%, rgba(10,25,47,0.8) 100%)",
          border: "1px solid rgba(227,27,35,0.2)",
        }}
      >
        {/* Radial glow */}
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(227,27,35,0.12) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }}
        />

        <div className="relative p-8 sm:p-12">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-crimson-500" />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--crimson-400)" }}>
              Live via GameChanger
            </span>
          </div>

          <h2
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4"
            style={{ color: "var(--slate-50)" }}
          >
            Season 1{" "}
            <span className="gradient-text">Standings</span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "var(--slate-400)" }}>
            Full win/loss records, winning percentages, runs scored, and run differentials
            for all 7 teams — updated in real time after each match day.
          </p>

          {/* Big CTA button */}
          <a
            href={GC_STANDINGS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-heading font-bold text-white text-lg transition-all duration-300 hover:scale-105 group"
            style={{
              background: "var(--crimson-500)",
              boxShadow: "0 8px 32px rgba(227,27,35,0.4), 0 0 0 1px rgba(227,27,35,0.3)",
            }}
          >
            <Trophy size={20} />
            View Standings on GameChanger
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>

          <p className="mt-5 text-sm flex items-center gap-2" style={{ color: "var(--slate-600)" }}>
            <ExternalLink size={12} />
            Opens GameChanger — free to view, no account required
          </p>
        </div>
      </div>

    </div>
  );
}
