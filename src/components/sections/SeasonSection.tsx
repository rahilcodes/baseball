import { Calendar, MapPin, Clock } from "lucide-react";

const TIMELINE = [
  {
    phase: "Registration",
    date: "Now — Apr 24, 2026",
    description: "Open registration for teams and free agents. Free Agent Tryouts on Saturday, April 25 at 10 AM at UPM.",
    status: "now",
  },
  {
    phase: "Draft Day & Free Agent Tryouts",
    date: "Apr 25, 2026 · 10 AM",
    description: "Free agents evaluated and placed onto teams via the BPL serpentine draft for competitive balance. All unattached players must attend.",
    status: "upcoming",
  },
  {
    phase: "Season Opener",
    date: "May 3, 2026",
    description: "First pitch. 2–3 games every Sunday at Universiti Putra Malaysia (UPM), Selangor.",
    status: "upcoming",
  },
  {
    phase: "Regular Season",
    date: "May 4 — Jun 2026",
    description: "7-inning WBSC-standard games. Stats tracked. Standings updated in real time after every match day.",
    status: "upcoming",
  },
  {
    phase: "Playoffs",
    date: "Jul 2026",
    description: "Top teams advance to the playoff bracket. Extra-inning drama with WBSC tiebreaker rules.",
    status: "upcoming",
  },
  {
    phase: "Championship",
    date: "Late Jul 2026",
    description: "Championship Finals with awards ceremony, sponsor recognition, and national media coverage.",
    status: "upcoming",
  },
];

export function SeasonSection() {
  return (
    <section
      className="relative py-24 animated-gradient-bg"
      aria-labelledby="season-heading"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Header */}
          <div>
            <span className="badge badge-crimson mb-4" aria-hidden="true">
              Season Structure
            </span>
            <h2
              id="season-heading"
              className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-6"
              style={{ color: "var(--slate-50)" }}
            >
              13 weeks of{" "}
              <span className="gradient-text">pure competition</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: "var(--slate-400)" }}>
              From the first pitch to Championship Finals — every Sunday is game day.
              Professional structure, real stakes, and a season worth remembering.
            </p>

            {/* Quick facts */}
            <div className="space-y-4">
              {[
                { icon: Calendar, text: "Season 1: May 4 – July 2026" },
                { icon: MapPin, text: "Universiti Putra Malaysia (UPM), Selangor" },
                { icon: Clock, text: "2–3 games every Sunday" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(227,27,35,0.1)", border: "1px solid rgba(227,27,35,0.2)" }}
                  >
                    <Icon size={14} style={{ color: "var(--crimson-400)" }} aria-hidden="true" />
                  </div>
                  <span className="text-sm sm:text-base" style={{ color: "var(--slate-300)" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Timeline */}
          <div>
            <ol className="relative border-l" style={{ borderColor: "var(--glass-border)" }} aria-label="Season timeline">
              {TIMELINE.map(({ phase, date, description, status }) => (
                <li key={phase} className="mb-8 ml-6 last:mb-0">
                  {/* Dot */}
                  <span
                    className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full ring-4"
                    style={{
                      background: status === "now" ? "var(--crimson-400)" : "var(--navy-700)",
                      boxShadow: "0 0 0 4px var(--navy-950)",
                    }}
                    aria-hidden="true"
                  >
                    {status === "now" && (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </span>
                  {/* Content */}
                  <div className="glass-card p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                      <h3
                        className="font-heading font-semibold text-base sm:text-lg"
                        style={{ color: "var(--slate-50)" }}
                      >
                        {phase}
                      </h3>
                      {status === "now" && (
                        <span className="badge badge-crimson text-xs" style={{ fontSize: "0.65rem" }}>
                          Open Now
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "var(--crimson-400)" }}>
                      {date}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--slate-400)" }}>
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
