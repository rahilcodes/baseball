import type { Team, Match, Standing, Rule, SponsorPackage } from "./types";

// === DATA ABSTRACTION LAYER ===
// Switch between Google Sheets API, Sanity CMS, or mock data
// by updating the DATA_SOURCE environment variable

export type DataSource = "mock" | "google-sheets" | "sanity";
const DATA_SOURCE: DataSource = (process.env.DATA_SOURCE as DataSource) || "mock";

// --- League Info ---
export const LEAGUE_INFO = {
  name: "Baseball Premier League",
  shortName: "BPL",
  season: "Season 1",
  year: 2026,
  startDate: "2026-05-04",
  endDate: "2026-07-31",
  venue: "Universiti Putra Malaysia (UPM), Selangor",
  commissioner: { name: "Basit", phone: "10-227 6014" },
  deputyCommissioner: { name: "Syed", phone: "19 382 2176" },
  website: "www.bplbaseball.com",
};

// --- Mock Teams ---
export const MOCK_TEAMS: Team[] = [
  { id: "t1", name: "Selangor Sluggers", shortCode: "SLG", colors: { home: "Navy", away: "White" }, manager: "Ahmad Faiz", playerCount: 15, wins: 0, losses: 0, ties: 0, runsScored: 0, runsAllowed: 0 },
  { id: "t2", name: "Kuala Lumpur Strikers", shortCode: "KLS", colors: { home: "Crimson", away: "Grey" }, manager: "Tanaka Hiroshi", playerCount: 14, wins: 0, losses: 0, ties: 0, runsScored: 0, runsAllowed: 0 },
  { id: "t3", name: "Putrajaya Panthers", shortCode: "PTP", colors: { home: "Black", away: "Gold" }, manager: "David Park", playerCount: 13, wins: 0, losses: 0, ties: 0, runsScored: 0, runsAllowed: 0 },
  { id: "t4", name: "Petaling Jaya Pioneers", shortCode: "PJP", colors: { home: "Royal Blue", away: "White" }, manager: "Lee Wei Jian", playerCount: 12, wins: 0, losses: 0, ties: 0, runsScored: 0, runsAllowed: 0 },
  { id: "t5", name: "Shah Alam Storm", shortCode: "SAS", colors: { home: "Forest Green", away: "White" }, manager: "Sanjay Rajan", playerCount: 14, wins: 0, losses: 0, ties: 0, runsScored: 0, runsAllowed: 0 },
  { id: "t6", name: "Klang Valley Kings", shortCode: "KVK", colors: { home: "Purple", away: "Silver" }, manager: "Marcus Chen", playerCount: 13, wins: 0, losses: 0, ties: 0, runsScored: 0, runsAllowed: 0 },
];

// --- Rules Engine ---
export const LEAGUE_RULES: Rule[] = [
  { section: "1.1", title: "Game Format", content: "Each game consists of 7 innings. A 2-hour time limit applies — no new inning may begin after 1 hour 50 minutes from first pitch.", tags: ["format", "innings", "time limit"] },
  { section: "1.1", title: "Mercy Rule", content: "A game ends when one team leads by 10 or more runs after 5 complete innings (4.5 if home team leads).", tags: ["mercy rule", "run rule", "game end"] },
  { section: "1.1", title: "Playoff Tiebreaker", content: "Regular season ties are recorded as a tie. Playoff games use extra innings with a runner on 2nd base from the 8th inning onwards (WBSC tiebreaker rule).", tags: ["playoffs", "tiebreaker", "extra innings"] },
  { section: "1.2", title: "Team Composition", content: "Each team must field a minimum of 9 players. A team may play with 8 players; the 9th spot is an automatic out. Forfeit if fewer than 8 players within 15 minutes of game time.", tags: ["roster", "players", "forfeit", "minimum"] },
  { section: "1.3", title: "Designated Hitter (DH)", content: "The DH rule is in effect for all BPL games. The DH bats in place of the pitcher. Once removed, the pitcher must bat. Teams may opt out by declaring before the game.", tags: ["DH", "designated hitter", "pitching", "batting"] },
  { section: "1.4", title: "Substitutions", content: "Free defensive substitution is allowed. A substituted player may NOT re-enter the game. Courtesy runners are allowed for pitcher and catcher anytime.", tags: ["substitution", "courtesy runner", "re-entry"] },
  { section: "1.5", title: "Pitching Rules", content: "No pitch count limit in Season 1. A pitcher who hits 3 batters in a single game must be removed. Balks called per WBSC Rule 11.", tags: ["pitching", "pitch count", "balk", "hit by pitch"] },
  { section: "1.6", title: "Equipment Standards", content: "Approved baseballs: 9-inch leather, 5-5.25 oz. Bats: wood, aluminium, or composite — no altered bats. Pitcher gloves must not be white or grey. Full catcher gear mandatory.", tags: ["equipment", "bats", "gloves", "helmet", "catcher"] },
  { section: "1.7", title: "Field Dimensions", content: "Base paths: 90 feet (27.43m). Pitcher rubber to home plate: 60 feet 6 inches (18.43m). Home plate to backstop: minimum 25 feet.", tags: ["dimensions", "field", "bases"] },
  { section: "1.8", title: "Umpire Authority", content: "The umpire has full authority per WBSC Rule 4.1. Only the team manager may dispute a ruling, respectfully. Aggressive disputes result in ejection.", tags: ["umpire", "authority", "dispute", "ejection"] },
  { section: "1.9", title: "Forfeits", content: "A team forfeits if it cannot field 8 players within 15 minutes, refuses to play, or deliberately delays. Forfeit score: 7-0 in favour of the opponent.", tags: ["forfeit", "delay", "score"] },
  { section: "2", title: "Azan (Call to Prayer) Protocol", content: "The game must stop when the Azan (Call to Prayer) is taking place and continue after it is completed. All players and officials must respect this pause.", tags: ["azan", "prayer", "cultural", "pause"] },
  { section: "2.1", title: "Player Conduct", content: "No fighting, equipment throwing, verbal abuse, profanity, or discriminatory language. No alcohol or drugs before or during games. Full team uniform required.", tags: ["conduct", "fighting", "alcohol", "uniform", "sportsmanship"] },
  { section: "2.5", title: "Disciplinary Actions", content: "Fighting/physical contact: Ejection + 2 games, then season ban. Discriminatory language: Ejection + 2 games, then season ban. Umpire physical contact: Season ban, then Lifetime ban.", tags: ["discipline", "ejection", "suspension", "ban"] },
  { section: "3.4", title: "Weather Protocols", content: "Lightning: Stop play immediately. Move to enclosed vehicles or permanent structures. Resume only 30 minutes after last lightning/thunder. Heavy Rain: Game valid after 5 innings. Extreme Heat (37C+): Mandatory water breaks every 2 innings.", tags: ["weather", "lightning", "rain", "heat", "safety"] },
];

// --- Sponsor Packages ---
export const SPONSOR_PACKAGES: SponsorPackage[] = [
  {
    tier: "title",
    name: "Title Sponsor",
    priceRange: "RM 8,000 - 15,000",
    slots: 1,
    slotsAvailable: 1,
    highlights: [
      "Exclusive league naming rights — BPL powered by your brand",
      "Largest logo on ALL team jerseys (chest position)",
      "Primary banner at every game (13 Sundays)",
      "Home plate and backstop signage",
      "Featured in ALL social media posts (tagged and mentioned)",
      "Homepage hero placement on official website",
      "Speaking role at Championship Finals",
      "Exclusive branding at all university clinics",
      "Logo on all printed materials: scorecards, schedules, certificates",
      "First right of renewal for Season 2",
    ],
    metrics: { weeklyImpressions: 600, totalImpressions: 100000, costPerImpression: "RM 0.10-0.15" },
  },
  {
    tier: "gold",
    name: "Gold Sponsor",
    priceRange: "RM 3,000 - 5,000",
    slots: 3,
    slotsAvailable: 3,
    highlights: [
      "Logo on 2 team jerseys (sleeve position)",
      "Dedicated banner at every game day",
      "Weekly social media mention and tag",
      "Logo on BPL website sponsor section",
      "Championship event co-branding",
      "1 branded university clinic",
      "Player of the Month co-presentation",
      "Logo on printed schedules and scorecards",
    ],
    metrics: { weeklyImpressions: 600, totalImpressions: 50000, costPerImpression: "RM 0.06-0.10" },
  },
  {
    tier: "silver",
    name: "Silver Sponsor",
    priceRange: "RM 1,000 - 2,000",
    slots: 5,
    slotsAvailable: 5,
    highlights: [
      "Logo on 1 team jersey (back position)",
      "Banner at select game days (6 Sundays)",
      "Monthly social media mention",
      "Logo on website sponsor page",
      "Thank-you recognition at Championship",
      "Inclusion in league email updates",
    ],
    metrics: { weeklyImpressions: 600, totalImpressions: 25000, costPerImpression: "RM 0.04-0.08" },
  },
];

// --- Main Data Fetching Layer ---
export async function getTeams(): Promise<Team[]> {
  if (DATA_SOURCE === "google-sheets") {
    // TODO: fetch from Google Sheets API
    return MOCK_TEAMS;
  }
  return MOCK_TEAMS;
}

export async function getStandings(): Promise<Standing[]> {
  const teams = await getTeams();
  return teams.map((t, i) => ({
    teamId: t.id,
    rank: i + 1,
    wins: t.wins,
    losses: t.losses,
    ties: t.ties,
    gamesPlayed: t.wins + t.losses + t.ties,
    winPercentage: t.wins + t.losses + t.ties === 0 ? 0 : t.wins / (t.wins + t.losses),
    runsScored: t.runsScored,
    runsAllowed: t.runsAllowed,
    runDifferential: t.runsScored - t.runsAllowed,
  }));
}

export function searchRules(query: string): Rule[] {
  if (!query.trim()) return LEAGUE_RULES;
  const lq = query.toLowerCase();
  return LEAGUE_RULES.filter(rule =>
    rule.title.toLowerCase().includes(lq) ||
    rule.content.toLowerCase().includes(lq) ||
    rule.tags.some(t => t.includes(lq))
  );
}
