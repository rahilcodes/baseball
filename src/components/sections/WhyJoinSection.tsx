import { BatIcon, DiamondIcon, HelmetIcon, HomeBaseIcon, ScoreboardIcon, PitcherIcon } from "@/components/ui/BplIcons";

const REASONS = [
  {
    icon: BatIcon,
    title: "Real Competition",
    description: "WBSC-standard rules with certified umpires, statistical tracking, and a full playoff bracket leading to a Championship Finals.",
  },
  {
    icon: DiamondIcon,
    title: "Multicultural Community",
    description: "Malaysian, Japanese, Korean, and international players on the same diamond. A unique cross-cultural sporting environment.",
  },
  {
    icon: HelmetIcon,
    title: "Safety First",
    description: "First aid kits at every game, mandatory emergency protocols, and dedicated safety officers. Your welfare is our priority.",
  },
  {
    icon: HomeBaseIcon,
    title: "National Recognized",
    description: "Government proposal being submitted to National Sports Council and Ministry of Sports & Youth.",
  },
  {
    icon: ScoreboardIcon,
    title: "Structured Season",
    description: "13 weeks of competition every Sunday. Consistent schedule with 2–3 games per match day so you always have time to play.",
  },
  {
    icon: PitcherIcon,
    title: "Talent Development",
    description: "Free university clinics at UPM, UM, UKM, Taylor's, and Sunway. Expert coaching. A clear pathway from beginner to national level.",
  },
];


export function WhyJoinSection() {
  return (
    <section
      className="relative py-24 animated-gradient-bg"
      aria-labelledby="why-join-heading"
    >
      <div className="section-container">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="badge badge-crimson mb-4" aria-hidden="true">
            Why BPL
          </span>
          <h2
            id="why-join-heading"
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4"
            style={{ color: "var(--slate-50)" }}
          >
            More than a game.
            <br />
            <span className="gradient-text">A movement.</span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--slate-400)" }}>
            BPL is built for players who want genuine competition, not a casual kickabout. 
            If you love baseball and want to be part of something historic, this is for you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="glass-card glass-card-hover p-6 sm:p-8 group"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: "rgba(227,27,35,0.12)", border: "1px solid rgba(227,27,35,0.2)" }}
              >
                <Icon size={22} style={{ color: "var(--crimson-400)" }} aria-hidden="true" />
              </div>
              <h3
                className="font-heading font-semibold text-lg mb-2"
                style={{ color: "var(--slate-50)" }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--slate-400)" }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
