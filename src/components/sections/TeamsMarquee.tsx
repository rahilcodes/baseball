import Image from "next/image";
import Link from "next/link";

const TEAM_LOGOS = [
  { id: "urgentz",      name: "URGENTZ",              logo: "/images/team_logos/urgents.png" },
  { id: "sunway",       name: "Sunway",                logo: "/images/team_logos/sunway.png" },
  { id: "klang-ravens", name: "Klang Ravens",          logo: "/images/team_logos/ravens.png" },
  { id: "raiders",      name: "Raiders Baseball Club", logo: "/images/team_logos/raiders.png" },
  { id: "kl-dragons",   name: "KL Dragons",            logo: "/images/team_logos/dragons.png" },
  { id: "guardians",    name: "Guardians",             logo: "/images/team_logos/guardians.png" },
  { id: "mozac",        name: "MOZAC",                 logo: "/images/team_logos/mozac.png" },
  { id: "persatuan",    name: "Persatuan",             logo: "/images/team_logos/persatuan.png" },
];

// Duplicate for seamless infinite scroll
const MARQUEE_ITEMS = [...TEAM_LOGOS, ...TEAM_LOGOS];

export function TeamsMarquee() {
  return (
    <section aria-label="Participating teams" className="py-10 overflow-hidden" style={{ borderTop: "1px solid var(--glass-border)", borderBottom: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.01)" }}>
      <div className="section-container mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--slate-600)" }}>
          Corporate Partners and Teams
        </p>
      </div>

      {/* Scrolling strip */}
      <div className="relative flex" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
        <div
          className="flex items-center gap-20 animate-marquee"
          style={{ width: "max-content" }}
        >
          {MARQUEE_ITEMS.map((team, i) => (
            <Link
              key={`${team.id}-${i}`}
              href="/teams"
              className="flex flex-col items-center gap-2 group shrink-0"
              aria-label={team.name}
            >
              <div
                className="w-24 h-24 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-110"
              >
                <Image
                  src={team.logo}
                  alt={team.name}
                  width={80}
                  height={80}
                  className="object-contain filter grayscale opacity-50 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                />
              </div>
              <span className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap tracking-wide" style={{ color: "var(--slate-300)" }}>
                {team.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
