import type { Metadata } from "next";
import { Users, ClipboardList, Wallet, AlertCircle, Phone, Mail, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PlayerDeleteButton } from "@/components/dashboard/PlayerDeleteButton";

export const metadata: Metadata = {
  title: "Team Manager Dashboard — BPL",
  description: "Manage your team roster, track registrations, and monitor season progress.",
};

export default async function ManageTeamPage(props: { params: Promise<{ teamId: string }> }) {
  const params = await props.params;
  const teamId = params.teamId;

  // 1. Fetch team details
  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("*")
    .eq("id", teamId)
    .single();

  if (teamError || !team) {
    return notFound();
  }

  // 2. Fetch all players registered to this team
  const { data: players, error: playersError } = await supabase
    .from("players")
    .select("*")
    .eq("team_id", teamId)
    .order("created_at", { ascending: true });

  const rosterCount = players?.length || 0;
  const minPlayers = 9;
  const progressPercent = Math.min((rosterCount / minPlayers) * 100, 100);
  const totalFees = players?.reduce((acc, player) => acc + (player.registrant_type === "student" ? 20 : 40), 0) || 0;

  return (
    <div className="pt-32 pb-24">
      <div className="section-container">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="badge badge-crimson mb-4" aria-hidden="true">Manager Dashboard</span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl" style={{ color: "var(--slate-50)" }}>
              {team.team_name}
            </h1>
            <p className="text-lg mt-2" style={{ color: "var(--slate-400)" }}>
              Manager: <strong style={{ color: "var(--slate-200)" }}>{team.manager_name}</strong>
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Roster Progress */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white/70">
                <Users size={18} />
                <span className="text-sm font-semibold uppercase tracking-wider text-xs">Roster Progress</span>
              </div>
              <span className="text-2xl font-bold text-white">{rosterCount}/{minPlayers}</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-crimson-500 transition-all duration-1000" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-slate-500">
              {rosterCount < minPlayers 
                ? `Need ${minPlayers - rosterCount} more players for league minimum.` 
                : "League minimum reached! Roster is valid."}
            </p>
          </div>

          {/* Fee Tracker */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white/70">
                <Wallet size={18} />
                <span className="text-sm font-semibold uppercase tracking-wider text-xs">Fee Collection</span>
              </div>
              <span className="text-2xl font-bold text-white">RM {totalFees}</span>
            </div>
            <p className="text-sm text-slate-400 mb-1">Total based on {rosterCount} players.</p>
            <p className="text-xs text-slate-500 leading-tight">
              Student: RM 20 | Adult: RM 40. Bulk submission due prior to Draft Day.
            </p>
          </div>

          {/* Quick Actions / Info */}
          <div className="glass-card p-6" style={{ background: "rgba(227,27,35,0.03)", border: "1px solid rgba(227,27,35,0.1)" }}>
            <div className="flex items-center gap-2 text-crimson-400 mb-3">
              <AlertCircle size={18} />
              <span className="text-sm font-semibold uppercase tracking-wider text-xs">Management Tip</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              New players registered? Check their positions below to balance your rotation before Draft Day.
            </p>
          </div>
        </div>

        {/* Roster List Table */}
        <div className="glass-card overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <ClipboardList size={20} className="text-crimson-400" />
            <h2 className="font-heading font-bold text-xl text-white">Registered Roster</h2>
          </div>
          
          {rosterCount === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-500 mb-4 text-lg">No players have registered yet.</p>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Share your Invite Link from the registration success page with your team members on WhatsApp to start building your roster.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.02]">
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-white/5">Player Name</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-white/5">Position</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-white/5">Jersey</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-white/5">Compliance</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-white/5">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(players || []).map((player) => (
                    <tr key={player.id} className="hover:bg-white/[0.01] transition-colors group">
                      <td className="p-4">
                        <p className="font-semibold text-white group-hover:text-crimson-400 transition-colors">{player.full_name}</p>
                        <p className="text-xs text-slate-500 uppercase mt-0.5">{player.email}</p>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2 py-1 rounded bg-navy-800 border border-white/10 text-xs font-bold text-slate-300">
                          {player.primary_position}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-slate-400 font-mono">{player.jersey_size}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-xs text-green-500 font-medium">
                          <CheckCircle2 size={14} />
                          Waiver Signed
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <a href={`tel:${player.phone}`} className="p-2 rounded-lg bg-white/5 hover:bg-crimson-500/20 text-slate-400 hover:text-crimson-400 transition-all" aria-label="Call Player" title="Call Player">
                            <Phone size={14} />
                          </a>
                          <a href={`mailto:${player.email}`} className="p-2 rounded-lg bg-white/5 hover:bg-crimson-500/20 text-slate-400 hover:text-crimson-400 transition-all" aria-label="Email Player" title="Email Player">
                            <Mail size={14} />
                          </a>
                          
                          {/* The interactive delete component */}
                          <PlayerDeleteButton playerId={player.id} playerName={player.full_name} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
