"use client";

import { useState } from "react";
import { Link, CreditCard, CheckCircle2, Clock } from "lucide-react";
import { buildStripeUrl } from "@/lib/stripe";

interface PlayerPaymentActionsProps {
  player: {
    id: string;
    payment_status: string | null;
    registrant_type: "adult" | "student" | string;
    full_name: string;
  };
}

export function PlayerPaymentActions({ player }: PlayerPaymentActionsProps) {
  const [copied, setCopied] = useState(false);
  const isPaid = player.payment_status === "paid";

  if (isPaid) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-bold tracking-wider uppercase">
        <CheckCircle2 size={12} />
        Paid
      </div>
    );
  }

  // Determine Stripe link
  const paymentType = player.registrant_type === "student" ? "student_player" : "adult_player";
  const stripeUrl = buildStripeUrl(paymentType, player.id);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(stripeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-500 font-bold tracking-wider uppercase">
        <Clock size={12} />
        Pending
      </div>
      
      <button
        onClick={handleCopy}
        title="Copy Payment Link for Player"
        className="px-2 py-1 rounded-md bg-[#0A1628] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5 relative group shadow-sm"
      >
        <Link size={12} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Link</span>
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-emerald-500 text-white text-[10px] rounded-md font-bold whitespace-nowrap shadow-[0_0_15px_rgba(16,185,129,0.4)] border border-emerald-400 z-10">
            Copied!
          </span>
        )}
      </button>

      <a
        href={stripeUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Pay Now using your card to clear this player's balance"
        className="px-2 py-1 rounded-md bg-crimson-500/10 border border-crimson-500/20 hover:bg-crimson-500 hover:border-crimson-500 text-crimson-400 hover:text-white transition-all flex items-center justify-center gap-1.5 shadow-sm"
      >
        <CreditCard size={12} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Pay</span>
      </a>
    </div>
  );
}
