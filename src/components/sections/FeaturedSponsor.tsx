import Image from "next/image";
import { MapPin, Phone, ExternalLink } from "lucide-react";

export function FeaturedSponsor() {
  return (
    <section className="py-8 bg-navy-950 relative border-y" style={{ borderColor: "var(--glass-border)" }} aria-label="Featured Partner">
      <div className="section-container">
        <a
          href="https://wa.me/60187799047"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col sm:flex-row items-center justify-center gap-6 p-4 sm:p-6 rounded-2xl group transition-all hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, rgba(245,166,35,0.1) 0%, rgba(10,25,47,0.95) 100%)",
            border: "1px solid rgba(245,166,35,0.3)",
            boxShadow: "0 0 40px rgba(245,166,35,0.05)",
          }}
          aria-label="Swing! Batting Centre — Official Batting Partner"
        >
          {/* Logo */}
          <div
            className="w-16 h-16 rounded-xl shrink-0 overflow-hidden flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,166,35,0.2)" }}
          >
            <Image src="/images/swing.jpeg" alt="Swing! Batting Centre" width={60} height={60} className="object-contain" />
          </div>

          {/* Text */}
          <div className="flex-1 text-center sm:text-left max-w-xl">
            <span
              className="text-[10px] font-black uppercase tracking-widest"
              style={{ color: "var(--gold-400)" }}
            >
              Official Batting Partner
            </span>
            <p className="font-heading font-bold text-xl mb-1" style={{ color: "var(--slate-50)" }}>
              Swing! Batting Centre
            </p>
            <div className="flex items-center gap-4 justify-center sm:justify-start flex-wrap">
              <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--slate-400)" }}>
                <MapPin size={12} className="text-crimson-400" /> Melawati Mall, KL
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--slate-400)" }}>
                <Phone size={12} className="text-crimson-400" /> +60 18-779 9047
              </span>
            </div>
          </div>

          <span
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl shrink-0"
            style={{ background: "rgba(245,166,35,0.15)", color: "var(--gold-400)", border: "1px solid rgba(245,166,35,0.3)" }}
          >
            Visit Swing! <ExternalLink size={14} />
          </span>
        </a>
      </div>
    </section>
  );
}
