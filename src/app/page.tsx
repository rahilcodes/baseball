import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhyJoinSection } from "@/components/sections/WhyJoinSection";
import { RegistrationPaths } from "@/components/sections/RegistrationPaths";
import { SponsorPreview } from "@/components/sections/SponsorPreview";
import { SeasonSection } from "@/components/sections/SeasonSection";
import { CTASection } from "@/components/sections/CTASection";
import { TeamsMarquee } from "@/components/sections/TeamsMarquee";

export const metadata: Metadata = {
  title: "Baseball Premier League — Malaysia's Premier Adult Baseball League",
  description:
    "Join BPL Season 1 — Malaysia's premier structured adult baseball league. Play from May–July 2026 in Selangor. Register as a player or team today. Limited spots available.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TeamsMarquee />
      <StatsSection />
      <WhyJoinSection />
      <RegistrationPaths />
      <SeasonSection />
      <SponsorPreview />
      <CTASection />
    </>
  );
}
