import type { Metadata } from "next";
import { Users } from "lucide-react";
import { PlayerJoinForm } from "@/components/forms/PlayerJoinForm";
import { supabase } from "@/lib/supabase";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Join Team Roster — BPL",
  description: "Register to join your team roster for the Baseball Premier League.",
};

export default async function JoinTeamPage(props: { params: Promise<{ teamId: string }> }) {
  const params = await props.params;
  const teamId = params.teamId;

  // Fetch global registration status
  const { data: settings } = await supabase
    .from("app_settings")
    .select("registrations_open")
    .eq("id", 1)
    .single();
    
  if (!settings?.registrations_open) {
    redirect("/register");
  }

  // Fetch the actual team name from the database securely
  const { data: team, error } = await supabase
    .from("teams")
    .select("team_name")
    .eq("id", teamId)
    .single();

  if (error || !team) {
    return notFound();
  }

  const teamName = team.team_name;

  // 1. HARD ROSTER CAP LOGIC
  const { count } = await supabase
    .from("players")
    .select("*", { count: "exact", head: true })
    .eq("team_id", teamId);

  const currentRosterCount = count || 0;
  const isFull = currentRosterCount >= 30;

  // 2. ROSTER CAP LOGIC — No expiry date; controlled solely by global registrations_open flag above
  // isExpired removed — registration open/close is managed via admin panel

  return (
    <div className="pt-32 pb-24">
      <div className="section-container max-w-3xl">
        <div className="text-center mb-12">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors"
            style={{ 
              background: isFull ? "rgba(245,166,35,0.1)" : "rgba(227,27,35,0.1)", 
              border: `1px solid ${isFull ? "rgba(245,166,35,0.2)" : "rgba(227,27,35,0.2)"}` 
            }}
            aria-hidden="true"
          >
            <Users size={32} style={{ color: isFull ? "var(--gold-400)" : "var(--crimson-400)" }} />
          </div>
          
          <span className={isFull ? "badge badge-gold mb-4" : "badge badge-navy mb-4"} aria-hidden="true">
            {isFull ? "Roster Full" : "Team Invitation"}
          </span>
          
          <h1 className="font-heading font-bold text-3xl sm:text-5xl mb-4" style={{ color: "var(--slate-50)" }}>
            {isFull ? teamName : <>Join <span className="gradient-text">{teamName}</span></>}
          </h1>
          
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--slate-400)" }}>
            {isFull 
              ? `This team has reached the maximum league limit of 30 registered players. No further registrations can be processed.`
              : <>You have been invited by your manager to join the roster for Season 1.<br className="hidden sm:block" /> Complete your player profile and sign the mandatory liability waiver below.</>
            }
          </p>
        </div>

        {/* Dynamic Form Controller */}
        <div className="relative">
          <div
            className="absolute -inset-4 blur-3xl opacity-20 pointer-events-none"
            style={{ background: isFull ? "var(--gold-500)" : "var(--crimson-500)" }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            {isFull ? (
              <div className="glass-card p-10 sm:p-16 text-center text-slate-300">
                <p>This team roster is full. Please contact your team manager directly.</p>
              </div>
            ) : (
              <PlayerJoinForm teamId={params.teamId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
