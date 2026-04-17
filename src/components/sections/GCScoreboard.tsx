"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    GC: {
      scoreboard: {
        init: (config: { target: string; widgetId: string; maxVerticalGamesVisible: number }) => void;
      };
    };
  }
}

export function GCScoreboard() {
  useEffect(() => {
    // Load GC SDK script only once
    const scriptId = "gc-sdk-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://widgets.gc.com/static/js/sdk.v1.js";
      script.async = true;
      script.onload = () => {
        if (window.GC?.scoreboard) {
          window.GC.scoreboard.init({
            target: "#gc-scoreboard-widget-9fc9",
            widgetId: "4182f0d9-0329-4f13-ab22-1b4fca358324",
            maxVerticalGamesVisible: 4,
          });
        }
      };
      document.body.appendChild(script);
    } else {
      // SDK already loaded, just (re-)init
      const tryInit = () => {
        if (window.GC?.scoreboard) {
          window.GC.scoreboard.init({
            target: "#gc-scoreboard-widget-9fc9",
            widgetId: "4182f0d9-0329-4f13-ab22-1b4fca358324",
            maxVerticalGamesVisible: 4,
          });
        } else {
          setTimeout(tryInit, 200);
        }
      };
      tryInit();
    }
  }, []);

  return (
    <section
      className="py-16 overflow-hidden"
      aria-label="Live season scoreboard"
      style={{ borderTop: "1px solid var(--glass-border)", borderBottom: "1px solid var(--glass-border)" }}
    >
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="badge badge-crimson mb-3">Live via GameChanger</span>
            <h2
              className="font-heading font-bold text-3xl sm:text-4xl"
              style={{ color: "var(--slate-50)" }}
            >
              Season{" "}
              <span className="gradient-text">Scoreboard</span>
            </h2>
            <p className="text-sm mt-2" style={{ color: "var(--slate-500)" }}>
              Scores and results updated in real time every match day.
            </p>
          </div>
          <a
            href="https://web.gc.com/organizations/SrKbLlcTiUc1/home"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-widest transition-colors hover:opacity-80"
            style={{ color: "var(--crimson-400)" }}
          >
            View on GameChanger →
          </a>
        </div>

        {/* Widget container styled to match BPL glass aesthetic */}
        <div
          className="glass-card overflow-hidden rounded-2xl"
          style={{ minHeight: 280 }}
        >
          <div
            id="gc-scoreboard-widget-9fc9"
            style={{
              // Override GC widget to inherit dark theme where possible
              colorScheme: "dark",
            }}
          />
        </div>

        <p className="text-xs text-center mt-4" style={{ color: "var(--slate-600)" }}>
          Powered by GameChanger. Data refreshes automatically.
        </p>
      </div>
    </section>
  );
}
