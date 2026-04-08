import Link from "next/link";
import { Users, UserPlus, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const TEAM_FEATURES = [
  "Minimum 12, maximum 20 players",
  "Submit full roster with contact details",
  "Registration: RM 20 per player",
  "Choose home/away uniform colors",
  "Manager as primary league contact",
];

const AGENT_FEATURES = [
  "Open to all experience levels",
  "Evaluated at pre-season assessment",
  "Serpentine draft to ensure fairness",
  "Placed on a team by April 24",
  "Registration: RM 20 (all-inclusive)",
];

export function RegistrationPaths() {
  return (
    <section
      className="relative py-24"
      aria-labelledby="register-heading"
    >
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge badge-gold mb-4" aria-hidden="true">
            Join Season 1
          </span>
          <h2
            id="register-heading"
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4"
            style={{ color: "var(--slate-50)" }}
          >
            How do you want to play?
          </h2>
          <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: "var(--slate-400)" }}>
            Two paths to the diamond. Both lead to competition.
            Choose the one that fits your situation.
          </p>
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Team registration */}
          <div
            className="glass-card glass-card-hover p-8 sm:p-10 flex flex-col relative overflow-hidden"
            style={{ border: "1px solid rgba(245,166,35,0.2)" }}
          >
            {/* Glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)",
                transform: "translate(30%, -30%)",
              }}
              aria-hidden="true"
            />
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.2)" }}
            >
              <Users size={26} style={{ color: "var(--gold-400)" }} aria-hidden="true" />
            </div>
            <div className="badge badge-gold mb-4 self-start">Track A</div>
            <h3
              className="font-heading font-bold text-2xl sm:text-3xl mb-3"
              style={{ color: "var(--slate-50)" }}
            >
              Register a Team
            </h3>
            <p className="text-sm sm:text-base mb-6" style={{ color: "var(--slate-400)" }}>
              Already have a crew? Bring your squad and compete as a full team from Day 1.
            </p>
            <ul className="space-y-3 mb-8 flex-1" role="list" aria-label="Team registration requirements">
              {TEAM_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm" style={{ color: "var(--slate-300)" }}>
                  <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: "var(--gold-400)" }} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant="secondary" size="lg" asChild className="group w-full">
              <Link href="/register/team" style={{ borderColor: "rgba(245,166,35,0.3)", color: "var(--gold-300)" }}>
                Register Your Team
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* Free agent */}
          <div
            className="glass-card glass-card-hover p-8 sm:p-10 flex flex-col relative overflow-hidden"
            style={{ border: "1px solid rgba(227,27,35,0.25)" }}
          >
            {/* Glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(227,27,35,0.07) 0%, transparent 70%)",
                transform: "translate(30%, -30%)",
              }}
              aria-hidden="true"
            />
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: "rgba(227,27,35,0.12)", border: "1px solid rgba(227,27,35,0.25)" }}
            >
              <UserPlus size={26} style={{ color: "var(--crimson-400)" }} aria-hidden="true" />
            </div>
            <div className="badge badge-crimson mb-4 self-start">Track B</div>
            <h3
              className="font-heading font-bold text-2xl sm:text-3xl mb-3"
              style={{ color: "var(--slate-50)" }}
            >
              Free Agent
            </h3>
            <p className="text-sm sm:text-base mb-6" style={{ color: "var(--slate-400)" }}>
              Playing solo? We&apos;ll evaluate your skills and place you on a team through the BPL Draft.
            </p>
            <ul className="space-y-3 mb-8 flex-1" role="list" aria-label="Free agent registration requirements">
              {AGENT_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm" style={{ color: "var(--slate-300)" }}>
                  <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: "var(--crimson-400)" }} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant="primary" size="lg" asChild className="group w-full">
              <Link href="/register/free-agent">
                Register as Free Agent
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        {/* CTA note */}
        <p className="text-center text-sm mt-8" style={{ color: "var(--slate-600)" }}>
          Questions? Contact Commissioner Basit at{" "}
          <a
            href="tel:+601022763014"
            className="transition-colors hover:text-white underline underline-offset-4"
            style={{ color: "var(--slate-400)" }}
          >
            10-227 6014
          </a>
        </p>
      </div>
    </section>
  );
}
