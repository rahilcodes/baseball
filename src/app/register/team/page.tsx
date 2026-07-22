import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TeamRegistrationForm } from "@/components/forms/TeamRegistrationForm";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Team Registration — BPL Season 1",
  description: "Register your team for BPL Season 1.",
};

export default async function TeamRegisterPage() {
  const { data: settings } = await supabase
    .from("app_settings")
    .select("registrations_open")
    .eq("id", 1)
    .single();
    
  if (!settings?.registrations_open) {
    redirect("/register");
  }

  return (
    <div className="pt-24">
      <section className="py-16" aria-labelledby="team-register-heading">
        <div className="section-container max-w-3xl">
          <div className="mb-10">
            <span className="badge badge-gold mb-4" aria-hidden="true">Team Registration</span>
            <h1
              id="team-register-heading"
              className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4"
              style={{ color: "var(--slate-50)" }}
            >
              Register Your{" "}
              <span className="gradient-text">Team</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--slate-400)" }}>
              Register a roster of 9–30 players. Team manager submits all details and collects Student/Adult fees per 
              player. No individual payment links needed — submit once, play all season.
            </p>
          </div>
          <TeamRegistrationForm />
        </div>
      </section>
    </div>
  );
}
