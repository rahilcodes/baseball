import type { Metadata } from "next";
import { LeagueStandingsTable } from "@/components/sections/LeagueStandingsTable";
import { ExternalLink, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Standings — BPL Season 1",
  description: "Live BPL Season 1 standings. Win/Loss records, run differentials, and league rankings updated after every game day.",
};

export default function StandingsPage() {
  return (
    <div className="pt-24">
      <section className="py-16" aria-labelledby="standings-heading">
        <div className="section-container">
          <div className="mb-12">
            <span className="badge badge-crimson mb-4" aria-hidden="true">
              Live via GameChanger
            </span>
            <h1
              id="standings-heading"
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl"
              style={{ color: "var(--slate-50)" }}
            >
              <span className="gradient-text">Standings</span>
            </h1>
            <p className="text-base mt-3" style={{ color: "var(--slate-500)" }}>
              Season 1 — Updated automatically after each match day.
            </p>
          </div>

          <LeagueStandingsTable />

          <div className="mt-12 flex justify-center">
            <a
              href="https://web.gc.com/organizations/SrKbLlcTiUc1/standings"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-heading font-bold text-white text-base transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, rgba(227,27,35,0.8) 0%, rgba(183,28,28,0.9) 100%)",
                boxShadow: "0 8px 24px rgba(227,27,35,0.25)",
              }}
            >
              <Trophy size={18} />
              View on GameChanger
              <ExternalLink size={16} className="ml-1 opacity-70" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
