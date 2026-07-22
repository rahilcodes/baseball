import { z } from "zod";

export const freeAgentSchema = z.object({
  // Step 1: Personal
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Please select your nationality"),
  phone: z.string().min(8, "Enter a valid WhatsApp number"),
  email: z.string().email("Enter a valid email address"),
  emergencyContactName: z.string().min(2, "Emergency contact name required"),
  emergencyContactPhone: z.string().min(8, "Emergency contact phone required"),
  medicalConditions: z.string().optional(),
  jerseySize: z.enum(["S", "M", "L", "XL", "XXL"]).refine((v) => v !== undefined, "Please select a jersey size"),

  // Registrant Category (determines fee)
  registrantType: z.enum(["student", "adult"]),

  // Under-17 Guardian (required if player is 16 or 17)
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),

  // Step 2: Baseball
  primaryPosition: z.enum(["P", "C", "1B", "2B", "SS", "3B", "LF", "CF", "RF", "DH"]).refine((v) => v !== undefined, "Select a primary position"),
  secondaryPosition: z.enum(["P", "C", "1B", "2B", "SS", "3B", "LF", "CF", "RF", "DH", "N/A"]).optional(),
  experienceLevel: z.enum(["Beginner", "Intermediate", "Advanced"]).refine((v) => v !== undefined, "Select experience level"),
  yearsPlaying: z.coerce.number().min(0).max(40),

  // Step 3: Compliance — use z.boolean() + refine for Zod 4 compatibility
  waiverAgreed: z.boolean().refine((v) => v === true, { message: "You must agree to the waiver to participate" }),
  physicallyFit: z.boolean().refine((v) => v === true, { message: "You must confirm physical fitness" }),
  codeOfConductAgreed: z.boolean().refine((v) => v === true, { message: "You must agree to the Code of Conduct" }),
});

export type FreeAgentFormData = z.infer<typeof freeAgentSchema>;

export const teamSchema = z.object({
  teamName: z.string().min(2, "Team name must be at least 2 characters"),
  uniformColorHome: z.string().min(3, "Specify home uniform color"),
  uniformColorAway: z.string().min(3, "Specify away uniform color"),
  managerName: z.string().min(2, "Manager name required"),
  managerPhone: z.string().min(8, "Manager WhatsApp required"),
  managerEmail: z.string().email("Valid email required"),
  waiverAgreed: z.boolean().refine((v) => v === true, { message: "Manager must agree to the liability waiver" }),
  codeOfConductAgreed: z.boolean().refine((v) => v === true, { message: "Manager must agree to the Code of Conduct" }),
});

export type TeamFormData = z.infer<typeof teamSchema>;

export const teamPlayerSchema = z.object({
  // Personal
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().min(8, "WhatsApp number required"),
  email: z.string().email("Valid email required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  emergencyContactName: z.string().min(2, "Emergency contact name required"),
  emergencyContactPhone: z.string().min(8, "Emergency contact phone required"),

  // Registrant Category (determines fee)
  registrantType: z.enum(["student", "adult"]),

  // Under-17 Guardian (required if player is 16 or 17)
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),

  // Selection
  primaryPosition: z.enum(["P", "C", "1B", "2B", "SS", "3B", "LF", "CF", "RF", "DH"]).refine((v) => v !== undefined, "Select a position"),
  jerseySize: z.enum(["S", "M", "L", "XL", "XXL"]).refine((v) => v !== undefined, "Select a jersey size"),

  waiverAgreed: z.boolean().refine((v) => v === true, { message: "You must agree to the waiver" }),
  physicallyFit: z.boolean().refine((v) => v === true, { message: "You must confirm physical fitness" }),
  codeOfConductAgreed: z.boolean().refine((v) => v === true, { message: "You must agree to the Code of Conduct" }),

  // Payment
  paymentPreference: z.enum(["online", "cash"]).refine((v) => v !== undefined, "Select a payment preference"),
});

export type TeamPlayerFormData = z.infer<typeof teamPlayerSchema>;

export const sponsorSchema = z.object({
  companyName: z.string().min(2, "Company name required"),
  contactName: z.string().min(2, "Contact name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(8, "Phone number required"),
  address: z.string().min(5, "Full address required"),
  packageTier: z.enum(["title", "gold", "silver"]),
  packagePrice: z.number(),
});

export type SponsorFormData = z.infer<typeof sponsorSchema>;
