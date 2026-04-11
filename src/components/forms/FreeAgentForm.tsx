"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, User, Target, ShieldCheck } from "lucide-react";
import { freeAgentSchema, type FreeAgentFormData } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { OTPVerifier } from "./OTPVerifier";
import { buildStripeUrl } from "@/lib/stripe";
import { DateOfBirthPicker } from "@/components/ui/DateOfBirthPicker";

const STEPS = [
  { id: 1, title: "Personal Info", icon: User, fields: ["fullName", "dateOfBirth", "registrantType", "nationality", "phone", "email", "emergencyContactName", "emergencyContactPhone", "medicalConditions", "jerseySize"] },
  { id: 2, title: "Baseball Profile", icon: Target, fields: ["primaryPosition", "secondaryPosition", "experienceLevel", "yearsPlaying"] },
  { id: 3, title: "Compliance & Waiver", icon: ShieldCheck, fields: ["waiverAgreed", "physicallyFit", "codeOfConductAgreed"] },
];

const POSITIONS = ["P", "C", "1B", "2B", "SS", "3B", "LF", "CF", "RF", "DH"] as const;
const NATIONALITIES = ["Malaysian", "Japanese", "Korean", "American", "Filipino", "Taiwanese", "British", "Australian", "Other"];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="form-error" role="alert">
      <AlertCircle size={12} aria-hidden="true" />
      {message}
    </p>
  );
}

export function FreeAgentForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const [isMinor, setIsMinor] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm<FreeAgentFormData>({
    resolver: zodResolver(freeAgentSchema) as any,
    mode: "onBlur",
    defaultValues: { yearsPlaying: 0 },
  });

  const selectedType = watch("registrantType");

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
    const fieldsToValidate = currentStep.fields as (keyof FreeAgentFormData)[];
    const valid = await trigger(fieldsToValidate);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const onSubmit: SubmitHandler<FreeAgentFormData> = async (data) => {
    try {
      const { data: insertedData, error } = await supabase.from('free_agents').insert([
        {
          full_name: data.fullName,
          date_of_birth: data.dateOfBirth,
          registrant_type: data.registrantType,
          guardian_name: data.guardianName || null,
          guardian_phone: data.guardianPhone || null,
          nationality: data.nationality,
          phone: data.phone,
          email: data.email,
          emergency_contact_name: data.emergencyContactName,
          emergency_contact_phone: data.emergencyContactPhone,
          medical_conditions: data.medicalConditions || null,
          jersey_size: data.jerseySize,
          primary_position: data.primaryPosition,
          secondary_position: data.secondaryPosition || null,
          experience_level: data.experienceLevel,
          years_playing: data.yearsPlaying,
          waiver_agreed: data.waiverAgreed,
          physically_fit: data.physicallyFit,
          code_of_conduct_agreed: data.codeOfConductAgreed,
          payment_status: 'pending',
        }
      ]).select('id').single();

      if (error) throw error;

      // Fire-and-forget: send branded welcome email via Resend
      fetch('/api/free-agent-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          primaryPosition: data.primaryPosition,
          experienceLevel: data.experienceLevel,
          registrantType: data.registrantType,
        }),
      }).catch(console.error);

      // Redirect to Stripe Payment Link with this record's ID embedded
      const paymentType = data.registrantType === 'student' ? 'student_player' : 'adult_player';
      const stripeUrl = buildStripeUrl(paymentType, insertedData.id);
      window.location.href = stripeUrl;
    } catch (err) {
      console.error("Supabase insert error:", err);
      alert("Registration failed. Please make sure your Supabase keys are configured in .env.local.");
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
          You&apos;re registered!
        </h2>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--slate-400)" }}>
          Welcome to BPL Season 1, <strong style={{ color: "var(--slate-200)" }}>{getValues("fullName")}</strong>.
        </p>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--slate-500)" }}>
          Next steps: Attend the assessment session on{" "}
          <span style={{ color: "var(--crimson-400)" }}>April 19 or 20</span> at UPM.
          Commissioner Basit will contact you on WhatsApp with details.
        </p>
        <div className="glass-card p-4 text-sm" style={{ color: "var(--slate-400)" }}>
          <p>
            Registration fee: <strong style={{ color: "var(--slate-200)" }}>
              {getValues("registrantType") === "student" ? "RM 20 (Student)" : "RM 40 (Adult)"}
            </strong> — pay on assessment day.
          </p>
        </div>
      </div>
    );
  }

  if (!verifiedEmail) {
    return (
      <OTPVerifier 
        onVerified={setVerifiedEmail} 
        title="Free Agent Identity"
        subtitle="To prevent span and ensure draft integrity, please verify your email address before joining the draft pool." 
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Free agent registration form">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-10" role="list" aria-label="Registration steps">
        {STEPS.map(({ id, title, icon: Icon }) => {
          const isActive = id === step;
          const isComplete = id < step;
          return (
            <div
              key={id}
              className="flex flex-col items-center flex-1 relative"
              role="listitem"
              aria-current={isActive ? "step" : undefined}
              aria-label={`Step ${id}: ${title}${isComplete ? " (completed)" : ""}`}
            >
              {/* Connector line */}
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
              {/* Circle */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-200",
                )}
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
              <span
                className="text-xs font-medium mt-2 text-center hidden sm:block"
                style={{ color: isActive ? "var(--slate-200)" : "var(--slate-600)" }}
              >
                {title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="glass-card p-6 sm:p-8 mb-6">
        <h2 className="font-heading font-bold text-xl sm:text-2xl mb-6" style={{ color: "var(--slate-50)" }}>
          {currentStep.title}
        </h2>

        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="form-label" htmlFor="fullName">Full Name *</label>
              <input id="fullName" className={cn("form-field", errors.fullName && "form-field-error")} {...register("fullName")} placeholder="As per IC / Passport" autoComplete="name" />
              <FieldError message={errors.fullName?.message} />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Date of Birth * (16+ Only) — MM / DD / YYYY</label>
              <DateOfBirthPicker
                id="dateOfBirth"
                hasError={!!errors.dateOfBirth}
                onChange={(val) => {
                  setValue("dateOfBirth", val, { shouldValidate: true });
                  if (val) handleDobChange({ target: { value: val } } as any);
                }}
              />
              <FieldError message={errors.dateOfBirth?.message} />
            </div>

            {/* Fee Tier Selector */}
            <div className="sm:col-span-2 mt-2">
              <label className="form-label" htmlFor="registrantType">Registration Category *</label>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <label className="cursor-pointer">
                  <input type="radio" value="student" {...register("registrantType")} className="sr-only" />
                  <div
                    className="glass-card p-4 text-center border-2 transition-all"
                    style={{ borderColor: selectedType === "student" ? "var(--gold-400)" : "rgba(255,255,255,0.1)" }}
                  >
                    <p className="font-heading font-bold text-lg" style={{ color: "var(--gold-400)" }}>RM 20</p>
                    <p className="text-xs mt-1" style={{ color: "var(--slate-400)" }}>Student / College</p>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" value="adult" {...register("registrantType")} className="sr-only" />
                  <div
                    className="glass-card p-4 text-center border-2 transition-all"
                    style={{ borderColor: selectedType === "adult" ? "var(--crimson-400)" : "rgba(255,255,255,0.1)" }}
                  >
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

            <div>
              <label className="form-label" htmlFor="nationality">Nationality *</label>
              <select id="nationality" className={cn("form-field", errors.nationality && "form-field-error")} {...register("nationality")}>
                <option value="">Select nationality</option>
                {NATIONALITIES.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              <FieldError message={errors.nationality?.message} />
            </div>
            <div>
              <label className="form-label" htmlFor="phone">WhatsApp Number *</label>
              <input id="phone" type="tel" className={cn("form-field", errors.phone && "form-field-error")} {...register("phone")} placeholder="e.g. 012-345 6789" autoComplete="tel" />
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
              <label className="form-label" htmlFor="emergencyContactName">Emergency Contact Name *</label>
              <input id="emergencyContactName" className={cn("form-field", errors.emergencyContactName && "form-field-error")} {...register("emergencyContactName")} placeholder="Full name" autoComplete="off" />
              <FieldError message={errors.emergencyContactName?.message} />
            </div>
            <div>
              <label className="form-label" htmlFor="emergencyContactPhone">Emergency Contact Phone *</label>
              <input id="emergencyContactPhone" type="tel" className={cn("form-field", errors.emergencyContactPhone && "form-field-error")} {...register("emergencyContactPhone")} placeholder="e.g. 011-234 5678" autoComplete="off" />
              <FieldError message={errors.emergencyContactPhone?.message} />
            </div>
            <div>
              <label className="form-label" htmlFor="jerseySize">Jersey Size *</label>
              <select id="jerseySize" className={cn("form-field", errors.jerseySize && "form-field-error")} {...register("jerseySize")}>
                <option value="">Select size</option>
                {["S", "M", "L", "XL", "XXL"].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <FieldError message={errors.jerseySize?.message} />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label" htmlFor="medicalConditions">Medical Conditions / Allergies (optional)</label>
              <textarea
                id="medicalConditions"
                rows={2}
                className="form-field resize-none"
                {...register("medicalConditions")}
                placeholder="e.g. Asthma, penicillin allergy, knee injury..."
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="form-label" htmlFor="primaryPosition">Primary Position *</label>
              <select id="primaryPosition" className={cn("form-field", errors.primaryPosition && "form-field-error")} {...register("primaryPosition")}>
                <option value="">Select position</option>
                {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <FieldError message={errors.primaryPosition?.message} />
            </div>
            <div>
              <label className="form-label" htmlFor="secondaryPosition">Secondary Position</label>
              <select id="secondaryPosition" className="form-field" {...register("secondaryPosition")}>
                <option value="N/A">None / N/A</option>
                {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label" htmlFor="experienceLevel">Experience Level *</label>
              <select id="experienceLevel" className={cn("form-field", errors.experienceLevel && "form-field-error")} {...register("experienceLevel")}>
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <FieldError message={errors.experienceLevel?.message} />
            </div>
            <div>
              <label className="form-label" htmlFor="yearsPlaying">Years Playing Baseball</label>
              <input id="yearsPlaying" type="number" min={0} max={40} className="form-field" {...register("yearsPlaying", { valueAsNumber: true })} />
              <FieldError message={errors.yearsPlaying?.message} />
            </div>
            {/* Assessment info */}
            <div className="sm:col-span-2 glass-card p-5" style={{ borderColor: "rgba(245,166,35,0.2)", background: "rgba(245,166,35,0.03)" }}>
              <p className="font-heading font-semibold text-sm mb-1" style={{ color: "var(--gold-400)" }}>
                Assessment Session
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--slate-400)" }}>
                Free agents are evaluated on April 19 or 20 at UPM. Skills tested: Throwing, Fielding (Ground + Fly), 
                Hitting, Base Running, Pitching (optional), and Game IQ. Rating: 1–5 per skill.
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            {/* Waiver summary */}
            <div
              className="p-5 rounded-xl text-sm leading-relaxed space-y-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--glass-border)" }}
            >
              <p className="font-semibold" style={{ color: "var(--slate-200)" }}>BPL Player Liability Waiver — Summary</p>
              <p style={{ color: "var(--slate-400)" }}>
                By registering, you acknowledge the inherent risks of baseball (injury from balls, collisions, heat, etc.), 
                assume full responsibility for your participation, and release BPL and its organisers from liability 
                for injuries sustained during league activities (excluding gross negligence).
              </p>
              <p style={{ color: "var(--slate-400)" }}>
                You authorise BPL to seek emergency medical treatment on your behalf. You grant media consent 
                for photography and filming during events. You agree to abide by the BPL Code of Conduct.
              </p>
              <p className="text-xs" style={{ color: "var(--slate-600)" }}>
                Electronic signatures are recognised under the Electronic Commerce Act 2006 (Malaysia).
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              {[
                { name: "physicallyFit" as const, label: "I confirm I am physically fit to participate in competitive baseball and have not been advised against such by a medical professional." },
                { name: "codeOfConductAgreed" as const, label: "I have read and agree to the BPL Code of Conduct, including the Azan pause protocol, and accept all disciplinary processes." },
                { name: "waiverAgreed" as const, label: "I have read, understood, and agree to ALL terms of the BPL Player Liability Waiver. I am voluntarily waiving legal rights." },
              ].map(({ name, label }) => (
                <label
                  key={name}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-colors",
                    "border",
                    errors[name] ? "border-red-500/30 bg-red-500/5" : "border-white/[0.06] hover:border-white/[0.12]"
                  )}
                >
                  <input
                    type="checkbox"
                    className="mt-0.5 shrink-0 w-4 h-4 rounded accent-red-500"
                    {...register(name)}
                    aria-required="true"
                  />
                  <span className="text-sm leading-relaxed" style={{ color: "var(--slate-300)" }}>
                    {label}
                  </span>
                </label>
              ))}
            </div>

            {(errors.waiverAgreed || errors.physicallyFit || errors.codeOfConductAgreed) && (
              <p className="form-error">
                <AlertCircle size={14} aria-hidden="true" />
                Please agree to all required items to complete registration.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        {step > 1 ? (
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => setStep((s) => s - 1)}
          >
            <ChevronLeft size={18} aria-hidden="true" />
            Back
          </Button>
        ) : (
          <div />
        )}
        {step < STEPS.length ? (
          <Button type="button" variant="primary" size="lg" onClick={handleNext}>
            Continue
            <ChevronRight size={18} aria-hidden="true" />
          </Button>
        ) : (
          <Button type="submit" variant="primary" size="lg" loading={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Complete Registration"}
            <CheckCircle size={18} aria-hidden="true" />
          </Button>
        )}
      </div>
    </form>
  );
}
