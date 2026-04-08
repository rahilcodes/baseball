// League data types — ready for API/CMS integration
export interface Team {
  id: string;
  name: string;
  shortCode: string;
  colors: { home: string; away: string };
  manager: string;
  playerCount: number;
  wins: number;
  losses: number;
  ties: number;
  runsScored: number;
  runsAllowed: number;
}

export interface Player {
  id: string;
  fullName: string;
  teamId: string;
  position: string;
  jerseyNumber: number;
  nationality: string;
  experienceLevel: "Beginner" | "Intermediate" | "Advanced";
  stats?: PlayerStats;
  skills?: PlayerSkills;
}

export interface PlayerStats {
  atBats: number;
  hits: number;
  homeRuns: number;
  rbi: number;
  battingAverage: number;
  era?: number;
  wins?: number;
  strikeouts?: number;
}

export interface PlayerSkills {
  throwing: number; // 1-5
  fielding: number;
  hitting: number;
  baseRunning: number;
  pitching: number;
  gameIQ: number;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  time: string;
  venue: string;
  status: "scheduled" | "live" | "completed" | "postponed";
  homeScore?: number;
  awayScore?: number;
  innings?: number;
}

export interface Standing {
  teamId: string;
  rank: number;
  wins: number;
  losses: number;
  ties: number;
  gamesPlayed: number;
  winPercentage: number;
  runsScored: number;
  runsAllowed: number;
  runDifferential: number;
}

export interface Rule {
  section: string;
  title: string;
  content: string;
  tags: string[];
}

// Sponsorship tiers
export type SponsorTier = "title" | "gold" | "silver" | "in-kind";

export interface SponsorPackage {
  tier: SponsorTier;
  name: string;
  priceRange: string;
  slots: number;
  slotsAvailable: number;
  highlights: string[];
  metrics: {
    weeklyImpressions: number;
    totalImpressions: number;
    costPerImpression: string;
  };
}
