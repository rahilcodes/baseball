"use client";

import { useState } from "react";
import { MapPin, Clock, Calendar, Trophy, Swords, ChevronDown, ChevronUp } from "lucide-react";

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

function GameDayCard({ day, weekNum, dimmed }: { day: GameDay; weekNum?: number; dimmed?: boolean }) {
  const today = new Date().toISOString().split("T")[0];
  const isToday = day.isoDate === today;
  const isPast = day.isoDate < today;

  return (
    <div className={`relative ${dimmed ? "opacity-50" : ""}`}>
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 ${isToday ? "bg-crimson-500 shadow-[0_0_20px_rgba(227,27,35,0.5)]" : "bg-white/[0.05]"}`}
          >
            <Calendar size={16} className={isToday ? "text-white" : "text-slate-400"} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
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
  const isChampionship = day.round === "Championship";

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
  upcomingDays: GameDay[];
  pastDays: GameDay[];
  playoffs: PlayoffDay[];
}

export function ScheduleClient({ upcomingDays, pastDays, playoffs }: ScheduleClientProps) {
  const [showPast, setShowPast] = useState(false);

  // Calculate week numbers relative to full season
  const totalUpcoming = upcomingDays.length;
  const totalPast = pastDays.length;
  const startWeekNum = totalPast + 1; // upcoming weeks start after past weeks

  return (
    <>
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

        {/* Past Games Toggle */}
        {totalPast > 0 && (
          <div className="mb-6">
            <button
              onClick={() => setShowPast(!showPast)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/[0.05] border border-white/[0.06]"
              style={{ color: "var(--slate-400)" }}
            >
              {showPast ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {showPast ? "Hide" : "Show"} {totalPast} completed game {totalPast === 1 ? "day" : "days"}
            </button>

            {showPast && (
              <div className="mt-4 flex flex-col gap-8 border-l-2 border-white/[0.06] pl-4">
                {pastDays.map((day, i) => (
                  <GameDayCard key={day.isoDate} day={day} weekNum={i + 1} dimmed />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Upcoming Games */}
        {upcomingDays.length > 0 ? (
          <div className="flex flex-col gap-8">
            {upcomingDays.map((day, i) => (
              <GameDayCard key={day.isoDate} day={day} weekNum={startWeekNum + i} />
            ))}
          </div>
        ) : (
          <div
            className="glass-card p-8 text-center border"
            style={{ borderColor: "rgba(227,27,35,0.15)", background: "rgba(227,27,35,0.03)" }}
          >
            <Trophy size={32} className="text-yellow-400 mx-auto mb-3" />
            <p className="font-heading font-bold text-lg text-white mb-1">Regular Season Complete!</p>
            <p className="text-sm" style={{ color: "var(--slate-400)" }}>
              All regular season games have been played. Check the standings to see who made the playoffs.
            </p>
          </div>
        )}
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
            <span className="font-bold text-yellow-400">Seedings TBD</span> — Playoff brackets will be confirmed
            after the final regular season game day on July 11, 2026. Positions are based on final standings.
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
