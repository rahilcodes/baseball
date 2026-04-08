import type { Metadata } from "next";
import { Calendar, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Schedule — BPL Season 1",
  description: "BPL Season 1 match schedule. Every Sunday at UPM, Selangor. May–July 2026.",
};

// Pre-season schedule (dates TBD, placeholder structure)
const SCHEDULE_WEEKS = [
  { week: 1, date: "May 4, 2026", status: "upcoming", games: [
    { home: "Selangor Sluggers", away: "KL Strikers", time: "9:00 AM" },
    { home: "Putrajaya Panthers", away: "PJ Pioneers", time: "12:00 PM" },
    { home: "Shah Alam Storm", away: "Klang Valley Kings", time: "3:00 PM" },
  ]},
  { week: 2, date: "May 11, 2026", status: "upcoming", games: [
    { home: "KL Strikers", away: "Shah Alam Storm", time: "9:00 AM" },
    { home: "PJ Pioneers", away: "Selangor Sluggers", time: "12:00 PM" },
    { home: "Klang Valley Kings", away: "Putrajaya Panthers", time: "3:00 PM" },
  ]},
  { week: 3, date: "May 18, 2026", status: "upcoming", games: [
    { home: "Selangor Sluggers", away: "Putrajaya Panthers", time: "9:00 AM" },
    { home: "Shah Alam Storm", away: "PJ Pioneers", time: "12:00 PM" },
    { home: "KL Strikers", away: "Klang Valley Kings", time: "3:00 PM" },
  ]},
];

export default function SchedulePage() {
  return (
    <div className="pt-24">
      <section className="py-16" aria-labelledby="schedule-heading">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="badge badge-army mb-4" aria-hidden="true" style={{ background: "rgba(255,255,255,0.06)", color: "var(--slate-400)", border: "1px solid var(--glass-border)", display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "600", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Season 1 Schedule
              </span>
              <h1
                id="schedule-heading"
                className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl"
                style={{ color: "var(--slate-50)" }}
              >
                <span className="gradient-text">Match</span> Days
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--slate-500)" }}>
              <MapPin size={14} style={{ color: "var(--crimson-400)" }} aria-hidden="true" />
              <span>UPM, Selangor — Every Sunday</span>
            </div>
          </div>

          <div className="space-y-8">
            {SCHEDULE_WEEKS.map(({ week, date, status, games }) => (
              <div key={week} aria-label={`Week ${week}: ${date}`}>
                {/* Week header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="glass-card px-4 py-2 flex items-center gap-2">
                    <Calendar size={14} style={{ color: "var(--crimson-400)" }} aria-hidden="true" />
                    <span className="font-heading font-semibold text-sm" style={{ color: "var(--slate-200)" }}>
                      Week {week} — {date}
                    </span>
                  </div>
                  <div className="divider flex-1" />
                </div>

                {/* Games */}
                <div className="space-y-3">
                  {games.map(({ home, away, time }) => (
                    <div
                      key={`${home}-${away}`}
                      className="glass-card p-4 sm:p-5 flex items-center gap-4 flex-wrap sm:flex-nowrap"
                    >
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--slate-500)" }}>
                        <Clock size={12} aria-hidden="true" />
                        <span className="font-medium">{time}</span>
                      </div>
                      <div className="flex items-center gap-3 flex-1 justify-center text-center sm:text-left sm:justify-start">
                        <span className="font-heading font-semibold text-sm sm:text-base" style={{ color: "var(--slate-100)" }}>
                          {home}
                        </span>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{ background: "rgba(227,27,35,0.12)", color: "var(--crimson-400)", border: "1px solid rgba(227,27,35,0.2)" }}
                          aria-label="versus"
                        >
                          VS
                        </span>
                        <span className="font-heading font-semibold text-sm sm:text-base" style={{ color: "var(--slate-100)" }}>
                          {away}
                        </span>
                      </div>
                      <span className="badge badge-navy text-xs ml-auto" style={{ fontSize: "0.65rem" }}>
                        Scheduled
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-6 mt-10 text-center">
            <p className="text-sm" style={{ color: "var(--slate-500)" }}>
              Full 13-week schedule will be published before Season 1 opener on{" "}
              <span style={{ color: "var(--crimson-400)" }}>May 4, 2026</span>.
              Fixtures are subject to change. Follow us on social for updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
