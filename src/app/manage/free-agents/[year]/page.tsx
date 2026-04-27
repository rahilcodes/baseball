import type { Metadata } from "next";
import { Users, AlertCircle, CheckCircle2, Clock, Mail, Phone, CalendarDays, ClipboardList } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { PlayerPaymentActions } from "@/components/dashboard/PlayerPaymentActions";
import { RegistrationToggle } from "@/components/dashboard/RegistrationToggle";

export const metadata: Metadata = {
  title: "League Owner Free Agents Dashboard — BPL",
  description: "Global registry of all free agent signups.",
};

export default async function ManageFreeAgentsPage(props: { params: Promise<{ year: string }> }) {
  const params = await props.params;
  const year = params.year;

  // Basic validation for year param
  if (!year || isNaN(Number(year))) {
    return notFound();
  }

  // Fetch all free agents
  const { data: freeAgents, error: faError } = await supabase
    .from("free_agents")
    .select("*")
    .order("created_at", { ascending: false });

  if (faError) {
    console.error("Failed to load free agents:", faError);
  }

  const agents = freeAgents || [];
  
  // Optionally filter by year if desired, but for now we'll just show them.
  // const yearAgents = agents.filter(fa => new Date(fa.created_at).getFullYear().toString() === year);
  
  // Calculate Metrics
  const totalCount = agents.length;
  const adultCount = agents.filter(fa => fa.registrant_type === "adult").length;
  const studentCount = agents.filter(fa => fa.registrant_type === "student").length;

  const totalFees = agents.reduce((acc, fa) => acc + (fa.registrant_type === "student" ? 20 : 40), 0);
  const collectedFees = agents.reduce((acc, fa) => acc + (fa.payment_status === "paid" ? (fa.registrant_type === "student" ? 20 : 40) : 0), 0);
  const outstandingFees = totalFees - collectedFees;
  const feeProgressPercent = totalFees > 0 ? (collectedFees / totalFees) * 100 : 0;

  const playersPaid = agents.filter(p => p.payment_status === "paid").length;
  const playersPending = totalCount - playersPaid;
  const compliancePercent = totalCount > 0 ? Math.round((playersPaid / totalCount) * 100) : 0;

  return (
    <div className="pt-32 pb-24">
      <div className="section-container max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="badge badge-crimson mb-4" aria-hidden="true">League Admin</span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl" style={{ color: "var(--slate-50)" }}>
              Free Agents
            </h1>
            <p className="text-lg mt-2" style={{ color: "var(--slate-400)" }}>
              Season: <strong style={{ color: "var(--slate-200)" }}>{year}</strong>
            </p>
          </div>
        </div>

        <RegistrationToggle />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Registration Volume */}
          <div className="glass-card p-6 relative overflow-hidden group border border-white/[0.05] hover:border-crimson-500/30 transition-colors duration-500">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-crimson-500/10 blur-[40px] rounded-full group-hover:bg-crimson-500/20 transition-colors duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white/50">
                  <Users size={16} />
                  <span className="font-bold uppercase tracking-widest text-[10px]">Registration Volume</span>
                </div>
                <span className="text-2xl font-bold text-white transition-transform group-hover:scale-105">{totalCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-6">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Adults</p>
                  <p className="text-lg text-slate-300 font-bold">{adultCount}</p>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Students</p>
                  <p className="text-lg text-slate-300 font-bold">{studentCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Extended Fee Ledger */}
          <div className="glass-card p-6 relative overflow-hidden group border border-white/[0.05] hover:border-amber-500/30 transition-colors duration-500">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 blur-[40px] rounded-full group-hover:bg-amber-500/20 transition-colors duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white/50">
                  <ClipboardList size={16} />
                  <span className="font-bold uppercase tracking-widest text-[10px]">FA Ledger</span>
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
                  ? "All Free Agents have fully paid." 
                  : `${100 - compliancePercent}% of free agents still owe fees. The system automatically handles payouts on completion.`}
              </p>
            </div>
          </div>
        </div>

        {/* Global Roster List Table */}
        <div className="glass-card overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <ClipboardList size={20} className="text-crimson-400" />
            <h2 className="font-heading font-bold text-xl text-white">Global Free Agents Roster</h2>
          </div>
          
          {totalCount === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-500 mb-4 text-lg">No free agents have registered yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.02]">
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-white/5">Player Name</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-white/5">Positions</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-white/5">Level</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-white/5">Status</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-white/5">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(agents || []).map((agent) => (
                    <tr key={agent.id} className="hover:bg-white/[0.01] transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-inner shrink-0"
                            style={{ 
                              background: `linear-gradient(135deg, hsl(${(agent.full_name.charCodeAt(0) * 137) % 360}, 70%, 20%), hsl(${(agent.full_name.charCodeAt(agent.full_name.length - 1) * 137) % 360}, 70%, 15%))`,
                              color: `hsl(${(agent.full_name.charCodeAt(0) * 137) % 360}, 100%, 85%)`,
                              border: `1px solid hsl(${(agent.full_name.charCodeAt(0) * 137) % 360}, 50%, 30%)`
                            }}
                          >
                            {agent.full_name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-white group-hover:text-crimson-400 transition-colors flex items-center gap-2">
                              {agent.full_name}
                              {agent.registrant_type === 'student' && 
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-500/20 text-purple-400 uppercase tracking-wider">Student</span>
                              }
                            </p>
                            <p className="text-[11px] text-slate-500 uppercase mt-0.5 tracking-wider">{agent.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1 items-start">
                          <span className="inline-flex items-center px-2 py-1 rounded bg-navy-800 border border-white/10 text-[10px] font-bold text-slate-300 shadow-sm">
                            <span className="text-slate-500 mr-1">PRI:</span> {agent.primary_position}
                          </span>
                          {agent.secondary_position && agent.secondary_position !== "None" && (
                             <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-slate-400">
                               <span className="text-slate-500 mr-1">SEC:</span> {agent.secondary_position}
                             </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-[11px] text-slate-400 capitalize bg-white/5 px-2 py-1 rounded-md">{agent.playing_level || 'Unknown'}</span>
                      </td>
                      <td className="p-4">
                        <PlayerPaymentActions player={agent} isFreeAgent={true} />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <a href={`tel:${agent.phone}`} className="p-1.5 rounded-lg bg-white/5 hover:bg-crimson-500/20 text-slate-400 hover:text-crimson-400 transition-all shadow-sm" aria-label="Call Player" title="Call Player">
                            <Phone size={14} />
                          </a>
                          <a href={`mailto:${agent.email}`} className="p-1.5 rounded-lg bg-white/5 hover:bg-crimson-500/20 text-slate-400 hover:text-crimson-400 transition-all shadow-sm" aria-label="Email Player" title="Email Player">
                            <Mail size={14} />
                          </a>
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
