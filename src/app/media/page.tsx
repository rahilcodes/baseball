import type { Metadata } from "next";
import { Camera, Video, Share2, Globe, PlayCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Media — BPL Baseball Malaysia",
  description: "BPL media hub. Game highlights, match photography, player profiles, and social media content. Season 1 documentation by the official BPL media team.",
};

const SOCIAL_CHANNELS = [
  { icon: Share2, label: "Instagram", handle: "@bplbaseball", href: "https://www.instagram.com/bplbaseball", color: "rgba(225, 48, 108, 0.15)", border: "rgba(225, 48, 108, 0.25)", textColor: "#E1306C" },
  { icon: Globe, label: "Facebook", handle: "BPL Baseball Malaysia", href: "https://www.facebook.com/bplbaseball", color: "rgba(24, 119, 242, 0.1)", border: "rgba(24, 119, 242, 0.2)", textColor: "#1877F2" },
  { icon: PlayCircle, label: "TikTok", handle: "@bplbaseball", href: "https://www.tiktok.com/@bplbaseball", color: "rgba(255,255,255,0.06)", border: "var(--glass-border)", textColor: "var(--slate-200)" },
];

const CONTENT_TYPES = [
  { icon: Video, title: "Match Highlights", description: "Weekly game recaps and best-play reels published every Sunday after match day. Distributed across Instagram, TikTok, and Facebook.", tag: "Every Sunday" },
  { icon: Camera, title: "Game Photography", description: "Professional action shots, team photos, and event coverage. Available for sponsor co-branding and shared media. High-res downloads after each game day.", tag: "Each Match Day" },
  { icon: Share2, title: "Player Spotlights", description: "Weekly player features — local stars, expat stories, and human-interest content. Authentic narratives that connect fans to the players.", tag: "Weekly" },
  { icon: Globe, title: "Press Coverage", description: "Press releases to Malaysian sports media. Being the first adult baseball league in Malaysia guarantees editorial interest.", tag: "Season-Long" },
];

export default function MediaPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 relative" aria-labelledby="media-heading">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 60% 20%, rgba(227,27,35,0.05) 0%, transparent 60%)" }}
          aria-hidden="true"
        />
        <div className="section-container">
          <div className="max-w-2xl">
            <span className="badge badge-crimson mb-6" aria-hidden="true">Official Media Hub</span>
            <h1
              id="media-heading"
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl mb-6"
              style={{ color: "var(--slate-50)" }}
            >
              Every game,{" "}
              <span className="gradient-text">documented.</span>
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "var(--slate-400)" }}>
              The BPL media team captures every moment — from opening pitch to championship ceremony.
              3–5 posts per week. Full highlight reels every Sunday.
            </p>
          </div>
        </div>
      </section>

      {/* Social channels */}
      <section className="py-8" aria-labelledby="social-heading">
        <div className="section-container">
          <h2
            id="social-heading"
            className="font-heading font-semibold text-sm uppercase tracking-widest mb-6"
            style={{ color: "var(--slate-500)" }}
          >
            Follow us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SOCIAL_CHANNELS.map(({ icon: Icon, label, handle, href, color, border, textColor }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card glass-card-hover p-6 flex items-center gap-4"
                style={{ border: `1px solid ${border}`, background: color }}
                aria-label={`Follow BPL on ${label}: ${handle}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                  aria-hidden="true"
                >
                  <Icon size={22} style={{ color: textColor }} />
                </div>
                <div>
                  <p className="font-heading font-semibold text-base" style={{ color: "var(--slate-50)" }}>{label}</p>
                  <p className="text-sm" style={{ color: textColor }}>{handle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content types */}
      <section className="py-16 animated-gradient-bg" aria-labelledby="content-heading">
        <div className="section-container">
          <h2
            id="content-heading"
            className="font-heading font-bold text-2xl sm:text-3xl mb-10"
            style={{ color: "var(--slate-50)" }}
          >
            What we produce
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CONTENT_TYPES.map(({ icon: Icon, title, description, tag }) => (
              <div key={title} className="glass-card glass-card-hover p-6 sm:p-8 group">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "rgba(227,27,35,0.1)", border: "1px solid rgba(227,27,35,0.2)" }}
                    aria-hidden="true"
                  >
                    <Icon size={22} style={{ color: "var(--crimson-400)" }} />
                  </div>
                  <div>
                    <span
                      className="badge badge-crimson mb-2"
                      style={{ fontSize: "0.65rem" }}
                    >
                      {tag}
                    </span>
                    <h3
                      className="font-heading font-bold text-lg"
                      style={{ color: "var(--slate-50)" }}
                    >
                      {title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--slate-400)" }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery placeholder */}
      <section className="py-16" aria-labelledby="gallery-heading">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <h2
              id="gallery-heading"
              className="font-heading font-bold text-2xl sm:text-3xl"
              style={{ color: "var(--slate-50)" }}
            >
              Photo Gallery
            </h2>
            <span className="badge badge-navy">Coming Season 1</span>
          </div>

          {/* Placeholder grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            aria-label="Photo gallery — photos will appear here from Season 1"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl flex items-center justify-center"
                style={{
                  background: `rgba(255,255,255,${0.02 + (i % 3) * 0.01})`,
                  border: "1px solid var(--glass-border)",
                }}
                aria-hidden="true"
              >
                <Camera size={24} style={{ color: "var(--slate-700)" }} />
              </div>
            ))}
          </div>

          <p className="text-center text-sm mt-8" style={{ color: "var(--slate-600)" }}>
            Game photography will be posted here after every match day starting{" "}
            <span style={{ color: "var(--crimson-400)" }}>May 4, 2026</span>.
          </p>
        </div>
      </section>

      {/* Sponsor CTA */}
      <section className="py-12" aria-label="Media sponsorship call to action">
        <div className="section-container">
          <div
            className="glass-card p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            style={{ border: "1px solid rgba(245,166,35,0.2)", background: "rgba(245,166,35,0.02)" }}
          >
            <div className="flex-1">
              <p className="font-heading font-bold text-xl sm:text-2xl mb-2" style={{ color: "var(--slate-50)" }}>
                Want your brand in our content?
              </p>
              <p className="text-sm sm:text-base" style={{ color: "var(--slate-400)" }}>
                Sponsors are featured in weekly reels, player spotlights, and championship coverage reaching 5,000+ people per month.
              </p>
            </div>
            <a
              href="/sponsorship"
              className="shrink-0 inline-flex items-center gap-2 px-6 h-11 rounded-xl font-semibold text-sm transition-all duration-150 hover:opacity-90"
              style={{ background: "var(--gold-400)", color: "var(--navy-950)" }}
            >
              View Sponsor Packages
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
