import type { Metadata } from "next";
import { getStandings, getTeams } from "@/lib/data";

export const metadata: Metadata = {
  title: "Standings — BPL Season 1",
  description: "Live BPL Season 1 standings. Win/Loss records, run differentials, and league rankings updated after every game day.",
};

export default async function StandingsPage() {
  const [standings, teams] = await Promise.all([getStandings(), getTeams()]);
  const teamMap = Object.fromEntries(teams.map((t) => [t.id, t]));

  return (
    <div className="pt-24">
      <section className="py-16" aria-labelledby="standings-heading">
        <div className="section-container">
          <div className="mb-12">
            <span className="badge badge-navy mb-4" aria-hidden="true">Live Standings</span>
            <h1
              id="standings-heading"
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl"
              style={{ color: "var(--slate-50)" }}
            >
              <span className="gradient-text">Standings</span>
            </h1>
            <p className="text-base mt-3" style={{ color: "var(--slate-500)" }}>
              Season 1 — Updated after each match day.
            </p>
          </div>

          {/* Table */}
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto scrollbar-none">
              <table className="w-full" aria-label="League standings table">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.02)" }}>
                    {["#", "Team", "GP", "W", "L", "T", "Win%", "RS", "RA", "+/-"].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-left first:pl-6 last:pr-6"
                        style={{ color: "var(--slate-500)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {standings.map((s, i) => {
                    const team = teamMap[s.teamId];
                    const isTop = i === 0;
                    return (
                      <tr
                        key={s.teamId}
                        style={{
                          borderBottom: "1px solid var(--glass-border)",
                          background: isTop ? "rgba(227,27,35,0.04)" : undefined,
                        }}
                      >
                        <td className="px-4 py-4 pl-6">
                          <span
                            className="font-heading font-bold text-base"
                            style={{ color: isTop ? "var(--crimson-400)" : "var(--slate-500)" }}
                          >
                            {i + 1}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-heading font-semibold text-sm" style={{ color: "var(--slate-50)" }}>
                              {team?.name ?? "—"}
                            </p>
                            <p className="text-xs" style={{ color: "var(--slate-600)" }}>
                              {team?.shortCode}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm tabular-nums" style={{ color: "var(--slate-400)" }}>{s.gamesPlayed}</td>
                        <td className="px-4 py-4 text-sm font-semibold tabular-nums" style={{ color: "var(--slate-200)" }}>{s.wins}</td>
                        <td className="px-4 py-4 text-sm tabular-nums" style={{ color: "var(--slate-400)" }}>{s.losses}</td>
                        <td className="px-4 py-4 text-sm tabular-nums" style={{ color: "var(--slate-500)" }}>{s.ties}</td>
                        <td className="px-4 py-4 text-sm tabular-nums" style={{ color: "var(--slate-300)" }}>
                          {s.gamesPlayed === 0 ? "—" : `${(s.winPercentage * 100).toFixed(1)}%`}
                        </td>
                        <td className="px-4 py-4 text-sm tabular-nums" style={{ color: "var(--slate-400)" }}>{s.runsScored}</td>
                        <td className="px-4 py-4 text-sm tabular-nums" style={{ color: "var(--slate-400)" }}>{s.runsAllowed}</td>
                        <td className="px-4 py-4 pr-6 text-sm font-semibold tabular-nums" style={{
                          color: s.runDifferential > 0 ? "#22C55E" : s.runDifferential < 0 ? "var(--crimson-400)" : "var(--slate-500)"
                        }}>
                          {s.runDifferential > 0 ? `+${s.runDifferential}` : s.runDifferential === 0 ? "0" : s.runDifferential}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card p-5 mt-6 text-center">
            <p className="text-sm" style={{ color: "var(--slate-500)" }}>
              Season begins <span style={{ color: "var(--crimson-400)" }}>May 4, 2026</span>. 
              Standings will update in real time after every match day.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
