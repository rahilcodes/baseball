import type { Metadata } from "next";
import { FreeAgentForm } from "@/components/forms/FreeAgentForm";

export const metadata: Metadata = {
  title: "Free Agent Registration — BPL Season 1",
  description: "Register as a free agent for BPL Season 1. You will be evaluated in an assessment session and placed onto a team via the BPL Draft.",
};

export default function FreeAgentPage() {
  return (
    <div className="pt-24">
      <section className="py-16" aria-labelledby="free-agent-heading">
        <div className="section-container max-w-2xl">
          <div className="mb-10">
            <span className="badge badge-crimson mb-4" aria-hidden="true">Track B — Free Agent</span>
            <h1
              id="free-agent-heading"
              className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4"
              style={{ color: "var(--slate-50)" }}
            >
              Free Agent{" "}
              <span className="gradient-text">Registration</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--slate-400)" }}>
              Register below. You&apos;ll be evaluated at the assessment session on April 19 or 20 at UPM, 
              and placed onto a team via the BPL Draft. Registration fee: RM 20.
            </p>
          </div>
          <FreeAgentForm />
        </div>
      </section>
    </div>
  );
}
