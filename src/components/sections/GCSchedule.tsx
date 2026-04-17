"use client";

import { ExternalLink, Calendar, Clock, Zap } from "lucide-react";

const GC_ORG_URL = "https://web.gc.com/organizations/SrKbLlcTiUc1";

export function GCSchedule() {
  return (
    <div className="space-y-6">
      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Calendar, label: "Auto-Updated", desc: "Schedule synced live from GameChanger" },
          { icon: Clock, label: "Every Sunday", desc: "Games start from 9 AM at UPM, Selangor" },
          { icon: Zap, label: "Live Scores", desc: "Real-time results on GameChanger app" },
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
            <span className="badge badge-crimson mb-4 inline-block">Live Schedule</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-3" style={{ color: "var(--slate-50)" }}>
              Full Season 1 Fixtures
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--slate-400)" }}>
              All 13 weeks of match-ups, game times, and results are tracked live on GameChanger.
              Click below to view the complete, up-to-date schedule.
            </p>
          </div>
          <a
            href={`${GC_ORG_URL}/schedule`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-xl font-heading font-bold text-white shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: "var(--crimson-500)",
              boxShadow: "0 4px 24px rgba(227,27,35,0.3)",
            }}
          >
            View Schedule
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <p className="text-xs text-center" style={{ color: "var(--slate-600)" }}>
        Powered by GameChanger · Opens in a new tab
      </p>
    </div>
  );
}
