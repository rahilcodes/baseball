import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhyJoinSection } from "@/components/sections/WhyJoinSection";
import { RegistrationPaths } from "@/components/sections/RegistrationPaths";
import { SponsorPreview } from "@/components/sections/SponsorPreview";
import { SeasonSection } from "@/components/sections/SeasonSection";
import { CTASection } from "@/components/sections/CTASection";
import { TeamsMarquee } from "@/components/sections/TeamsMarquee";
import { GCScoreboard } from "@/components/sections/GCScoreboard";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Baseball Premier League — Malaysia's Premier Adult Baseball League",
  description:
    "Join BPL Season 1 — Malaysia's premier structured adult baseball league. Play from May–July 2026 in Selangor. Register as a player or team today. Limited spots available.",
};

export default async function HomePage() {
  const { data: settings } = await supabase
    .from("app_settings")
    .select("registrations_open")
    .eq("id", 1)
    .single();
    
  const registrationsOpen = settings?.registrations_open ?? false;

  return (
    <>
      <HeroSection registrationsOpen={registrationsOpen} />
      <TeamsMarquee />
      <GCScoreboard />
      <StatsSection />
      <WhyJoinSection />
      <RegistrationPaths registrationsOpen={registrationsOpen} />
      <SeasonSection />
      <SponsorPreview />
      <CTASection registrationsOpen={registrationsOpen} />
    </>
  );
}
