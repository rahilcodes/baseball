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

const REGULAR_SEASON: GameDay[] = [
  {
    date: "May 3, 2026", isoDate: "2026-05-03", games: [
      { time: "8:00 AM",  home: "Raiders Baseball Club",  away: "KL DRAGONS",          location: LOCATION },
      { time: "10:30 AM", home: "Urgentz",                away: "Sunway Cubs",           location: LOCATION },
      { time: "1:00 PM",  home: "Guardians",              away: "Klang Ravens",          location: LOCATION },
    ],
  },
  {
    date: "May 9, 2026", isoDate: "2026-05-09", games: [
      { time: "8:00 AM",  home: "Urgentz",                away: "Raiders Baseball Club", location: LOCATION },
      { time: "10:30 AM", home: "PENDEKAR BESBOL TEAM",   away: "Guardians",             location: LOCATION },
      { time: "1:00 PM",  home: "Sunway Cubs",            away: "Klang Ravens",          location: LOCATION },
    ],
  },
  {
    date: "May 17, 2026", isoDate: "2026-05-17", games: [
      { time: "8:00 AM",  home: "Guardians",              away: "KL DRAGONS",            location: LOCATION },
      { time: "10:30 AM", home: "PENDEKAR BESBOL TEAM",   away: "Sunway Cubs",           location: LOCATION },
      { time: "1:00 PM",  home: "Klang Ravens",           away: "Raiders Baseball Club", location: LOCATION },
    ],
  },
  {
    date: "May 23, 2026", isoDate: "2026-05-23", games: [
      { time: "8:00 AM",  home: "Sunway Cubs",            away: "Guardians",             location: LOCATION },
      { time: "10:30 AM", home: "Urgentz",                away: "KL DRAGONS",            location: LOCATION },
      { time: "1:00 PM",  home: "Raiders Baseball Club",  away: "PENDEKAR BESBOL TEAM",  location: LOCATION },
    ],
  },
  {
    date: "May 24, 2026", isoDate: "2026-05-24", games: [
      { time: "8:00 AM",  home: "Guardians",              away: "Urgentz",               location: LOCATION },
      { time: "10:30 AM", home: "Sunway Cubs",            away: "Raiders Baseball Club", location: LOCATION },
      { time: "1:00 PM",  home: "KL DRAGONS",             away: "Klang Ravens",          location: LOCATION },
    ],
  },
  {
    date: "May 30, 2026", isoDate: "2026-05-30", games: [
      { time: "8:00 AM",  home: "Raiders Baseball Club",  away: "Guardians",             location: LOCATION },
      { time: "10:30 AM", home: "PENDEKAR BESBOL TEAM",   away: "KL DRAGONS",            location: LOCATION },
      { time: "1:00 PM",  home: "Klang Ravens",           away: "Urgentz",               location: LOCATION },
    ],
  },
  {
    date: "June 7, 2026", isoDate: "2026-06-07", games: [
      { time: "8:00 AM",  home: "Urgentz",                away: "Guardians",             location: LOCATION },
      { time: "10:30 AM", home: "Sunway Cubs",            away: "KL DRAGONS",            location: LOCATION },
      { time: "1:00 PM",  home: "Klang Ravens",           away: "PENDEKAR BESBOL TEAM",  location: LOCATION },
    ],
  },
  {
    date: "June 13, 2026", isoDate: "2026-06-13", games: [
      { time: "8:00 AM",  home: "Sunway Cubs",            away: "Urgentz",               location: LOCATION },
      { time: "10:30 AM", home: "KL DRAGONS",             away: "Raiders Baseball Club", location: LOCATION },
      { time: "1:00 PM",  home: "PENDEKAR BESBOL TEAM",   away: "Klang Ravens",          location: LOCATION },
    ],
  },
  {
    date: "June 20, 2026", isoDate: "2026-06-20", games: [
      { time: "8:00 AM",  home: "Raiders Baseball Club",  away: "Urgentz",               location: LOCATION },
      { time: "10:30 AM", home: "Guardians",              away: "PENDEKAR BESBOL TEAM",  location: LOCATION },
      { time: "1:00 PM",  home: "Klang Ravens",           away: "Sunway Cubs",           location: LOCATION },
    ],
  },
  {
    date: "June 21, 2026", isoDate: "2026-06-21", games: [
      { time: "8:00 AM",  home: "KL DRAGONS",             away: "Guardians",             location: LOCATION },
      { time: "10:30 AM", home: "Sunway Cubs",            away: "PENDEKAR BESBOL TEAM",  location: LOCATION },
      { time: "1:00 PM",  home: "Raiders Baseball Club",  away: "Klang Ravens",          location: LOCATION },
    ],
  },
  {
    date: "June 27, 2026", isoDate: "2026-06-27", games: [
      { time: "8:00 AM",  home: "Guardians",              away: "Sunway Cubs",           location: LOCATION },
      { time: "10:30 AM", home: "KL DRAGONS",             away: "Urgentz",               location: LOCATION },
      { time: "1:00 PM",  home: "PENDEKAR BESBOL TEAM",   away: "Raiders Baseball Club", location: LOCATION },
    ],
  },
  {
    date: "July 4, 2026", isoDate: "2026-07-04", games: [
      { time: "8:00 AM",  home: "Raiders Baseball Club",  away: "Sunway Cubs",           location: LOCATION },
      { time: "10:30 AM", home: "Urgentz",                away: "PENDEKAR BESBOL TEAM",  location: LOCATION },
      { time: "1:00 PM",  home: "Klang Ravens",           away: "KL DRAGONS",            location: LOCATION },
    ],
  },
  {
    date: "July 5, 2026", isoDate: "2026-07-05", games: [
      { time: "8:00 AM",  home: "Guardians",              away: "Raiders Baseball Club", location: LOCATION },
      { time: "10:30 AM", home: "KL DRAGONS",             away: "PENDEKAR BESBOL TEAM",  location: LOCATION },
      { time: "1:00 PM",  home: "Urgentz",                away: "Klang Ravens",          location: LOCATION },
    ],
  },
  {
    date: "July 11, 2026", isoDate: "2026-07-11", games: [
      { time: "8:00 AM",  home: "KL DRAGONS",             away: "Sunway Cubs",           location: LOCATION },
      { time: "10:30 AM", home: "PENDEKAR BESBOL TEAM",   away: "Urgentz",               location: LOCATION },
      { time: "1:00 PM",  home: "Klang Ravens",           away: "Guardians",             location: LOCATION },
    ],
  },
];

type PlayoffDay = GameDay & { round: string; };

const PLAYOFFS: PlayoffDay[] = [
  {
    date: "July 18, 2026", isoDate: "2026-07-18", round: "Quarterfinals", games: [
      { time: "8:00 AM",  home: "Seed 2",           away: "Seed 7",                  location: LOCATION },
      { time: "10:30 AM", home: "Seed 3",           away: "Seed 6",                  location: LOCATION },
      { time: "1:00 PM",  home: "Seed 4",           away: "Seed 5",                  location: LOCATION },
    ],
  },
  {
    date: "July 19, 2026", isoDate: "2026-07-19", round: "Semifinals", games: [
      { time: "10:30 AM", home: "Seed 1",           away: "Lowest Remaining Seed",   location: LOCATION },
      { time: "1:00 PM",  home: "Remaining Winner", away: "Remaining Winner",         location: LOCATION },
    ],
  },
  {
    date: "July 25, 2026", isoDate: "2026-07-25", round: "Championship", games: [
      { time: "10:00 AM", home: "Winner SF1",       away: "Winner SF2",              location: LOCATION },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SchedulePage() {
  const today = new Date().toISOString().split("T")[0];
  const totalGames = REGULAR_SEASON.reduce((acc, d) => acc + d.games.length, 0);
  const upcomingDays = REGULAR_SEASON.filter((d) => d.isoDate >= today);
  const pastDays = REGULAR_SEASON.filter((d) => d.isoDate < today);

  return (
    <div className="pt-24 pb-24">
      <section className="py-16" aria-labelledby="schedule-heading">
        <div className="section-container max-w-4xl">

          {/* ── Header ── */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="badge badge-crimson mb-4" aria-hidden="true">Season 1 · 2026</span>
              <h1
                id="schedule-heading"
                className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl"
                style={{ color: "var(--slate-50)" }}
              >
                <span className="gradient-text">Match</span> Schedule
              </h1>
              <p className="text-base mt-3 max-w-lg" style={{ color: "var(--slate-500)" }}>
                {totalGames} regular season games across {REGULAR_SEASON.length} game days · All matches 2 hours
              </p>
            </div>
            <div className="flex flex-col gap-1.5 text-sm shrink-0" style={{ color: "var(--slate-500)" }}>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-crimson-400" />
                <span>Oasis International School</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-crimson-400" />
                <span>May – July 2026</span>
              </div>
            </div>
          </div>

          {/* ── Quick Stats ── */}
          <div className="grid grid-cols-3 gap-4 mb-14">
            {[
              { label: "Regular Season Games", value: totalGames },
              { label: "Upcoming Game Days",   value: upcomingDays.length },
              { label: "Teams",                value: 7 },
            ].map(({ label, value }) => (
              <div key={label} className="glass-card p-4 text-center">
                <p className="text-2xl sm:text-3xl font-heading font-black text-white">{value}</p>
                <p className="text-[11px] uppercase tracking-wider mt-1" style={{ color: "var(--slate-500)" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* ── Regular Season ── */}
          <ScheduleClient
            upcomingDays={upcomingDays}
            pastDays={pastDays}
            playoffs={PLAYOFFS}
          />

        </div>
      </section>
    </div>
  );
}
