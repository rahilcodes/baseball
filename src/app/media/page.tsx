import type { Metadata } from "next";
import { Camera, Video, Share2, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Media — BPL Baseball Malaysia",
  description: "BPL media hub. Game highlights, match photography, player profiles, and social media content. Season 1 documentation by the official BPL media team.",
};

const InstagramIcon = ({ size = 24, style }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.169a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
  </svg>
);

const FacebookIcon = ({ size = 24, style }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z" />
  </svg>
);

const TikTokIcon = ({ size = 24, style }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const SOCIAL_CHANNELS = [
  { icon: InstagramIcon, label: "Instagram", handle: "@bplbaseball", href: "https://www.instagram.com/bplbaseball", color: "rgba(225, 48, 108, 0.15)", border: "rgba(225, 48, 108, 0.25)", textColor: "#E1306C" },
  { icon: FacebookIcon, label: "Facebook", handle: "BPL Baseball Malaysia", href: "https://www.facebook.com/bplbaseball", color: "rgba(24, 119, 242, 0.1)", border: "rgba(24, 119, 242, 0.2)", textColor: "#1877F2" },
  { icon: TikTokIcon, label: "TikTok", handle: "@bplbaseball", href: "https://www.tiktok.com/@bplbaseball", color: "rgba(255,255,255,0.06)", border: "var(--glass-border)", textColor: "var(--slate-200)" },
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
