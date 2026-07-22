"use client";

import { MapPin, Clock, Trophy, Swords } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Game = {
  time: string;
  home: string;
  away: string;
  location: string;
};

type GameDay = {
  date: string;
  isoDate: string;
  games: Game[];
};

type PlayoffDay = GameDay & { round: string };

// ─── Team colours ─────────────────────────────────────────────────────────────
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
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

// ─── Sub-components ───────────────────────────────────────────────────────────
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
      className="glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 border border-white/[0.04] hover:border-white/10 transition-all duration-300"
      style={{ background: "rgba(255,255,255,0.015)" }}
    >
      <div className="flex items-center gap-1.5 shrink-0 min-w-[80px]">
        <Clock size={12} className="text-crimson-400" />
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--slate-400)" }}>
          {game.time}
        </span>
      </div>
      <div className="w-px h-8 bg-white/[0.06] hidden sm:block" />
      <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <TeamPill name={game.home} side="home" />
        <div className="flex flex-col items-center gap-0.5">
          <Swords size={14} className="opacity-30" />
          <span className="text-[9px] font-black uppercase tracking-widest opacity-30">vs</span>
        </div>
        <TeamPill name={game.away} side="away" />
      </div>
      <div className="w-px h-8 bg-white/[0.06] hidden sm:block" />
      <div className="flex items-center gap-1.5 shrink-0">
        <MapPin size={12} className="text-slate-500" />
        <span className="text-[11px]" style={{ color: "var(--slate-500)" }}>{game.location}</span>
      </div>
    </div>
  );
}

function PlayoffDayCard({ day }: { day: PlayoffDay }) {
  const today = new Date().toISOString().split("T")[0];
  const isToday = day.isoDate === today;
  const isChampionship = day.round.toLowerCase().includes("championship");

  return (
    <div className="relative">
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

// ─── Main Client Component ────────────────────────────────────────────────────
interface ScheduleClientProps {
  upcomingDays?: GameDay[];
  pastDays?: GameDay[];
  playoffs: PlayoffDay[];
}

export function ScheduleClient({ playoffs }: ScheduleClientProps) {
  return (
    <>
      {/* ── Playoffs / Finals ── */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
            <Trophy size={14} className="text-yellow-400" />
          </div>
          <h2 className="font-heading font-bold text-2xl" style={{ color: "var(--slate-100)" }}>
            Season 1 Championship
          </h2>
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">
            Saturday, July 25, 2026
          </span>
        </div>

        <div
          className="glass-card p-6 mb-8 border"
          style={{ borderColor: "rgba(234,179,8,0.2)", background: "linear-gradient(135deg, rgba(234,179,8,0.06) 0%, rgba(2,11,24,0.8) 100%)" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Trophy size={18} className="text-yellow-400" />
            <span className="font-heading font-bold text-base text-white">Championship Finalists Confirmed</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--slate-300)" }}>
            All regular season and preliminary playoff matches have concluded. The top two teams, <strong className="text-white">PENDEKAR BESBOL TEAM</strong> and <strong className="text-white">Raiders Baseball Club</strong>, advance to the final championship match on Saturday, July 25, 2026.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {playoffs.map((day) => (
            <PlayoffDayCard key={day.isoDate} day={day} />
          ))}
        </div>
      </div>
    </>
  );
}
