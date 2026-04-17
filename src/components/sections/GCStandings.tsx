"use client";

import { ExternalLink } from "lucide-react";

const GC_ORG_URL = "https://web.gc.com/organizations/SrKbLlcTiUc1";

export function GCStandings() {
  return (
    <div className="space-y-6">
      {/* Iframe embed */}
      <div
        className="glass-card overflow-hidden rounded-2xl"
        style={{ minHeight: 500 }}
      >
        <iframe
          src={`${GC_ORG_URL}/standings`}
          title="BPL Season 1 live standings via GameChanger"
          width="100%"
          height="600"
          style={{
            border: "none",
            display: "block",
            background: "transparent",
            minHeight: 500,
          }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>

      {/* Footer link */}
      <div className="glass-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: "var(--slate-500)" }}>
          Standings update automatically after every match day. Season begins{" "}
          <span style={{ color: "var(--crimson-400)" }}>May 4, 2026</span>.
        </p>
        <a
          href={`${GC_ORG_URL}/standings`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest shrink-0 transition-opacity hover:opacity-70"
          style={{ color: "var(--crimson-400)" }}
        >
          <ExternalLink size={13} />
          Open Full Standings
        </a>
      </div>
    </div>
  );
}
