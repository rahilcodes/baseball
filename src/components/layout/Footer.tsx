import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { LEAGUE_INFO } from "@/lib/data";

const FOOTER_LINKS = {
  league: [
    { href: "/about", label: "About BPL" },
    { href: "/teams", label: "Teams" },
    { href: "/schedule", label: "Schedule" },
    { href: "/standings", label: "Standings" },
    { href: "/players", label: "Players" },
    { href: "/media", label: "Media" },
  ],
  participate: [
    { href: "/register/free-agent", label: "Register as Player" },
    { href: "/register/team", label: "Register a Team" },
    { href: "/sponsorship", label: "Become a Sponsor" },
    { href: "/rules", label: "League Rules" },
  ],
  info: [
    { href: "/contact", label: "Contact Us" },
    { href: "/safety", label: "Safety Protocols" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="relative mt-32 border-t"
      style={{ borderColor: "var(--glass-border)", background: "var(--navy-900)" }}
      role="contentinfo"
    >
      {/* Grid pattern bg */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="section-container relative">
        {/* Top section */}
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5" aria-label="BPL Home">
              <Image
                src="/images/bpl_logo_with word.png"
                alt="BPL Baseball Malaysia"
                width={160}
                height={50}
                className="object-contain mb-4"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--slate-500)" }}>
              Inaugural Season for Malaysia&apos;s first adult baseball league.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm" style={{ color: "var(--slate-500)" }}>
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "var(--crimson-400)" }} />
                <span>Universiti Putra Malaysia (UPM), Selangor</span>
              </div>
              <a
                href="tel:+60102276014"
                className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                style={{ color: "var(--slate-500)" }}
              >
                <Phone size={14} style={{ color: "var(--crimson-400)" }} />
                +60 10-227 6014
              </a>
              <a
                href="mailto:info@bplbaseball.com"
                className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                style={{ color: "var(--slate-500)" }}
              >
                <Mail size={14} style={{ color: "var(--crimson-400)" }} />
                info@bplbaseball.com
              </a>
            </div>
          </div>

          {/* League links */}
          <div>
            <h3
              className="font-heading font-semibold text-sm uppercase tracking-widest mb-5"
              style={{ color: "var(--slate-400)" }}
            >
              The League
            </h3>
            <ul className="space-y-3" role="list">
              {FOOTER_LINKS.league.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "var(--slate-500)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Participate links */}
          <div>
            <h3
              className="font-heading font-semibold text-sm uppercase tracking-widest mb-5"
              style={{ color: "var(--slate-400)" }}
            >
              Participate
            </h3>
            <ul className="space-y-3" role="list">
              {FOOTER_LINKS.participate.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "var(--slate-500)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h3
              className="font-heading font-semibold text-sm uppercase tracking-widest mb-5"
              style={{ color: "var(--slate-400)" }}
            >
              Information
            </h3>
            <ul className="space-y-3 mb-8" role="list">
              {FOOTER_LINKS.info.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "var(--slate-500)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Emergency widget */}
            <div
              className="p-4 rounded-xl border"
              style={{ background: "rgba(183,28,28,0.08)", borderColor: "rgba(183,28,28,0.2)" }}
            >
              <p
                className="font-heading font-bold text-xs uppercase tracking-widest mb-2"
                style={{ color: "var(--crimson-400)" }}
              >
                Emergency
              </p>
              <a
                href="tel:999"
                className="text-white font-bold text-xl transition-colors hover:text-red-300"
              >
                999
              </a>
              <p className="text-xs mt-1" style={{ color: "var(--slate-500)" }}>
                Malaysian Emergency Services
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "var(--glass-border)" }}
        >
          <p className="text-xs" style={{ color: "var(--slate-600)" }}>
            &copy; {currentYear} Baseball Premier League Malaysia. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs" style={{ color: "var(--slate-600)" }}>
            <span>Governed by</span>
            <a
              href="https://www.wbsc.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-white"
            >
              WBSC Official Rules 2025–2026
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
