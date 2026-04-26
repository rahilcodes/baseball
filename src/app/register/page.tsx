import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Registration Closed — BPL Season 1",
  description: "Registrations for BPL Season 1 are now officially closed.",
};

export default function RegisterPage() {
  return (
    <div className="pt-32 pb-24 min-h-[80vh] flex items-center justify-center">
      <section className="w-full" aria-labelledby="register-heading">
        <div className="section-container">
          <div className="glass-card p-12 text-center max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-crimson-500/10 border border-crimson-500/20 flex items-center justify-center mb-8">
              <Lock size={32} className="text-crimson-400" />
            </div>
            
            <span className="badge badge-crimson mb-6 opacity-50" aria-hidden="true">Season 1</span>
            
            <h1
              id="register-heading"
              className="font-heading font-bold text-4xl sm:text-5xl mb-6"
              style={{ color: "var(--slate-50)" }}
            >
              Registrations <span className="gradient-text">Closed</span>
            </h1>
            
            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--slate-400)" }}>
              Thank you to everyone who registered! The registration window for players, teams, and free agents for Season 1 is now officially closed.
            </p>
            
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-semibold hover:text-white transition-colors px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
              style={{ color: "var(--slate-300)" }}
            >
              <ArrowLeft size={16} />
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
