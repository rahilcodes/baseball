"use client";

import { ClipboardList, Play, RotateCcw } from "lucide-react";
import { Button } from "./Button";

interface ResumeDraftBannerProps {
  onResume: () => void;
  onClear: () => void;
}

export function ResumeDraftBanner({ onResume, onClear }: ResumeDraftBannerProps) {
  return (
    <div className="mb-6 rounded-xl border border-[var(--gold-400)]/30 bg-[var(--gold-400)]/5 p-5 shadow-[0_0_20px_rgba(245,166,35,0.05)] backdrop-blur-sm transition-all animate-in fade-in slide-in-from-top-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="rounded-full bg-[var(--gold-400)]/10 p-2.5 text-[var(--gold-400)] shrink-0 hidden sm:block">
          <ClipboardList size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-[var(--gold-400)] text-lg mb-1">
            You have an unfinished registration!
          </h3>
          <p className="text-sm text-[var(--slate-400)] mb-0 sm:mb-2">
            We saved your progress. Would you like to resume where you left off, or start fresh?
          </p>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 sm:mt-0 w-full sm:w-auto shrink-0 justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={onClear} className="gap-2 text-[var(--slate-400)] hover:text-white flex-1 sm:flex-none">
            <RotateCcw size={14} /> Start Fresh
          </Button>
          <Button type="button" variant="primary" size="sm" onClick={onResume} className="gap-2 flex-1 sm:flex-none" style={{ background: "var(--gold-500)", color: "var(--navy-950)", border: "none" }}>
            <Play size={14} fill="currentColor" /> Resume Draft
          </Button>
        </div>
      </div>
    </div>
  );
}
