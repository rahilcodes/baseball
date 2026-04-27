import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTASection({ registrationsOpen = false }: { registrationsOpen?: boolean }) {
  return (
    <section
      className="relative py-24 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(183,28,28,0.08) 0%, rgba(10,25,47,0.9) 50%, rgba(2,11,24,1) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" aria-hidden="true" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(227,27,35,0.08) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative section-container text-center">
        <span className={`badge mb-6 inline-flex ${registrationsOpen ? "badge-crimson" : "badge-crimson opacity-50"}`} aria-hidden="true">
          {registrationsOpen ? "Registration Open" : "Registrations Closed"}
        </span>
        <h2
          id="cta-heading"
          className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-balance"
          style={{ color: "var(--slate-50)" }}
        >
          The diamond is waiting.
          <br />
          <span className="gradient-text">Are you ready?</span>
        </h2>
        <p
          className="text-lg sm:text-xl max-w-lg mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--slate-400)" }}
        >
          {registrationsOpen ? (
            <>
              Secure your spot in Season 1 before registration closes.
              Limited team spots available.
            </>
          ) : (
            <>
              Registrations for Season 1 are now officially closed.
              Thank you to everyone who registered!
            </>
          )}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {registrationsOpen ? (
            <Button variant="primary" size="xl" asChild className="group">
              <Link href="/register">
                REGISTER NOW
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <Button variant="primary" size="xl" disabled className="opacity-50 cursor-not-allowed">
              REGISTRATIONS CLOSED
            </Button>
          )}
          <Button variant="outline" size="xl" asChild>
            <Link href="/sponsorship">Become a Sponsor</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm" style={{ color: "var(--slate-600)" }}>
          Season 1 · May–July 2026 · Selangor, Malaysia
        </p>
      </div>
    </section>
  );
}
