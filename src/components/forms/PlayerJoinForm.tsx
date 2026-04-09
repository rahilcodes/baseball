"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, AlertCircle, ChevronRight, ChevronLeft, User, ShieldCheck } from "lucide-react";
import { teamPlayerSchema, type TeamPlayerFormData } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

import { OTPVerifier } from "./OTPVerifier";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="form-error" role="alert">
      <AlertCircle size={12} aria-hidden="true" />
      {message}
    </p>
  );
}

const POSITIONS = ["P", "C", "1B", "2B", "SS", "3B", "LF", "CF", "RF", "DH"] as const;

export function PlayerJoinForm({ teamId }: { teamId: string }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const [isMinor, setIsMinor] = useState(false);

  // We split the fields into logical pages, but keep the schema flat
  const STEPS = [
    { id: 1, title: "Player Details", icon: User, fields: ["fullName", "phone", "email", "dateOfBirth", "registrantType", "emergencyContactName", "emergencyContactPhone", "primaryPosition", "jerseySize"] },
    { id: 2, title: "Liability Waiver", icon: ShieldCheck, fields: ["waiverAgreed", "physicallyFit", "codeOfConductAgreed"] },
  ];

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm<TeamPlayerFormData>({
    resolver: zodResolver(teamPlayerSchema) as any,
    mode: "onBlur",
  });

  useEffect(() => {
    if (verifiedEmail) {
      setValue("email", verifiedEmail);
    }
  }, [verifiedEmail, setValue]);

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dob = new Date(e.target.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear() -
      (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);
    setIsMinor(age >= 16 && age < 18);
  };

  const currentStep = STEPS[step - 1];

  const handleNext = async () => {
    const fieldsToValidate = currentStep.fields as (keyof TeamPlayerFormData)[];
    const valid = await trigger(fieldsToValidate);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const onSubmit: SubmitHandler<TeamPlayerFormData> = async (data) => {
    try {
      const { error } = await supabase.from('players').insert([
        {
          team_id: teamId,
          full_name: data.fullName,
          phone: data.phone,
          email: data.email,
          date_of_birth: data.dateOfBirth,
          registrant_type: data.registrantType,
          guardian_name: data.guardianName || null,
          guardian_phone: data.guardianPhone || null,
          emergency_contact_name: data.emergencyContactName,
          emergency_contact_phone: data.emergencyContactPhone,
          primary_position: data.primaryPosition,
          jersey_size: data.jerseySize,
          waiver_agreed: data.waiverAgreed,
          physically_fit: data.physicallyFit,
          code_of_conduct_agreed: data.codeOfConductAgreed,
        }
      ]);

      if (error) {
        // Handle postgres foreign key error gracefully if teamId is invalid type
        if (error.code === '22P02') {
           throw new Error("Invalid Invitiation Link. Ensure you copied the full link.");
        }
        throw error;
      }
      
      setSubmitted(true);
    } catch (err: any) {
      console.error("Supabase player join error:", err);
      alert(err.message || "Registration failed. Ensure your Supabase keys are configured in .env.local.");
    }
  };

  if (submitted) {
    return (
      <div className="glass-card p-10 sm:p-16 text-center max-w-xl mx-auto">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}
        >
          <CheckCircle size={36} style={{ color: "#22C55E" }} />
        </div>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4" style={{ color: "var(--slate-50)" }}>
          You&apos;re on the Roster!
        </h2>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--slate-400)" }}>
          Welcome to the team, <strong style={{ color: "var(--slate-200)" }}>{getValues("fullName")}</strong>. 
          Your manager will receive a notification that you have completed your registration and signed the liability waiver.
        </p>
        <div className="glass-card p-4 text-sm" style={{ border: "1px solid rgba(245,166,35,0.2)", background: "rgba(245,166,35,0.03)", color: "var(--slate-400)" }}>
          <p>
            Important: Your registration fee is{" "}
            <strong style={{ color: "var(--gold-400)" }}>
              {getValues("registrantType") === "student" ? "RM 20 (Student)" : "RM 40 (Adult)"}
            </strong>
            . Please hand your fee directly to your Team Manager before opening day.
          </p>
        </div>
      </div>
    );
  }

  if (!verifiedEmail) {
    return <OTPVerifier onVerified={setVerifiedEmail} subtitle="To prevent spam, players must verify their identity via email before joining a roster." />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Player join team form">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-10 max-w-md mx-auto" role="list">
        {STEPS.map(({ id, title, icon: Icon }) => {
          const isActive = id === step;
          const isComplete = id < step;
          return (
            <div key={id} className="flex flex-col items-center flex-1 relative" role="listitem">
              {id > 1 && (
                <div
                  className="absolute left-0 right-1/2 top-5 h-px"
                  style={{ background: isComplete ? "var(--crimson-400)" : "var(--glass-border)" }}
                />
              )}
              {id < STEPS.length && (
                <div
                  className="absolute left-1/2 right-0 top-5 h-px"
                  style={{ background: id < step - 1 ? "var(--crimson-400)" : "var(--glass-border)" }}
                />
              )}
              <div
                className={cn("w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-200")}
                style={
                  isComplete
                    ? { background: "var(--crimson-400)", border: "2px solid var(--crimson-400)" }
                    : isActive
                    ? { background: "var(--navy-800)", border: "2px solid var(--crimson-400)" }
                    : { background: "var(--navy-800)", border: "2px solid var(--glass-border)" }
                }
              >
                {isComplete ? (
                  <CheckCircle size={16} style={{ color: "white" }} />
                ) : (
                  <Icon size={16} style={{ color: isActive ? "var(--crimson-400)" : "var(--slate-500)" }} />
                )}
              </div>
              <span className="text-xs font-medium mt-2 text-center" style={{ color: isActive ? "var(--slate-200)" : "var(--slate-600)" }}>
                {title}
              </span>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-6 sm:p-8 mb-6">
        <h2 className="font-heading font-bold text-xl sm:text-2xl mb-6" style={{ color: "var(--slate-50)" }}>
          {currentStep.title}
        </h2>

        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="form-label" htmlFor="fullName">Full Name *</label>
              <input id="fullName" className={cn("form-field", errors.fullName && "form-field-error")} {...register("fullName")} placeholder="As per IC / Passport" />
              <FieldError message={errors.fullName?.message} />
            </div>
            <div>
              <label className="form-label" htmlFor="phone">WhatsApp Number *</label>
              <input id="phone" type="tel" className={cn("form-field", errors.phone && "form-field-error")} {...register("phone")} placeholder="e.g. 012-345 6789" />
              <FieldError message={errors.phone?.message} />
            </div>
            <div>
              <label className="form-label" htmlFor="email">Email *</label>
              <input 
                id="email" 
                type="email" 
                className={cn("form-field text-slate-400 bg-white/5", errors.email && "form-field-error")} 
                {...register("email")} 
                readOnly 
              />
              <FieldError message={errors.email?.message} />
            </div>
            <div>
              <label className="form-label" htmlFor="dateOfBirth">Date of Birth * (16+ Only)</label>
              <input id="dateOfBirth" type="date" className={cn("form-field", errors.dateOfBirth && "form-field-error")} {...register("dateOfBirth", { onChange: handleDobChange })} />
              <FieldError message={errors.dateOfBirth?.message} />
            </div>

            {/* Fee Tier Selector */}
            <div className="sm:col-span-2">
              <label className="form-label" htmlFor="registrantType">Registration Category *</label>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <label className="cursor-pointer">
                  <input type="radio" value="student" {...register("registrantType")} className="sr-only" />
                  <div className={cn("glass-card p-4 text-center border-2 transition-all", "border-white/10 hover:border-crimson-400")} style={{ borderColor: undefined }}>
                    <p className="font-heading font-bold text-lg" style={{ color: "var(--gold-400)" }}>RM 20</p>
                    <p className="text-xs mt-1" style={{ color: "var(--slate-400)" }}>Student / College</p>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" value="adult" {...register("registrantType")} className="sr-only" />
                  <div className={cn("glass-card p-4 text-center border-2 transition-all", "border-white/10 hover:border-crimson-400")} style={{ borderColor: undefined }}>
                    <p className="font-heading font-bold text-lg" style={{ color: "var(--crimson-400)" }}>RM 40</p>
                    <p className="text-xs mt-1" style={{ color: "var(--slate-400)" }}>Working Adult</p>
                  </div>
                </label>
              </div>
              <FieldError message={(errors as any).registrantType?.message} />
            </div>

            {/* 16-17 Guardian Section */}
            {isMinor && (
              <div className="sm:col-span-2 rounded-xl p-4 border" style={{ background: "rgba(245,166,35,0.05)", borderColor: "rgba(245,166,35,0.25)" }}>
                <p className="font-semibold text-sm mb-3" style={{ color: "var(--gold-400)" }}>⚠️ Under-18 Player — Parent/Guardian Signature Required</p>
                <p className="text-xs mb-4" style={{ color: "var(--slate-400)" }}>League rule §1.10: Players aged 16–17 must have a parent/guardian co-sign the liability waiver. Please provide their details.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label" htmlFor="guardianName">Guardian Full Name *</label>
                    <input id="guardianName" className="form-field" {...register("guardianName")} placeholder="Parent / Legal Guardian" />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="guardianPhone">Guardian Phone *</label>
                    <input id="guardianPhone" type="tel" className="form-field" {...register("guardianPhone")} placeholder="e.g. 012-345 6789" />
                  </div>
                </div>
              </div>
            )}

            <div className="sm:col-span-2 border-t border-white/5 pt-4 mt-2">
              <p className="font-semibold text-white/90 mb-4">Emergency Contact & Baseball Info</p>
            </div>
            <div>
              <label className="form-label" htmlFor="emergencyContactName">Emergency Contact Name *</label>
              <input id="emergencyContactName" className={cn("form-field", errors.emergencyContactName && "form-field-error")} {...register("emergencyContactName")} />
              <FieldError message={errors.emergencyContactName?.message} />
            </div>
            <div>
              <label className="form-label" htmlFor="emergencyContactPhone">Emergency Number *</label>
              <input id="emergencyContactPhone" className={cn("form-field", errors.emergencyContactPhone && "form-field-error")} {...register("emergencyContactPhone")} />
              <FieldError message={errors.emergencyContactPhone?.message} />
            </div>
            <div>
              <label className="form-label" htmlFor="primaryPosition">Primary Position *</label>
              <select id="primaryPosition" className={cn("form-field", errors.primaryPosition && "form-field-error")} {...register("primaryPosition")}>
                <option value="">Select position</option>
                {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <FieldError message={errors.primaryPosition?.message} />
            </div>
            <div>
              <label className="form-label" htmlFor="jerseySize">Jersey Size *</label>
              <select id="jerseySize" className={cn("form-field", errors.jerseySize && "form-field-error")} {...register("jerseySize")}>
                <option value="">Select size</option>
                {["S", "M", "L", "XL", "XXL"].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <FieldError message={errors.jerseySize?.message} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div
              className="p-5 rounded-xl text-sm leading-relaxed space-y-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--glass-border)" }}
            >
              <p className="font-semibold" style={{ color: "var(--slate-200)" }}>Individual Liability Waiver</p>
              <p style={{ color: "var(--slate-400)" }}>
                By registering, you acknowledge the inherent risks of baseball (injury from balls, collisions, heat, etc.), 
                assume full responsibility for your participation, and release BPL and its organisers from liability 
                for injuries sustained during league activities (excluding gross negligence).
              </p>
              <p style={{ color: "var(--slate-400)" }}>
                You authorise BPL to seek emergency medical treatment on your behalf. You grant media consent 
                for photography during events. You agree to abide by the BPL Code of Conduct.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { name: "physicallyFit" as const, label: "I confirm I am physically fit to participate in competitive baseball." },
                { name: "codeOfConductAgreed" as const, label: "I have read and agree to the BPL Code of Conduct, including the Azan pause protocol." },
                { name: "waiverAgreed" as const, label: "I am voluntarily waiving legal rights and agree to all terms of the Liability Waiver." },
              ].map(({ name, label }) => (
                <label
                  key={name}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-colors border",
                    errors[name] ? "border-red-500/30 bg-red-500/5" : "border-white/[0.06] hover:border-white/[0.12]"
                  )}
                >
                  <input type="checkbox" className="mt-0.5 shrink-0 w-4 h-4 rounded accent-red-500" {...register(name)} />
                  <span className="text-sm leading-relaxed" style={{ color: "var(--slate-300)" }}>{label}</span>
                </label>
              ))}
            </div>
            {(errors.waiverAgreed || errors.physicallyFit || errors.codeOfConductAgreed) && (
              <p className="form-error"><AlertCircle size={14} /> Please agree to all required items.</p>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        {step > 1 ? (
          <Button type="button" variant="ghost" size="lg" onClick={() => setStep((s) => s - 1)}>
            <ChevronLeft size={18} /> Back
          </Button>
        ) : <div />}
        {step < STEPS.length ? (
          <Button type="button" variant="primary" size="lg" onClick={handleNext}>
            Continue <ChevronRight size={18} />
          </Button>
        ) : (
          <Button type="submit" variant="primary" size="lg" loading={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Join Team Roster"}
            <CheckCircle size={18} />
          </Button>
        )}
      </div>
    </form>
  );
}
