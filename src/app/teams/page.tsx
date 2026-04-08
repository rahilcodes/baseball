import type { Metadata } from "next";
import { getTeams, MOCK_TEAMS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Teams — BPL Season 1",
  description: "All teams competing in the Baseball Premier League Season 1. View rosters, managers, and team details.",
};

export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <div className="pt-24">
      <section className="py-16" aria-labelledby="teams-heading">
        <div className="section-container">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className="glass-card glass-card-hover p-7 flex flex-col"
              >
                {/* Team colours */}
                <div className="flex items-center gap-2 mb-4" aria-label={`Uniform: ${team.colors.home} home, ${team.colors.away} away`}>
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white/20"
                    style={{ background: team.colors.home.toLowerCase() === "navy" ? "#0A192F" : team.colors.home.toLowerCase() }}
                    title={`Home: ${team.colors.home}`}
                  />
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white/10"
                    style={{ background: team.colors.away.toLowerCase() === "white" ? "#F8FAFC" : team.colors.away.toLowerCase() }}
                    title={`Away: ${team.colors.away}`}
                  />
                  <span className="text-xs ml-auto" style={{ color: "var(--slate-500)" }}>
                    {team.colors.home} / {team.colors.away}
                  </span>
                </div>

                <span
                  className="font-heading font-bold text-4xl mb-1"
                  style={{ color: "var(--slate-600)" }}
                  aria-hidden="true"
                >
                  {team.shortCode}
                </span>
                <h2
                  className="font-heading font-bold text-xl sm:text-2xl mb-1"
                  style={{ color: "var(--slate-50)" }}
                >
                  {team.name}
                </h2>
                <p className="text-sm mb-4" style={{ color: "var(--slate-500)" }}>
                  Manager: {team.manager}
                </p>

                <div className="flex gap-4 mt-auto pt-4 border-t" style={{ borderColor: "var(--glass-border)" }}>
                  <div className="flex flex-col items-center">
                    <span className="font-heading font-bold text-xl" style={{ color: "var(--slate-50)" }}>
                      {team.playerCount}
                    </span>
                    <span className="text-xs" style={{ color: "var(--slate-500)" }}>Players</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-heading font-bold text-xl" style={{ color: "var(--slate-50)" }}>
                      {team.wins}
                    </span>
                    <span className="text-xs" style={{ color: "var(--slate-500)" }}>Wins</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-heading font-bold text-xl" style={{ color: "var(--slate-50)" }}>
                      {team.losses}
                    </span>
                    <span className="text-xs" style={{ color: "var(--slate-500)" }}>Losses</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Season note */}
          <div className="glass-card p-6 mt-12 text-center">
            <p className="text-sm" style={{ color: "var(--slate-500)" }}>
              Season 1 has not started yet. Team records will be updated live after each match day.
              Season begins <span style={{ color: "var(--crimson-400)" }}>May 4, 2026</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
