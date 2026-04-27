import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { DiamondIcon, BatIcon } from "@/components/ui/BplIcons";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Register — BPL Season 1",
  description: "Register for BPL Season 1.",
};

export default async function RegisterPage() {
  const { data: settings } = await supabase
    .from("app_settings")
    .select("registrations_open")
    .eq("id", 1)
    .single();
    
  const registrationsOpen = settings?.registrations_open ?? false;

  if (!registrationsOpen) {
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

  // Registrations Open UI
  return (
    <div className="pt-24">
      <section className="py-20" aria-labelledby="register-heading">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge badge-crimson mb-6" aria-hidden="true">Registration Open</span>
            <h1
              id="register-heading"
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl mb-6"
              style={{ color: "var(--slate-50)" }}
            >
              Join BPL{" "}
              <span className="gradient-text">Season 1</span>
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "var(--slate-400)" }}>
              Two registration paths. Both lead to competitive baseball. Choose yours below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Team  */}
            <Link
              href="/register/team"
              className="glass-card glass-card-hover p-10 flex flex-col items-center text-center group cursor-pointer"
              style={{ border: "1px solid rgba(245,166,35,0.2)" }}
              role="button"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.2)" }}
              >
                <DiamondIcon size={36} style={{ color: "var(--gold-400)" }} aria-hidden="true" />
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-3" style={{ color: "var(--slate-50)" }}>
                Register a Team
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--slate-400)" }}>
                Form your roster of 9–30 players, submit your team details, and compete as a 
                fully registered BPL team from Day 1.
              </p>
              <div
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: "var(--gold-400)" }}
              >
                Start team registration
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </Link>

            {/* Free agent */}
            <Link
              href="/register/free-agent"
              className="glass-card glass-card-hover p-10 flex flex-col items-center text-center group cursor-pointer"
              style={{ border: "1px solid rgba(227,27,35,0.25)" }}
              role="button"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ background: "rgba(227,27,35,0.1)", border: "1px solid rgba(227,27,35,0.2)" }}
              >
                <BatIcon size={36} style={{ color: "var(--crimson-400)" }} aria-hidden="true" />
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-3" style={{ color: "var(--slate-50)" }}>
                Free Agent
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--slate-400)" }}>
                No team? No problem. Register, get evaluated at the April 25 Tryouts, 
                and get placed via the BPL Draft for competitive balance.
              </p>
              <div
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: "var(--crimson-400)" }}
              >
                Register as free agent
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </Link>
          </div>

          {/* Bottom note */}
          <div className="glass-card p-6 sm:p-8 max-w-2xl mx-auto mt-12 text-center">
            <p className="font-heading font-semibold text-sm mb-2" style={{ color: "var(--slate-200)" }}>
              Registration Fee
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--slate-400)" }}>
              Registration fee is Student: RM 20 / Adult: RM 40. Team managers collect and submit fees in bulk.
              Free agents pay directly. Questions?{" "}
              <a
                href="https://wa.me/60102276014"
                className="underline underline-offset-4 transition-colors hover:text-white"
                style={{ color: "var(--crimson-400)" }}
              >
                WhatsApp Commissioner Basit
              </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
