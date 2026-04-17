"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, AlertCircle, Users, ChevronRight, ChevronLeft, ShieldCheck, Link2, Copy } from "lucide-react";
import { teamSchema, type TeamFormData } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { OTPVerifier } from "./OTPVerifier";
import { useFormDraft } from "@/hooks/useFormDraft";
import { ResumeDraftBanner } from "@/components/ui/ResumeDraftBanner";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="form-error" role="alert">
      <AlertCircle size={12} aria-hidden="true" />
      {message}
    </p>
  );
}

const STEPS = [
  { id: 1, title: "Team Details", icon: Users },
  { id: 2, title: "Compliance", icon: ShieldCheck },
];

export function TeamRegistrationForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  // In a real app, this would be returned by the API
  const [generatedTeamId, setGeneratedTeamId] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    watch,
    reset,
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema) as any,
    mode: "onBlur",
  });

  const { savedDraft, saveDraft, clearDraft } = useFormDraft<TeamFormData>("bpl_draft_team");
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const showBanner = !!savedDraft && !bannerDismissed && !submitted;

  const handleResume = () => {
    if (savedDraft) {
      reset(savedDraft.values);
      setStep(savedDraft.step);
      setBannerDismissed(true);
    }
  };

  const handleStartFresh = () => {
    clearDraft();
    setBannerDismissed(true);
  };

  // Auto-save on step change
  useEffect(() => {
    if (verifiedEmail) {
      saveDraft(step, getValues());
    }
  }, [step, verifiedEmail, getValues, saveDraft]);

  // Auto-save on form values change
  useEffect(() => {
    const sub = watch(() => {
      if (verifiedEmail) {
        saveDraft(step, getValues());
      }
    });
    return () => sub.unsubscribe();
  }, [watch, step, verifiedEmail, getValues, saveDraft]);

  useEffect(() => {
    if (verifiedEmail) {
      setValue("managerEmail", verifiedEmail);
    }
  }, [verifiedEmail, setValue]);

  const handleNext = async () => {
    const step1Fields: (keyof TeamFormData)[] = ["teamName", "uniformColorHome", "uniformColorAway", "managerName", "managerPhone", "managerEmail"];
    const valid = await trigger(step1Fields);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const onSubmit: SubmitHandler<TeamFormData> = async (data) => {
    try {
      // Insert team into database and request the generated row back (for the UUID)
      const { data: insertedData, error } = await supabase.from('teams').insert([
        {
          team_name: data.teamName,
          uniform_color_home: data.uniformColorHome,
          uniform_color_away: data.uniformColorAway,
          manager_name: data.managerName,
          manager_phone: data.managerPhone,
          manager_email: data.managerEmail,
          waiver_agreed: data.waiverAgreed,
          code_of_conduct_agreed: data.codeOfConductAgreed,
        }
      ]).select('id').single();

      if (error) throw error;
      
      // Use the actual database UUID for the invite link
      const teamId = insertedData.id;
      setGeneratedTeamId(teamId);

      // Fire-and-forget: send branded welcome + team alert emails via Resend
      fetch('/api/team-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName: data.teamName,
          managerName: data.managerName,
          managerEmail: data.managerEmail,
          teamId,
          uniformColorHome: data.uniformColorHome,
          uniformColorAway: data.uniformColorAway,
        }),
      }).catch(console.error);

      clearDraft();
      setSubmitted(true);
    } catch (err) {
      console.error("Supabase team insert error:", err);
      alert("Registration failed. Please make sure your Supabase keys are configured in .env.local.");
    }
  };


  const handleCopyLink = async () => {
    const link = `${window.location.origin}/register/team/join/${generatedTeamId}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  if (submitted) {
    const vals = getValues();
    const inviteLink = `${window.location.origin}/register/team/join/${generatedTeamId}`;
    
    return (
      <div className="glass-card p-8 sm:p-12 text-center max-w-2xl mx-auto">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]"
          style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}
        >
          <CheckCircle size={36} style={{ color: "#22C55E" }} />
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4" style={{ color: "var(--slate-50)" }}>
          Team Created!
        </h2>
        <p className="text-base sm:text-lg mb-8" style={{ color: "var(--slate-400)" }}>
          <strong style={{ color: "var(--slate-200)" }}>{vals.teamName}</strong> is officially registered. Now it&apos;s time to build your roster.
        </p>

        {/* The Invite Link Section */}
        <div className="glass-card p-6 sm:p-8 mb-8 text-left" style={{ border: "1px solid rgba(245,166,35,0.3)", background: "rgba(245,166,35,0.03)" }}>
          <div className="flex items-center gap-3 mb-2">
            <Link2 size={18} style={{ color: "var(--gold-400)" }} />
            <h3 className="font-heading font-bold text-lg" style={{ color: "var(--slate-50)" }}>1. Your Roster Invite Link</h3>
          </div>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--slate-400)" }}>
            Share this link in your team WhatsApp group. Players must use this link to register themselves onto your roster and sign their individual waivers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
            <div 
              className="flex-1 w-full p-3 bg-black/40 border border-white/10 rounded-xl overflow-hidden"
              style={{ fontFamily: "monospace" }}
            >
              <p className="text-sm truncate w-full text-white/80 select-all tracking-tight">
                {inviteLink}
              </p>
            </div>
            <Button type="button" variant="primary" className="shrink-0 w-full sm:w-auto" onClick={handleCopyLink}>
              {copied ? (
                <>Copied! <CheckCircle size={16} /></>
              ) : (
                <>Copy Link <Copy size={16} /></>
              )}
            </Button>
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Users size={18} style={{ color: "var(--crimson-400)" }} />
              <h3 className="font-heading font-bold text-lg" style={{ color: "var(--slate-50)" }}>2. Team Manager Dashboard</h3>
            </div>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--slate-400)" }}>
              <strong>Secret Link — Do not share with players.</strong> Use this dashboard to track who has registered, monitor your roster progress, and track team fees.
            </p>
            <Button 
              type="button" 
              variant="secondary" 
              className="w-full sm:w-auto"
              onClick={() => window.open(`/manage/team/${generatedTeamId}`, '_blank')}
            >
              Open Dashboard
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: "var(--slate-500)" }}>
          Commissioner Basit will contact <strong style={{ color: "var(--slate-300)" }}>{vals.managerName}</strong> on WhatsApp with
          fixture details and bulk payment instructions (RM 20 per registered player).
        </p>
      </div>
    );
  }

  if (!verifiedEmail) {
    return (
      <>
        {showBanner && (
          <ResumeDraftBanner onResume={handleResume} onClear={handleStartFresh} />
        )}
        <OTPVerifier 
          onVerified={setVerifiedEmail} 
          title="Manager Identity"
          subtitle="To prevent unauthorized edits and spam, Team Managers must verify their email address before creating a roster." 
          defaultEmail={savedDraft?.values.managerEmail || ""}
        />
      </>
    );
  }

  return (
    <>
      {showBanner && (
        <ResumeDraftBanner onResume={handleResume} onClear={handleStartFresh} />
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Team registration form">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-10 max-w-md mx-auto" role="list" aria-label="Registration steps">
        {STEPS.map(({ id, title, icon: Icon }) => {
          const isActive = id === step;
          const isComplete = id < step;
          return (
            <div key={id} className="flex flex-col items-center flex-1 relative" role="listitem" aria-current={isActive ? "step" : undefined}>
              {id > 1 && (
                <div
                  className="absolute left-0 right-1/2 top-5 h-px"
                  style={{ background: isComplete ? "var(--crimson-400)" : "var(--glass-border)" }}
                  aria-hidden="true"
                />
              )}
              {id < STEPS.length && (
                <div
                  className="absolute left-1/2 right-0 top-5 h-px"
                  style={{ background: id < step - 1 ? "var(--crimson-400)" : "var(--glass-border)" }}
                  aria-hidden="true"
                />
              )}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all"
                style={
                  isComplete
                    ? { background: "var(--crimson-400)", border: "2px solid var(--crimson-400)" }
                    : isActive
                    ? { background: "var(--navy-800)", border: "2px solid var(--crimson-400)" }
                    : { background: "var(--navy-800)", border: "2px solid var(--glass-border)" }
                }
              >
                {isComplete ? (
                  <CheckCircle size={16} style={{ color: "white" }} aria-hidden="true" />
                ) : (
                  <Icon size={16} style={{ color: isActive ? "var(--crimson-400)" : "var(--slate-500)" }} aria-hidden="true" />
                )}
              </div>
              <span className="text-xs font-medium mt-2 text-center" style={{ color: isActive ? "var(--slate-200)" : "var(--slate-600)" }}>
                {title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step 1: Team Details */}
      {step === 1 && (
        <div className="glass-card p-6 sm:p-8 mb-6">
          <h2 className="font-heading font-bold text-xl sm:text-2xl mb-6" style={{ color: "var(--slate-50)" }}>
            Team & Manager Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="form-label" htmlFor="teamName">Team Name *</label>
              <input id="teamName" className={cn("form-field", errors.teamName && "form-field-error")} {...register("teamName")} placeholder="e.g. Selangor Sluggers" />
              <FieldError message={errors.teamName?.message} />
            </div>
            <div>
              <label className="form-label" htmlFor="uniformColorHome">Home Uniform Colour *</label>
              <input id="uniformColorHome" className={cn("form-field", errors.uniformColorHome && "form-field-error")} {...register("uniformColorHome")} placeholder="e.g. Navy Blue" />
              <FieldError message={errors.uniformColorHome?.message} />
            </div>
            <div>
              <label className="form-label" htmlFor="uniformColorAway">Away Uniform Colour *</label>
              <input id="uniformColorAway" className={cn("form-field", errors.uniformColorAway && "form-field-error")} {...register("uniformColorAway")} placeholder="e.g. White" />
              <FieldError message={errors.uniformColorAway?.message} />
            </div>
            <div className="sm:col-span-2 mt-4 pt-4 border-t border-white/5">
              <p className="font-heading font-semibold text-lg text-white mb-4">Manager Profile</p>
            </div>
            <div className="sm:col-span-2">
              <label className="form-label" htmlFor="managerName">Manager Full Name *</label>
              <input id="managerName" className={cn("form-field", errors.managerName && "form-field-error")} {...register("managerName")} placeholder="Full name" />
              <FieldError message={errors.managerName?.message} />
            </div>
            <div>
              <label className="form-label" htmlFor="managerPhone">Manager WhatsApp *</label>
              <input id="managerPhone" type="tel" className={cn("form-field", errors.managerPhone && "form-field-error")} {...register("managerPhone")} placeholder="e.g. 012-345 6789" />
              <FieldError message={errors.managerPhone?.message} />
            </div>
            <div>
              <label className="form-label" htmlFor="managerEmail">Manager Email *</label>
              <input 
                id="managerEmail" 
                type="email" 
                className={cn("form-field text-slate-400 bg-white/5", errors.managerEmail && "form-field-error")} 
                {...register("managerEmail")} 
                readOnly 
              />
              <FieldError message={errors.managerEmail?.message} />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Compliance */}
      {step === 2 && (
        <div className="glass-card p-6 sm:p-8 mb-6 space-y-5">
          <h2 className="font-heading font-bold text-xl sm:text-2xl" style={{ color: "var(--slate-50)" }}>Manager Agreement</h2>
          <div
            className="p-5 rounded-xl text-sm leading-relaxed"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--glass-border)" }}
          >
            <p className="font-semibold mb-2" style={{ color: "var(--slate-200)" }}>New Roster Process Requirements</p>
            <p style={{ color: "var(--slate-400)" }}>
              After completing this step, you will be given a secure Invite Link. <strong>You must share this link with your players.</strong> 
              Every player must click the link to register their details and legally sign their own liability waiver. 
              Your team will not be officially scheduled until at least 12 players have completed their registration via your link.
            </p>
            <p className="mt-3" style={{ color: "var(--slate-400)" }}>
              As team manager, you remain responsible for your team&apos;s conduct, including associated spectators, and for collecting the bulk RM 20/player fee.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { name: "codeOfConductAgreed" as const, label: "I have read the BPL Manager Code of Conduct and accept full responsibility for my team's adherence to league rules." },
              { name: "waiverAgreed" as const, label: "I agree to the BPL Liability Waiver in my capacity as Manager, and understand players must sign their own." },
            ].map(({ name, label }) => (
              <label
                key={name}
                className="flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-colors border"
                style={errors[name] ? { borderColor: "rgba(227,27,35,0.3)", background: "rgba(227,27,35,0.04)" } : { borderColor: "var(--glass-border)" }}
              >
                <input type="checkbox" className="mt-0.5 shrink-0 w-4 h-4 rounded" {...register(name)} aria-required="true" />
                <span className="text-sm leading-relaxed" style={{ color: "var(--slate-300)" }}>{label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        {step > 1 ? (
          <Button type="button" variant="ghost" size="lg" onClick={() => setStep((s) => s - 1)}>
            <ChevronLeft size={18} aria-hidden="true" /> Back
          </Button>
        ) : <div />}
        {step < STEPS.length ? (
          <Button type="button" variant="primary" size="lg" onClick={handleNext}>
            Continue <ChevronRight size={18} aria-hidden="true" />
          </Button>
        ) : (
          <Button type="submit" variant="primary" size="lg" loading={isSubmitting}>
            {isSubmitting ? "Generating Link..." : "Create Team & Get Link"}
            <Link2 size={18} aria-hidden="true" />
          </Button>
        )}
      </div>
    </form>
    </>
  );
}
