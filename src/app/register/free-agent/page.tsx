import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { FreeAgentForm } from "@/components/forms/FreeAgentForm";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Free Agent Registration — BPL Season 1",
  description: "Register as a free agent for BPL Season 1.",
};

export default async function FreeAgentPage() {
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
      <section className="py-16" aria-labelledby="free-agent-heading">
        <div className="section-container max-w-2xl">
          <div className="mb-10">
            <span className="badge badge-crimson mb-4" aria-hidden="true">Free Agent</span>
            <h1
              id="free-agent-heading"
              className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4"
              style={{ color: "var(--slate-50)" }}
            >
              Free Agent{" "}
              <span className="gradient-text">Registration</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--slate-400)" }}>
              Register below. You&apos;ll be evaluated at the Tryouts on April 25 at UPM, 
              and placed onto a team via the BPL Draft. Registration fee is Student: RM 20 / Adult: RM 40.
            </p>
          </div>
          <FreeAgentForm />
        </div>
      </section>
    </div>
  );
}
