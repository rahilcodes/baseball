import type { Metadata } from "next";
import { Shield, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Players — BPL Season 1",
  description: "Meet the players of the Baseball Premier League Season 1. Position breakdowns, experience levels, and draft profiles.",
};

// Placeholder roster — will be replaced with live data from Google Sheets/CMS
const PLACEHOLDER_PLAYERS = [
  { name: "Ahmad Faiz", team: "Selangor Sluggers", position: "P", nationality: "Malaysian", level: "Advanced", jersey: 1 },
  { name: "Tanaka Hiroshi", team: "KL Strikers", position: "C", nationality: "Japanese", level: "Advanced", jersey: 7 },
  { name: "David Park", team: "Putrajaya Panthers", position: "SS", nationality: "Korean", level: "Intermediate", jersey: 11 },
  { name: "Lee Wei Jian", team: "PJ Pioneers", position: "1B", nationality: "Malaysian", level: "Intermediate", jersey: 24 },
  { name: "Sanjay Rajan", team: "Shah Alam Storm", position: "CF", nationality: "Malaysian", level: "Beginner", jersey: 3 },
  { name: "Marcus Chen", team: "Klang Valley Kings", position: "3B", nationality: "Malaysian", level: "Advanced", jersey: 15 },
  { name: "Kenji Watanabe", team: "Selangor Sluggers", position: "2B", nationality: "Japanese", level: "Intermediate", jersey: 9 },
  { name: "Park Joon-ho", team: "KL Strikers", position: "RF", nationality: "Korean", level: "Intermediate", jersey: 22 },
  { name: "Raj Kumar", team: "Shah Alam Storm", position: "LF", nationality: "Malaysian", level: "Beginner", jersey: 18 },
  { name: "Chris Thompson", team: "Putrajaya Panthers", position: "DH", nationality: "American", level: "Advanced", jersey: 45 },
  { name: "Hafiz Mohd", team: "PJ Pioneers", position: "P", nationality: "Malaysian", level: "Intermediate", jersey: 32 },
  { name: "Nakamura Yuki", team: "Klang Valley Kings", position: "C", nationality: "Japanese", level: "Advanced", jersey: 2 },
];

const LEVEL_COLORS = {
  Advanced: { bg: "rgba(227,27,35,0.1)", color: "var(--crimson-400)", border: "rgba(227,27,35,0.2)" },
  Intermediate: { bg: "rgba(245,166,35,0.08)", color: "var(--gold-400)", border: "rgba(245,166,35,0.2)" },
  Beginner: { bg: "rgba(255,255,255,0.05)", color: "var(--slate-400)", border: "var(--glass-border)" },
};

const POSITION_LABELS: Record<string, string> = {
  P: "Pitcher", C: "Catcher", "1B": "First Base", "2B": "Second Base",
  SS: "Shortstop", "3B": "Third Base", LF: "Left Field", CF: "Center Field",
  RF: "Right Field", DH: "Designated Hitter",
};

export default function PlayersPage() {
  const positionGroups = PLACEHOLDER_PLAYERS.reduce<Record<string, typeof PLACEHOLDER_PLAYERS>>((acc, p) => {
    const group = ["P"].includes(p.position) ? "Pitchers" : ["C"].includes(p.position) ? "Catchers" : ["1B", "2B", "SS", "3B"].includes(p.position) ? "Infield" : ["LF", "CF", "RF"].includes(p.position) ? "Outfield" : "Designated Hitter";
    if (!acc[group]) acc[group] = [];
    acc[group].push(p);
    return acc;
  }, {});

  return (
    <div className="pt-24">
      <section className="py-16" aria-labelledby="players-heading">
        <div className="section-container">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="badge badge-navy mb-4" aria-hidden="true">Season 1 Roster</span>
              <h1
                id="players-heading"
                className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl"
                style={{ color: "var(--slate-50)" }}
              >
                The{" "}
                <span className="gradient-text">Players</span>
              </h1>
            </div>
            <p className="text-sm" style={{ color: "var(--slate-500)" }}>
              {PLACEHOLDER_PLAYERS.length} registered · Full roster updates after Draft Day
            </p>
          </div>

          {/* Position groups */}
          {Object.entries(positionGroups).map(([group, players]) => (
            <div key={group} className="mb-14">
              <h2
                className="font-heading font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-3"
                style={{ color: "var(--slate-500)" }}
              >
                {group}
                <span className="h-px flex-1" style={{ background: "var(--glass-border)" }} aria-hidden="true" />
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {players.map((player) => {
                  const lvl = LEVEL_COLORS[player.level as keyof typeof LEVEL_COLORS];
                  return (
                    <div
                      key={`${player.name}-${player.jersey}`}
                      className="glass-card glass-card-hover p-5 flex items-start gap-4"
                    >
                      {/* Jersey number */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-heading font-bold text-lg"
                        style={{ background: "rgba(255,255,255,0.04)", color: "var(--slate-500)", border: "1px solid var(--glass-border)" }}
                        aria-label={`Jersey number ${player.jersey}`}
                      >
                        #{player.jersey}
                      </div>
                      {/* Info */}
                      <div className="min-w-0">
                        <h3
                          className="font-heading font-semibold text-base truncate mb-0.5"
                          style={{ color: "var(--slate-50)" }}
                        >
                          {player.name}
                        </h3>
                        <p className="text-xs mb-2 truncate" style={{ color: "var(--slate-500)" }}>
                          {player.team}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {/* Position */}
                          <span
                            className="badge"
                            style={{ background: "rgba(227,27,35,0.08)", color: "var(--crimson-400)", border: "1px solid rgba(227,27,35,0.15)", fontSize: "0.65rem" }}
                            title={POSITION_LABELS[player.position]}
                          >
                            {player.position}
                          </span>
                          {/* Level */}
                          <span
                            className="badge"
                            style={{ background: lvl.bg, color: lvl.color, border: `1px solid ${lvl.border}`, fontSize: "0.65rem" }}
                          >
                            {player.level === "Advanced" && <Star size={8} aria-hidden="true" />}
                            {player.level}
                          </span>
                          {/* Nationality */}
                          <span
                            className="badge badge-navy"
                            style={{ fontSize: "0.65rem" }}
                          >
                            {player.nationality}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Free agent note */}
          <div
            className="glass-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{ border: "1px solid rgba(245,166,35,0.15)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.2)" }}
              aria-hidden="true"
            >
              <Shield size={22} style={{ color: "var(--gold-400)" }} />
            </div>
            <div>
              <p className="font-heading font-semibold text-base mb-1" style={{ color: "var(--slate-50)" }}>
                Free Agent Draft — April 24, 2026
              </p>
              <p className="text-sm" style={{ color: "var(--slate-400)" }}>
                Free agents evaluated on April 19–20 will be placed onto teams via the BPL serpentine draft.
                Full rosters and player profiles update after Draft Day.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
