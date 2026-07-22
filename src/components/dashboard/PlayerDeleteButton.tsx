"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface PlayerDeleteButtonProps {
  playerId: string;
  playerName: string;
  adminSecret?: string;
}

export function PlayerDeleteButton({ playerId, playerName, adminSecret }: PlayerDeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirm = window.confirm(`Are you sure you want to remove ${playerName} from the roster? This cannot be undone.`);
    
    if (confirm) {
      setIsDeleting(true);
      try {
        const res = await fetch("/api/admin/delete-player", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-secret": adminSecret || "",
          },
          body: JSON.stringify({ playerId }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Delete failed");
        }

        // Refresh the server component to instantly update the roster table
        router.refresh();
      } catch (err: any) {
        console.error("Failed to delete player:", err);
        alert("Failed to remove player: " + (err.message || "Unknown error"));
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
