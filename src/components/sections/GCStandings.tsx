"use client";

import { ExternalLink, Trophy, TrendingUp, Users } from "lucide-react";

const GC_ORG_URL = "https://web.gc.com/organizations/SrKbLlcTiUc1";

export function GCStandings() {
  return (
    <div className="space-y-6">
      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Trophy, label: "Live Rankings", desc: "W/L records updated after every game" },
          { icon: TrendingUp, label: "Run Differential", desc: "Track runs scored and allowed per team" },
          { icon: Users, label: "All 6 Teams", desc: "Complete league table with all clubs" },
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

      {/* Main CTA card */}
      <div
        className="glass-card overflow-hidden rounded-2xl relative"
        style={{
          background: "linear-gradient(135deg, rgba(227,27,35,0.06) 0%, rgba(2,11,24,0.8) 100%)",
          border: "1px solid rgba(227,27,35,0.15)",
        }}
      >
        {/* Glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, rgba(227,27,35,0.4) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
        />

        <div className="relative p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-1 text-center sm:text-left">
            <span className="badge badge-crimson mb-4 inline-block">League Table</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-3" style={{ color: "var(--slate-50)" }}>
              Season 1 Standings
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--slate-400)" }}>
              Full win/loss records, winning percentages, runs scored, and run differentials for all 6 teams — 
              updated in real time on GameChanger after each match day.
            </p>
          </div>
          <a
            href={`${GC_ORG_URL}/standings`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-xl font-heading font-bold text-white shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: "var(--crimson-500)",
              boxShadow: "0 4px 24px rgba(227,27,35,0.3)",
            }}
          >
            View Standings
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <p className="text-xs text-center" style={{ color: "var(--slate-600)" }}>
        Season begins <span style={{ color: "var(--crimson-400)" }}>May 4, 2026</span> · Powered by GameChanger
      </p>
    </div>
  );
}
