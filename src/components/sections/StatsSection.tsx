import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const STATS = [
  { value: 150, suffix: "+", label: "Registered Players", description: "Active adults ready to compete" },
  { value: 7, suffix: "", label: "Competitive Teams", description: "WBSC-standard match format" },
  { value: 14, suffix: "", label: "Weeks of Competition", description: "Regular season + playoffs" },
];

export function StatsSection() {
  return (
    <section
      className="relative py-20"
      aria-label="League statistics"
    >
      {/* Glass divider bar at top */}
      <div className="divider" />

      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="badge badge-navy mb-4"
            aria-hidden="true"
          >
            By the numbers
          </span>
          <h2
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl"
            style={{ color: "var(--slate-50)" }}
          >
            A league built on{" "}
            <span className="gradient-text">real ambition</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map(({ value, suffix, label, description, isZero }) => (
            <div
              key={label}
              className="glass-card glass-card-hover p-6 sm:p-8 flex flex-col items-center text-center"
            >
              <div
                className="font-heading font-bold text-4xl sm:text-5xl mb-2"
                style={{ color: isZero ? "var(--crimson-400)" : "var(--slate-50)" }}
              >
                {isZero ? (
                  <span className="tabular-nums">0</span>
                ) : (
                  <AnimatedCounter end={value} suffix={suffix} />
                )}
              </div>
              <p
                className="font-heading font-semibold text-sm sm:text-base mb-1"
                style={{ color: "var(--slate-200)" }}
              >
                {label}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--slate-500)" }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="divider mt-20" />
    </section>
  );
}
