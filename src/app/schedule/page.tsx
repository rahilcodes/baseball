import type { Metadata } from "next";
import { MapPin, Calendar } from "lucide-react";
import { ScheduleClient } from "@/components/sections/ScheduleClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Schedule — BPL Season 1",
  description: "Full BPL Season 1 match schedule. Regular season May–July 2026 plus playoffs. Oasis International School, Selangor.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

type Game = {
  time: string;
  home: string;
  away: string;
  location: string;
};

type GameDay = {
  date: string;        // e.g. "May 3, 2026"
  isoDate: string;     // for sorting / "today" detection
  games: Game[];
};

const LOCATION = "Oasis International School";

const REGULAR_SEASON: GameDay[] = [];

type PlayoffDay = GameDay & { round: string; };

const PLAYOFFS: PlayoffDay[] = [
  {
    date: "Saturday, July 25, 2026", isoDate: "2026-07-25", round: "Championship Finals", games: [
      { time: "10:00 AM", home: "Raiders Baseball Club", away: "PENDEKAR BESBOL TEAM", location: LOCATION },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SchedulePage() {
  return (
    <div className="pt-24 pb-24">
      <section className="py-16" aria-labelledby="schedule-heading">
        <div className="section-container max-w-4xl">

          {/* ── Header ── */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="badge badge-crimson mb-4" aria-hidden="true">Season 1 Finals · 2026</span>
              <h1
                id="schedule-heading"
                className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl"
                style={{ color: "var(--slate-50)" }}
              >
                Championship <span className="gradient-text">Finals</span>
              </h1>
              <p className="text-base mt-3 max-w-lg" style={{ color: "var(--slate-500)" }}>
                The inaugural BPL Season 1 Championship match. Standard 7 innings with WBSC tiebreaker rules.
              </p>
            </div>
            <div className="flex flex-col gap-1.5 text-sm shrink-0" style={{ color: "var(--slate-500)" }}>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-crimson-400" />
                <span>Oasis International School</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-crimson-400" />
                <span>Saturday, July 25, 2026</span>
              </div>
            </div>
          </div>

          {/* ── Quick Stats ── */}
          <div className="grid grid-cols-3 gap-4 mb-14">
            {[
              { label: "Championship Game", value: "1 Match" },
              { label: "Finalist Teams",     value: "2 Teams" },
              { label: "Date",              value: "July 25" },
            ].map(({ label, value }) => (
              <div key={label} className="glass-card p-4 text-center">
                <p className="text-xl sm:text-2xl font-heading font-black text-white">{value}</p>
                <p className="text-[11px] uppercase tracking-wider mt-1" style={{ color: "var(--slate-500)" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* ── Finals Schedule ── */}
          <ScheduleClient playoffs={PLAYOFFS} />

        </div>
      </section>
    </div>
  );
}
