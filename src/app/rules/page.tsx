import type { Metadata } from "next";
import { RulesEngine } from "@/components/sections/RulesEngine";

export const metadata: Metadata = {
  title: "League Rules — BPL Season 1",
  description: "Official BPL Season 1 rules. WBSC-standard rules with league-specific modifications. Search rules by topic, rule number, or keyword.",
};

export default function RulesPage() {
  return (
    <div className="pt-24">
      <section className="py-16" aria-labelledby="rules-heading">
        <div className="section-container">
          <div className="max-w-2xl mb-12">
            <span className="badge badge-navy mb-4" aria-hidden="true">WBSC 2025–2026 Edition</span>
            <h1
              id="rules-heading"
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl mb-4"
              style={{ color: "var(--slate-50)" }}
            >
              League{" "}
              <span className="gradient-text">Rules</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--slate-400)" }}>
              All BPL games are governed by the WBSC Official Rules of Baseball (2025–2026 edition) 
              with the following league-specific modifications. Use the search to find any rule instantly.
            </p>
          </div>
          <RulesEngine />
        </div>
      </section>
    </div>
  );
}
