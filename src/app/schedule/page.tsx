import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { GCSchedule } from "@/components/sections/GCSchedule";

export const metadata: Metadata = {
  title: "Schedule — BPL Season 1",
  description: "BPL Season 1 match schedule. Every Sunday at UPM, Selangor. May–July 2026.",
};

export default function SchedulePage() {
  return (
    <div className="pt-24">
      <section className="py-16" aria-labelledby="schedule-heading">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="badge badge-crimson mb-4" aria-hidden="true">
                Live via GameChanger
              </span>
              <h1
                id="schedule-heading"
                className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl"
                style={{ color: "var(--slate-50)" }}
              >
                <span className="gradient-text">Match</span> Days
              </h1>
              <p className="text-base mt-3" style={{ color: "var(--slate-500)" }}>
                Season 1 — Updated automatically from GameChanger.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--slate-500)" }}>
              <MapPin size={14} style={{ color: "var(--crimson-400)" }} aria-hidden="true" />
              <span>UPM, Selangor — Every Sunday</span>
            </div>
          </div>

          <GCSchedule />
        </div>
      </section>
    </div>
  );
}
