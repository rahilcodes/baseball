import type { Metadata } from "next";
import { Suspense } from "react";
import { SponsorRegistrationForm } from "@/components/forms/SponsorRegistrationForm";

export const metadata: Metadata = {
  title: "Sponsor Registration — BPL Season 1",
  description: "Register your interest as a BPL Season 1 sponsor. Secure your position as Title, Gold, or Silver partner.",
};

// Search params handling in Server Components (using suspense for client search params in children)
export default function SponsorRegisterPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const tier = typeof searchParams.tier === "string" ? searchParams.tier : "silver";

  return (
    <div className="pt-24 pb-20">
      <section className="py-12 sm:py-20" aria-labelledby="sponsor-reg-heading">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge badge-gold mb-6" aria-hidden="true">Sponsorship Registration</span>
            <h1
              id="sponsor-reg-heading"
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl mb-6 text-balance leading-tight"
              style={{ color: "var(--slate-50)" }}
            >
              Partner with the <span className="gradient-text">Future of BaseBall</span> in Malaysia
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "var(--slate-400)" }}>
              Complete the form below to lock in your sponsorship package. This is a non-binding reservation.
            </p>
          </div>

          <Suspense fallback={<div className="glass-card p-20 animate-pulse text-center">Loading registration portal...</div>}>
            <SponsorRegistrationForm initialTier={tier} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
