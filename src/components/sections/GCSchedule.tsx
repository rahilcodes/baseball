"use client";

import { ExternalLink } from "lucide-react";

const GC_ORG_URL = "https://web.gc.com/organizations/SrKbLlcTiUc1";

export function GCSchedule() {
  return (
    <div className="space-y-6">
      {/* Iframe embed */}
      <div
        className="glass-card overflow-hidden rounded-2xl"
        style={{ minHeight: 600 }}
      >
        <iframe
          src={`${GC_ORG_URL}/schedule`}
          title="BPL Season 1 live schedule via GameChanger"
          width="100%"
          height="700"
          style={{
            border: "none",
            display: "block",
            background: "transparent",
            minHeight: 600,
          }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>

      {/* Footer link */}
      <div className="glass-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: "var(--slate-500)" }}>
          Full 13-week fixtures streamed live from GameChanger. Last game day results reflected instantly.
        </p>
        <a
          href={`${GC_ORG_URL}/schedule`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest shrink-0 transition-opacity hover:opacity-70"
          style={{ color: "var(--crimson-400)" }}
        >
          <ExternalLink size={13} />
          Open Full Schedule
        </a>
      </div>
    </div>
  );
}
