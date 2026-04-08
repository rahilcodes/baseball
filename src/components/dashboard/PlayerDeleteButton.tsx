"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface PlayerDeleteButtonProps {
  playerId: string;
  playerName: string;
}

export function PlayerDeleteButton({ playerId, playerName }: PlayerDeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirm = window.confirm(`Are you sure you want to remove ${playerName} from the roster? This cannot be undone.`);
    
    if (confirm) {
      setIsDeleting(true);
      try {
        const { error } = await supabase
          .from("players")
          .delete()
          .eq("id", playerId);

        if (error) throw error;
        
        // Refresh the server component to instantly update the roster table
        router.refresh();
      } catch (err: any) {
        console.error("Failed to delete player:", err);
        alert("Failed to remove player. Ensure database permissions are updated.");
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`p-2 rounded-lg bg-white/5 transition-all ${
        isDeleting 
          ? "opacity-50 cursor-not-allowed" 
          : "hover:bg-red-500/20 text-slate-400 hover:text-red-500"
      }`}
      aria-label={`Remove ${playerName}`}
      title="Remove Player"
    >
      <Trash2 size={14} />
    </button>
  );
}
