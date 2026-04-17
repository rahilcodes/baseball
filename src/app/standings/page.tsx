import type { Metadata } from "next";
import { GCStandings } from "@/components/sections/GCStandings";

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

          <GCStandings />
        </div>
      </section>
    </div>
  );
}
