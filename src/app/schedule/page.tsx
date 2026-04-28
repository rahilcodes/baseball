import type { Metadata } from "next";
import { MapPin, Clock, Calendar, Trophy, Swords } from "lucide-react";

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

// ─── Team colour accent map ───────────────────────────────────────────────────
const TEAM_COLORS: Record<string, string> = {
  "Raiders Baseball Club": "#E3A020",
  "KL DRAGONS":            "#e34020",
  "Urgentz":               "#a020e3",
  "Sunway Cubs":           "#20a0e3",
  "Guardians":             "#20e360",
  "Klang Ravens":          "#e32070",
  "PENDEKAR BESBOL TEAM":  "#e38020",
};

function teamColor(name: string) {
  return TEAM_COLORS[name] ?? "#6b7280";
}

function teamInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function TeamPill({ name, side }: { name: string; side: "home" | "away" }) {
  const color = teamColor(name);
  const initials = teamInitials(name);
  return (
    <div className={`flex items-center gap-2 ${side === "away" ? "flex-row-reverse" : ""}`}>
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${color}33, ${color}11)`,
          border: `1.5px solid ${color}55`,
          color: color,
        }}
      >
        {initials}
      </div>
      <span
        className={`text-[13px] font-bold leading-tight ${side === "away" ? "text-right" : "text-left"}`}
        style={{ color: "var(--slate-100)" }}
      >
        {name}
      </span>
    </div>
  );
}

function GameCard({ game }: { game: Game }) {
  return (
    <div
      className="glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 border border-white/[0.04] hover:border-white/10 transition-all duration-300 group"
      style={{ background: "rgba(255,255,255,0.015)" }}
    >
      {/* Time */}
      <div className="flex items-center gap-1.5 shrink-0 min-w-[80px]">
        <Clock size={12} className="text-crimson-400" />
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--slate-400)" }}>
          {game.time}
        </span>
      </div>

      <div className="w-px h-8 bg-white/[0.06] hidden sm:block" />

      {/* Teams */}
      <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <TeamPill name={game.home} side="home" />
        <div className="flex flex-col items-center gap-0.5">
          <Swords size={14} className="opacity-30" />
          <span className="text-[9px] font-black uppercase tracking-widest opacity-30">vs</span>
        </div>
        <TeamPill name={game.away} side="away" />
      </div>

      <div className="w-px h-8 bg-white/[0.06] hidden sm:block" />

      {/* Location */}
      <div className="flex items-center gap-1.5 shrink-0">
        <MapPin size={12} className="text-slate-500" />
        <span className="text-[11px]" style={{ color: "var(--slate-500)" }}>
          {game.location}
        </span>
      </div>
    </div>
  );
}

function GameDayCard({ day, weekNum }: { day: GameDay; weekNum?: number }) {
  const today = new Date().toISOString().split("T")[0];
  const isToday = day.isoDate === today;
  const isPast  = day.isoDate < today;

  return (
    <div className={`relative ${isPast ? "opacity-60" : ""}`}>
      {/* Date Header */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 ${isToday ? "bg-crimson-500 shadow-[0_0_20px_rgba(227,27,35,0.5)]" : "bg-white/[0.05]"}`}
          >
            <Calendar size={16} className={isToday ? "text-white" : "text-slate-400"} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-base" style={{ color: "var(--slate-100)" }}>
                {day.date}
              </span>
              {weekNum !== undefined && (
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-500">
                  Week {weekNum}
                </span>
              )}
              {isToday && (
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-crimson-500/20 text-crimson-400 border border-crimson-500/30">
                  Today
                </span>
              )}
              {isPast && (
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-600">
                  Completed
                </span>
              )}
            </div>
            <p className="text-xs mt-0.5" style={{ color: "var(--slate-600)" }}>
              {day.games.length} {day.games.length === 1 ? "game" : "games"} · 2 hrs each
            </p>
          </div>
        </div>
      </div>

      {/* Games */}
      <div className="flex flex-col gap-2 pl-0 sm:pl-14">
        {day.games.map((g, i) => (
          <GameCard key={i} game={g} />
        ))}
      </div>
    </div>
  );
}

function PlayoffDayCard({ day }: { day: PlayoffDay }) {
  const today = new Date().toISOString().split("T")[0];
  const isToday = day.isoDate === today;
  const isPast  = day.isoDate < today;

  const isChampionship = day.round === "Championship";

  return (
    <div className={`relative ${isPast ? "opacity-60" : ""}`}>
      <div className="flex items-center gap-4 mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 ${isChampionship ? "bg-gradient-to-br from-yellow-500/30 to-yellow-600/10 border border-yellow-500/30" : "bg-white/[0.05]"}`}
        >
          <Trophy size={16} className={isChampionship ? "text-yellow-400" : "text-slate-400"} />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-heading font-bold text-base" style={{ color: "var(--slate-100)" }}>
              {day.date}
            </span>
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                isChampionship
                  ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                  : "bg-white/[0.06] text-slate-400 border-white/10"
              }`}
            >
              {day.round}
            </span>
            {isToday && (
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-crimson-500/20 text-crimson-400 border border-crimson-500/30">
                Today
              </span>
            )}
          </div>
          <p className="text-xs mt-0.5" style={{ color: "var(--slate-600)" }}>
            {day.games.length} {day.games.length === 1 ? "game" : "games"} · 2 hrs each
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 pl-0 sm:pl-14">
        {day.games.map((g, i) => (
          <GameCard key={i} game={g} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SchedulePage() {
  const totalGames = REGULAR_SEASON.reduce((acc, d) => acc + d.games.length, 0);

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
              { label: "Game Days",            value: REGULAR_SEASON.length },
              { label: "Teams",                value: 7 },
            ].map(({ label, value }) => (
              <div key={label} className="glass-card p-4 text-center">
                <p className="text-2xl sm:text-3xl font-heading font-black text-white">{value}</p>
                <p className="text-[11px] uppercase tracking-wider mt-1" style={{ color: "var(--slate-500)" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* ── Regular Season ── */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-crimson-500/10 border border-crimson-500/20 flex items-center justify-center">
                <Swords size={14} className="text-crimson-400" />
              </div>
              <h2 className="font-heading font-bold text-2xl" style={{ color: "var(--slate-100)" }}>
                Regular Season
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--slate-600)" }}>
                May 3 – July 11
              </span>
            </div>

            <div className="flex flex-col gap-8">
              {REGULAR_SEASON.map((day, i) => (
                <GameDayCard key={day.isoDate} day={day} weekNum={i + 1} />
              ))}
            </div>
          </div>

          {/* ── Playoffs ── */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                <Trophy size={14} className="text-yellow-400" />
              </div>
              <h2 className="font-heading font-bold text-2xl" style={{ color: "var(--slate-100)" }}>
                Playoffs
              </h2>
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--slate-600)" }}>
                July 18 – 25
              </span>
            </div>

            <div
              className="glass-card p-6 mb-8 border"
              style={{ borderColor: "rgba(234,179,8,0.15)", background: "rgba(234,179,8,0.03)" }}
            >
              <p className="text-sm" style={{ color: "var(--slate-400)" }}>
                <span className="font-bold text-yellow-400">Seedings TBD</span> — Playoff brackets will be confirmed after the final regular season game day on July 11, 2026. Positions are based on final standings.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {PLAYOFFS.map((day) => (
                <PlayoffDayCard key={day.isoDate} day={day} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
