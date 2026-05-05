"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";

// Data from the provided image
const STANDINGS_DATA = [
  {
    rank: 1,
    team: "Guardians",
    logo: "/images/guardians.png",
    w: 1,
    l: 0,
    t: 0,
    pct: "1.000",
    gb: "-",
    rs: 18,
    ra: 1,
    diff: 17,
    strk: "W1",
    home: "1-0",
    away: "0-0",
  },
  {
    rank: 2,
    team: "KL DRAGONS",
    logo: "/images/kl_dragons.png",
    w: 1,
    l: 0,
    t: 0,
    pct: "1.000",
    gb: "-",
    rs: 8,
    ra: 5,
    diff: 3,
    strk: "W1",
    home: "0-0",
    away: "1-0",
  },
  {
    rank: 3,
    team: "Sunway Cubs",
    logo: "/images/sunway_cubs.png", // Fallback if logo not present
    w: 1,
    l: 0,
    t: 0,
    pct: "1.000",
    gb: "-",
    rs: 12,
    ra: 9,
    diff: 3,
    strk: "W1",
    home: "0-0",
    away: "1-0",
  },
  {
    rank: 4,
    team: "PENDEKAR BESBOL TEAM",
    logo: "/images/pendekar.png",
    w: 0,
    l: 0,
    t: 0,
    pct: "0.000",
    gb: "0.5",
    rs: 0,
    ra: 0,
    diff: 0,
    strk: "W0",
    home: "0-0",
    away: "0-0",
  },
  {
    rank: 5,
    team: "Raiders Baseball Club",
    logo: "/images/raiders.png",
    w: 0,
    l: 1,
    t: 0,
    pct: "0.000",
    gb: "1.0",
    rs: 5,
    ra: 8,
    diff: -3,
    strk: "L1",
    home: "0-1",
    away: "0-0",
  },
  {
    rank: 6,
    team: "Urgentz",
    logo: "/images/urgentz.png",
    w: 0,
    l: 1,
    t: 0,
    pct: "0.000",
    gb: "1.0",
    rs: 9,
    ra: 12,
    diff: -3,
    strk: "L1",
    home: "0-1",
    away: "0-0",
  },
  {
    rank: 7,
    team: "Klang Ravens",
    logo: "/images/klang_ravens.png",
    w: 0,
    l: 1,
    t: 0,
    pct: "0.000",
    gb: "1.0",
    rs: 1,
    ra: 18,
    diff: -17,
    strk: "L1",
    home: "0-0",
    away: "0-1",
  },
];

export function LeagueStandingsTable() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden border" style={{ borderColor: "var(--glass-border)" }}>
      {/* Header */}
      <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: "var(--glass-border)", background: "rgba(2,11,24,0.4)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(227,27,35,0.1)", border: "1px solid rgba(227,27,35,0.2)" }}>
            <Trophy size={18} style={{ color: "var(--crimson-400)" }} />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl" style={{ color: "var(--slate-50)" }}>Official Standings</h2>
            <p className="text-xs font-medium" style={{ color: "var(--slate-400)" }}>Season 1 • Updated Live</p>
          </div>
        </div>
      </div>

      {/* Table container for horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="text-xs uppercase tracking-wider font-semibold border-b" style={{ borderColor: "var(--glass-border)", background: "rgba(255,255,255,0.02)", color: "var(--slate-400)" }}>
              <th className="px-6 py-4 font-medium">Team</th>
              <th className="px-4 py-4 font-medium text-center">W</th>
              <th className="px-4 py-4 font-medium text-center">L</th>
              <th className="px-4 py-4 font-medium text-center">T</th>
              <th className="px-4 py-4 font-medium text-center">PCT</th>
              <th className="px-4 py-4 font-medium text-center text-crimson-400">GB</th>
              <th className="px-4 py-4 font-medium text-center">RS</th>
              <th className="px-4 py-4 font-medium text-center">RA</th>
              <th className="px-4 py-4 font-medium text-center">DIFF</th>
              <th className="px-4 py-4 font-medium text-center">STRK</th>
              <th className="px-4 py-4 font-medium text-center">HOME</th>
              <th className="px-4 py-4 font-medium text-center">AWAY</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--glass-border)" }}>
            {STANDINGS_DATA.map((row, index) => (
              <tr 
                key={row.team} 
                className="transition-colors hover:bg-white/[0.02]"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold w-4 text-center" style={{ color: "var(--slate-500)" }}>
                      {index + 1}
                    </span>
                    {/* Fake avatar fallback if logo is missing */}
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                      <Image 
                        src={row.logo} 
                        alt={row.team}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // Fallback to initial if image not found
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `<span class="text-[10px] font-bold text-slate-400">${row.team.substring(0,2).toUpperCase()}</span>`;
                        }}
                      />
                    </div>
                    <span className="font-semibold text-sm whitespace-nowrap" style={{ color: "var(--slate-100)" }}>
                      {row.team}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center text-sm font-semibold" style={{ color: "var(--slate-200)" }}>{row.w}</td>
                <td className="px-4 py-4 text-center text-sm font-semibold" style={{ color: "var(--slate-200)" }}>{row.l}</td>
                <td className="px-4 py-4 text-center text-sm font-semibold" style={{ color: "var(--slate-400)" }}>{row.t}</td>
                <td className="px-4 py-4 text-center text-sm font-medium tabular-nums" style={{ color: "var(--slate-300)" }}>{row.pct}</td>
                <td className="px-4 py-4 text-center text-sm font-bold tabular-nums" style={{ color: "var(--crimson-400)" }}>{row.gb}</td>
                <td className="px-4 py-4 text-center text-sm" style={{ color: "var(--slate-300)" }}>{row.rs}</td>
                <td className="px-4 py-4 text-center text-sm" style={{ color: "var(--slate-300)" }}>{row.ra}</td>
                <td className="px-4 py-4 text-center text-sm font-semibold" style={{ color: row.diff > 0 ? "#4ade80" : row.diff < 0 ? "#f87171" : "var(--slate-400)" }}>
                  {row.diff > 0 ? `+${row.diff}` : row.diff}
                </td>
                <td className="px-4 py-4 text-center text-sm font-medium" style={{ color: row.strk.startsWith('W') && row.strk !== 'W0' ? "#4ade80" : row.strk.startsWith('L') ? "#f87171" : "var(--slate-400)" }}>
                  {row.strk}
                </td>
                <td className="px-4 py-4 text-center text-sm font-medium tabular-nums" style={{ color: "var(--slate-400)" }}>{row.home}</td>
                <td className="px-4 py-4 text-center text-sm font-medium tabular-nums" style={{ color: "var(--slate-400)" }}>{row.away}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
