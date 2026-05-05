import type { Metadata } from "next";
import Image from "next/image";
import { Users, Trophy, ShieldOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Teams — BPL Season 1",
  description: "All teams competing in the Baseball Premier League Season 1. View rosters, managers, and team details.",
};

const TEAMS = [
  {
    id: "urgentz",
    name: "URGENTZ",
    manager: "Abu Abbas Azimi Bin Abu Bakar",
    colors: { home: "#FF69B4", away: "#1a1a1a" },
    colorLabel: "Pink / Black",
    logo: "/images/team_logos/urgents.png",
    playerCount: 26,
    wins: 0,
    losses: 1,
  },
  {
    id: "sunway",
    name: "Sunway",
    manager: "Kento Yamada",
    colors: { home: "#F8FAFC", away: "#94A3B8" },
    colorLabel: "White / Grey",
    logo: "/images/team_logos/sunway.png",
    playerCount: 25,
    wins: 1,
    losses: 0,
  },
  {
    id: "klang-ravens",
    name: "Klang Ravens",
    manager: "Riley Pitts",
    colors: { home: "#7C3AED", away: "#7C3AED" },
    colorLabel: "Purple / Purple",
    logo: "/images/team_logos/ravens.png",
    playerCount: 21,
    wins: 0,
    losses: 1,
  },
  {
    id: "raiders",
    name: "Raiders Baseball Club",
    manager: "Shinji Konishi",
    colors: { home: "#111827", away: "#F8FAFC" },
    colorLabel: "Black / White",
    logo: "/images/team_logos/raiders.png",
    playerCount: 21,
    wins: 0,
    losses: 1,
  },
  {
    id: "kl-dragons",
    name: "KL Dragons",
    manager: "Thomas Kim",
    colors: { home: "#F8FAFC", away: "#3B82F6" },
    colorLabel: "White / Blue",
    logo: "/images/team_logos/dragons.png",
    playerCount: 19,
    wins: 1,
    losses: 0,
  },
  {
    id: "guardians",
    name: "Guardians",
    manager: "Keita Sadahiro",
    colors: { home: "#DC2626", away: "#9CA3AF" },
    colorLabel: "Red / Gray",
    logo: "/images/team_logos/guardians.png",
    playerCount: 19,
    wins: 1,
    losses: 0,
  },
  {
    id: "pendekar",
    name: "PENDEKAR BESBOL TEAM",
    manager: "TBD",
    colors: { home: "#F8FAFC", away: "#3B82F6" },
    colorLabel: "White / Blue",
    logo: "/images/team_logos/pendekar.png",
    playerCount: 14,
    wins: 0,
    losses: 0,
  },
];

export default function TeamsPage() {
  return (
    <div className="pt-24">
      <section className="py-16" aria-labelledby="teams-heading">
        <div className="section-container">

          {/* Header */}
          <div className="mb-12">
            <span className="badge badge-navy mb-4" aria-hidden="true">Season 1 — 2026</span>
            <h1
              id="teams-heading"
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl"
              style={{ color: "var(--slate-50)" }}
            >
              The{" "}
              <span className="gradient-text">Teams</span>
            </h1>
            <p className="mt-4 text-base" style={{ color: "var(--slate-400)" }}>
              {TEAMS.length} teams · {TEAMS.reduce((s, t) => s + t.playerCount, 0)} players competing in Malaysia&apos;s inaugural baseball league.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAMS.map((team) => (
              <div
                key={team.id}
                className="glass-card glass-card-hover p-7 flex flex-col group"
                role="article"
                aria-label={team.name}
              >
                {/* Logo + Name */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden transition-transform duration-500 group-hover:scale-110">
                    <Image
                      src={team.logo}
                      alt={`${team.name} logo`}
                      width={72}
                      height={72}
                      className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.08)] transition-all duration-500 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2
                      className="font-heading font-bold text-lg sm:text-xl leading-tight"
                      style={{ color: "var(--slate-50)" }}
                    >
                      {team.name}
                    </h2>
                    <p className="text-sm mt-0.5" style={{ color: "var(--slate-500)" }}>
                      Manager: {team.manager}
                    </p>
                  </div>
                </div>

                {/* Uniform colours */}
                <div className="flex items-center gap-2 mb-5" aria-label={`Uniform: ${team.colorLabel}`}>
                  <div
                    className="w-5 h-5 rounded-full border border-white/20"
                    style={{ background: team.colors.home }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-white/10"
                    style={{ background: team.colors.away }}
                  />
                  <span className="text-xs ml-1" style={{ color: "var(--slate-600)" }}>
                    {team.colorLabel}
                  </span>
                </div>

                {/* Stats */}
                <div
                  className="flex gap-6 mt-auto pt-4 border-t"
                  style={{ borderColor: "var(--glass-border)" }}
                >
                  <div className="flex items-center gap-2">
                    <Users size={13} style={{ color: "var(--crimson-400)" }} aria-hidden="true" />
                    <div className="flex flex-col">
                      <span className="font-heading font-bold text-base leading-none" style={{ color: "var(--slate-50)" }}>
                        {team.playerCount}
                      </span>
                      <span className="text-xs mt-0.5" style={{ color: "var(--slate-500)" }}>Players</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy size={13} style={{ color: "var(--gold-400)" }} aria-hidden="true" />
                    <div className="flex flex-col">
                      <span className="font-heading font-bold text-base leading-none" style={{ color: "var(--slate-50)" }}>
                        {team.wins}
                      </span>
                      <span className="text-xs mt-0.5" style={{ color: "var(--slate-500)" }}>Wins</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldOff size={13} style={{ color: "var(--slate-600)" }} aria-hidden="true" />
                    <div className="flex flex-col">
                      <span className="font-heading font-bold text-base leading-none" style={{ color: "var(--slate-50)" }}>
                        {team.losses}
                      </span>
                      <span className="text-xs mt-0.5" style={{ color: "var(--slate-500)" }}>Losses</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Season note */}
          <div className="glass-card p-6 mt-12 text-center">
            <p className="text-sm" style={{ color: "var(--slate-500)" }}>
              Season 1 is now active! Team records are updated live after each match day.
              First pitch was on <span style={{ color: "var(--crimson-400)" }}>May 3, 2026</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
