"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Power, PowerOff } from "lucide-react";

export function RegistrationToggle() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    async function fetchStatus() {
      const { data, error } = await supabase
        .from("app_settings")
        .select("registrations_open")
        .eq("id", 1)
        .single();
      
      if (!error && data) {
        setIsOpen(data.registrations_open);
      }
      setLoading(false);
    }
    fetchStatus();
  }, []);

  const handleToggle = async () => {
    setUpdating(true);
    const newValue = !isOpen;
    
    // Optimistic UI update
    setIsOpen(newValue);
    
    const { error } = await supabase
      .from("app_settings")
      .update({ registrations_open: newValue, updated_at: new Date().toISOString() })
      .eq("id", 1);
      
    if (error) {
      console.error("Failed to update status:", error);
      // Revert if failed
      setIsOpen(!newValue);
    }
    setUpdating(false);
  };

  if (loading) {
    return <div className="h-24 w-full bg-white/5 animate-pulse rounded-2xl" />;
  }

  return (
    <div className="glass-card p-6 relative overflow-hidden group border border-white/[0.05] flex items-center justify-between mb-8">
      <div 
        className="absolute -top-12 -right-12 w-32 h-32 blur-[40px] rounded-full transition-colors duration-500" 
        style={{ backgroundColor: isOpen ? "rgba(16, 185, 129, 0.1)" : "rgba(227, 27, 35, 0.1)" }}
      />
      
      <div>
        <h3 className="font-heading font-bold text-xl text-white mb-1">Global Registration Status</h3>
        <p className="text-sm text-slate-400">
          Toggle to instantly open or close registrations across the entire platform.
        </p>
      </div>

      <button
        onClick={handleToggle}
        disabled={updating}
        className={`relative flex items-center gap-3 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg overflow-hidden group/btn ${
          isOpen 
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20" 
            : "bg-crimson-500/10 text-crimson-400 border border-crimson-500/30 hover:bg-crimson-500/20"
        } ${updating ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
      >
        {isOpen ? <Power size={18} /> : <PowerOff size={18} />}
        <span>{isOpen ? "LIVE (OPEN)" : "CLOSED"}</span>
      </button>
    </div>
  );
}
