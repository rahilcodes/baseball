import type { Metadata } from "next";
import { Users, ClipboardList, Wallet, AlertCircle, Phone, Mail, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PlayerDeleteButton } from "@/components/dashboard/PlayerDeleteButton";
import { PlayerPaymentActions } from "@/components/dashboard/PlayerPaymentActions";

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
  
  // Financial & Compliance calculations
  const totalFees = players?.reduce((acc, player) => acc + (player.registrant_type === "student" ? 20 : 40), 0) || 0;
  const collectedFees = players?.reduce((acc, player) => acc + (player.payment_status === "paid" ? (player.registrant_type === "student" ? 20 : 40) : 0), 0) || 0;
  const outstandingFees = totalFees - collectedFees;
  const feeProgressPercent = totalFees > 0 ? (collectedFees / totalFees) * 100 : 0;

  const playersPaid = players?.filter(p => p.payment_status === "paid").length || 0;
  const playersPending = rosterCount - playersPaid;
  const compliancePercent = rosterCount > 0 ? Math.round((playersPaid / rosterCount) * 100) : 0;

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
          <div className="glass-card p-6 relative overflow-hidden group border border-white/[0.05] hover:border-crimson-500/30 transition-colors duration-500">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-crimson-500/10 blur-[40px] rounded-full group-hover:bg-crimson-500/20 transition-colors duration-500" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white/50">
                  <Users size={16} />
                  <span className="font-bold uppercase tracking-widest text-[10px]">Roster Progress</span>
                </div>
                <span className="text-2xl font-bold text-white transition-transform group-hover:scale-105">{rosterCount}/{minPlayers}</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-crimson-500 transition-all duration-1000" 
                  style={{ width: `${progressPercent}%`, boxShadow: "0 0 10px rgba(227,27,35,0.5)" }}
                />
              </div>
              <p className="text-xs text-slate-500">
                {rosterCount < minPlayers 
                  ? `Need ${minPlayers - rosterCount} more players for league minimum.` 
                  : "League minimum reached! Roster is valid."}
              </p>
            </div>
          </div>

          {/* Extended Fee Ledger */}
          <div className="glass-card p-6 relative overflow-hidden group border border-white/[0.05] hover:border-amber-500/30 transition-colors duration-500">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 blur-[40px] rounded-full group-hover:bg-amber-500/20 transition-colors duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white/50">
                  <Wallet size={16} />
                  <span className="font-bold uppercase tracking-widest text-[10px]">Ledger</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest mr-2">Expected</span>
                  <span className="text-lg font-bold text-white">RM {totalFees}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-amber-500/10 rounded-full overflow-hidden mb-4 flex">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-1000" 
                  style={{ width: `${feeProgressPercent}%`, boxShadow: feeProgressPercent > 0 ? "0 0 10px rgba(16,185,129,0.5)" : "none" }}
                />
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-500/80 mb-0.5 font-bold">Collected</p>
                  <p className="text-xl font-bold text-emerald-400">RM {collectedFees}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-amber-500/80 mb-0.5 font-bold">Outstanding</p>
                  <p className="text-xl font-bold text-amber-400">RM {outstandingFees}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Compliance */}
          <div className="glass-card p-6 relative overflow-hidden group border border-blue-500/10 hover:border-blue-500/30 transition-colors duration-500" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.03) 0%, rgba(2,11,24,0.5) 100%)" }}>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full group-hover:bg-blue-500/20 transition-colors duration-500" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 text-blue-400 mb-5">
                  <AlertCircle size={16} />
                  <span className="font-bold uppercase tracking-widest text-[10px]">Payment Compliance</span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <span className="text-xl font-bold text-emerald-400">{playersPaid}</span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Paid</span>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                    <span className="text-xl font-bold text-amber-500">{playersPending}</span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Due</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed mt-2 pt-4 border-t border-white/5">
                {playersPending === 0 
                  ? "All players cleared! Roster fees are fully collected." 
                  : `${100 - compliancePercent}% of players still owe fees. Use the Link button below to remind them.`}
              </p>
            </div>
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
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-white/5">Payment</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-white/5">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(players || []).map((player) => (
                    <tr key={player.id} className="hover:bg-white/[0.01] transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-inner shrink-0"
                            style={{ 
                              background: `linear-gradient(135deg, hsl(${(player.full_name.charCodeAt(0) * 137) % 360}, 70%, 20%), hsl(${(player.full_name.charCodeAt(player.full_name.length - 1) * 137) % 360}, 70%, 15%))`,
                              color: `hsl(${(player.full_name.charCodeAt(0) * 137) % 360}, 100%, 85%)`,
                              border: `1px solid hsl(${(player.full_name.charCodeAt(0) * 137) % 360}, 50%, 30%)`
                            }}
                          >
                            {player.full_name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-white group-hover:text-crimson-400 transition-colors">{player.full_name}</p>
                            <p className="text-[11px] text-slate-500 uppercase mt-0.5 tracking-wider">{player.email}</p>
                          </div>
                        </div>
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
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-bold tracking-wider uppercase">
                          <CheckCircle2 size={12} />
                          Waiver
                        </div>
                      </td>
                      <td className="p-4">
                        <PlayerPaymentActions player={player} />
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
