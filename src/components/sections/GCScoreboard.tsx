"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Zap, Activity } from "lucide-react";

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
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    const scriptId = "gc-sdk-script";
    const initWidget = () => {
      try {
        if (window.GC?.scoreboard) {
          window.GC.scoreboard.init({
            target: "#gc-scoreboard-widget-9fc9",
            widgetId: "4182f0d9-0329-4f13-ab22-1b4fca358324",
            maxVerticalGamesVisible: 4,
          });
          setWidgetLoaded(true);
        }
      } catch {
        // Widget failed to init — fallback UI will show
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://widgets.gc.com/static/js/sdk.v1.js";
      script.async = true;
      script.onload = () => setTimeout(initWidget, 500);
      script.onerror = () => { /* silent */ };
      document.body.appendChild(script);
    } else {
      setTimeout(initWidget, 300);
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
            <h2 className="font-heading font-bold text-3xl sm:text-4xl" style={{ color: "var(--slate-50)" }}>
              Season <span className="gradient-text">Scoreboard</span>
            </h2>
            <p className="text-sm mt-2" style={{ color: "var(--slate-500)" }}>
              Scores and results updated in real time every match day.
            </p>
          </div>
          <a
            href="https://web.gc.com/organizations/SrKbLlcTiUc1/home"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-colors hover:opacity-80"
            style={{ color: "var(--crimson-400)" }}
          >
            View on GameChanger <ExternalLink size={12} />
          </a>
        </div>

        {/* Widget container — hidden when fallback is shown */}
        <div
          id="gc-scoreboard-widget-9fc9"
          className={widgetLoaded ? "glass-card overflow-hidden rounded-2xl" : "hidden"}
          style={{ minHeight: 280, colorScheme: "dark" }}
        />

        {/* Fallback card — shown when widget doesn't load (localhost / domain not whitelisted) */}
        {!widgetLoaded && (
          <div
            className="glass-card overflow-hidden rounded-2xl relative"
            style={{
              background: "linear-gradient(135deg, rgba(227,27,35,0.06) 0%, rgba(2,11,24,0.8) 100%)",
              border: "1px solid rgba(227,27,35,0.15)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
              style={{ background: "radial-gradient(circle, rgba(227,27,35,0.6) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
            />
            <div className="relative p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(227,27,35,0.12)", border: "1px solid rgba(227,27,35,0.2)" }}>
                <Activity size={30} style={{ color: "var(--crimson-400)" }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3 justify-center sm:justify-start">
                  <Zap size={14} style={{ color: "var(--gold-400)" }} />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--gold-400)" }}>Season starts May 4, 2026</span>
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl mb-2" style={{ color: "var(--slate-50)" }}>
                  Live scores coming soon
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--slate-400)" }}>
                  The BPL scoreboard will go live on opening day. Every inning, every out, every run — tracked in real time via GameChanger.
                </p>
              </div>
              <a
                href="https://web.gc.com/organizations/SrKbLlcTiUc1/home"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-7 py-3 rounded-xl font-heading font-bold text-white shrink-0 transition-all hover:scale-105"
                style={{ background: "var(--crimson-500)", boxShadow: "0 4px 20px rgba(227,27,35,0.25)" }}
              >
                Follow on GC <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}

        <p className="text-xs text-center mt-4" style={{ color: "var(--slate-600)" }}>
          Powered by GameChanger · Live on opening day
        </p>
      </div>
    </section>
  );
}
