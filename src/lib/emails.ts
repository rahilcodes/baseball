/**
 * BPL Email Templates
 * All transactional emails sent by Baseball Premier League.
 * Uses Resend SDK. Branded in BPL's crimson/navy/gold palette.
 */

import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM = "Baseball Premier League <info@bplbaseball.com>";
export const REPLY_TO = "bplbaseballmalaysia@gmail.com";
export const TEAM_EMAILS = [
  "bplbaseballmalaysia@gmail.com",
  "princerahilazeez@gmail.com"
];
export const SITE_URL = "https://bplbaseball.com";

// ─── Shared Layout Wrapper ─────────────────────────────────────────────────────
function layout(title: string, previewText: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="color-scheme" content="dark" />
</head>
<body style="margin:0;padding:0;background:#020B18;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#CBD5E1;">
  <!-- Preview text (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#020B18;">${previewText}&nbsp;&#847;&nbsp;&#847;&nbsp;&#847;</div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#020B18;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0D1F3C 0%,#1A0A0A 100%);border-radius:16px 16px 0 0;padding:28px 40px;border-bottom:1px solid rgba(227,27,35,0.3);text-align:center;">
              <img
                src="https://bplbaseball.com/images/bpl_logo_with%20word.png"
                alt="Baseball Premier League"
                width="180"
                style="max-width:180px;height:auto;display:inline-block;margin-bottom:12px;"
              />
              <div style="font-size:11px;font-weight:600;color:#E31B23;letter-spacing:3px;text-transform:uppercase;">Season 1 &middot; Malaysia 2026</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#0D1F3C;padding:40px;border:1px solid rgba(255,255,255,0.06);border-top:none;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#060F20;border-radius:0 0 16px 16px;padding:24px 40px;border:1px solid rgba(255,255,255,0.06);border-top:1px solid rgba(255,255,255,0.04);text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:#475569;">Questions? WhatsApp Commissioner Basit</p>
              <a href="https://wa.me/60102276014" style="color:#E31B23;font-size:12px;text-decoration:none;font-weight:600;">+60 10-227 6014</a>
              <p style="margin:12px 0 0;font-size:11px;color:#334155;">
                <a href="${SITE_URL}" style="color:#64748B;text-decoration:none;">${SITE_URL}</a>
                &nbsp;·&nbsp; Selangor, Malaysia
              </p>
              <p style="margin:8px 0 0;font-size:10px;color:#1E3A5F;">You're receiving this because you registered with BPL Season 1.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function h1(text: string) {
  return `<h1 style="margin:0 0 8px;font-size:28px;font-weight:800;color:#F8FAFC;line-height:1.2;">${text}</h1>`;
}
function p(text: string, style = "") {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#94A3B8;${style}">${text}</p>`;
}
function infoBox(rows: { label: string; value: string }[]) {
  const rowsHtml = rows.map(({ label, value }) => `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid rgba(255,255,255,0.05);">
        <span style="font-size:11px;color:#64748B;text-transform:uppercase;letter-spacing:1px;">${label}</span>
        <div style="font-size:15px;font-weight:700;color:#F1F5F9;margin-top:2px;">${value}</div>
      </td>
    </tr>`).join("");
  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;margin:24px 0;">
      ${rowsHtml}
    </table>`;
}
function goldBox(text: string) {
  return `<div style="background:rgba(245,166,35,0.07);border:1px solid rgba(245,166,35,0.25);border-radius:12px;padding:16px 20px;margin:24px 0;">
    <p style="margin:0;font-size:14px;line-height:1.6;color:#F5A623;">${text}</p>
  </div>`;
}
function ctaButton(label: string, href: string) {
  return `<div style="text-align:center;margin:32px 0;">
    <a href="${href}" style="display:inline-block;background:#E31B23;color:#fff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;letter-spacing:0.3px;">${label}</a>
  </div>`;
}
function divider() {
  return `<hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:28px 0;" />`;
}

// ─── 1. OTP Verification Email ─────────────────────────────────────────────────
export function otpEmailHtml(otp: string): string {
  const body = `
    ${h1("Verify Your Identity")}
    ${p("To complete your BPL registration, enter the verification code below. This code expires in <strong style='color:#F8FAFC;'>10 minutes</strong>.")}
    
    <!-- OTP box -->
    <div style="background:rgba(227,27,35,0.06);border:1px solid rgba(227,27,35,0.25);border-radius:14px;padding:32px;text-align:center;margin:28px 0;">
      <div style="font-size:11px;color:#64748B;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Verification Code</div>
      <div style="font-size:44px;font-weight:800;letter-spacing:12px;color:#F8FAFC;font-family:'Courier New',monospace;">${otp}</div>
    </div>

    ${p("If you didn't request this code, you can safely ignore this email. Your account won't be created until you verify.", "font-size:13px;color:#64748B;")}
  `;
  return layout("BPL Email Verification", `Your BPL verification code is ${otp}`, body);
}

// ─── 2. Free Agent Welcome Email ───────────────────────────────────────────────
export interface FreeAgentEmailData {
  fullName: string;
  email: string;
  primaryPosition: string;
  experienceLevel: string;
  registrantType: "student" | "adult";
}
export function freeAgentWelcomeHtml(data: FreeAgentEmailData): string {
  const fee = data.registrantType === "student" ? "RM 20 (Student)" : "RM 40 (Adult)";
  const body = `
    ${h1(`Welcome to BPL, ${data.fullName.split(" ")[0]}!`)}
    ${p("You've officially entered the BPL Season 1 draft pool. Malaysia's first adult baseball league just got one player stronger.")}
    
    ${infoBox([
    { label: "Registered As", value: "Free Agent — Draft Pool" },
    { label: "Primary Position", value: data.primaryPosition },
    { label: "Experience Level", value: data.experienceLevel },
    { label: "Registration Fee", value: `${fee} — Pay on Assessment Day` },
  ])}

    ${goldBox("📅 <strong>Assessment Day: April 19 or 20</strong> at UPM (Universiti Putra Malaysia), Selangor. Commissioner Basit will WhatsApp you with the exact time slot.")}

    <div style="margin:20px 0;">
      <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#F1F5F9;">What to expect at assessment:</p>
      <ul style="margin:0;padding-left:20px;color:#94A3B8;font-size:14px;line-height:2;">
        <li>Throwing & Fielding (Ground balls + Fly balls)</li>
        <li>Hitting — live pitching BP session</li>
        <li>Base Running speed & technique</li>
        <li>Pitching (optional)</li>
        <li>Game IQ evaluation (1–5 rating scale)</li>
      </ul>
    </div>

    ${ctaButton("View Full Schedule & Rules", `${SITE_URL}/rules`)}
    ${divider()}
    ${p("Bring your own glove if you have one. Bats and balls provided. Wear appropriate athletic wear.", "font-size:13px;color:#64748B;")}
  `;
  return layout(`Welcome to BPL, ${data.fullName}!`, "You're in the draft pool. Assessment day coming up.", body);
}

// ─── 3. Team Registration Welcome Email ────────────────────────────────────────
export interface TeamEmailData {
  teamName: string;
  managerName: string;
  managerEmail: string;
  teamId: string;
  uniformColorHome: string;
  uniformColorAway: string;
}
export function teamWelcomeHtml(data: TeamEmailData): string {
  const joinLink = `${SITE_URL}/register/team/join/${data.teamId}`;
  const body = `
    ${h1(`${data.teamName} is in!`)}
    ${p(`Congratulations, ${data.managerName.split(" ")[0]}. Your team has been officially registered for BPL Season 1. You're part of history — Malaysia's first adult baseball league.`)}

    ${infoBox([
    { label: "Team Name", value: data.teamName },
    { label: "Manager", value: data.managerName },
    { label: "Home Colours", value: data.uniformColorHome },
    { label: "Away Colours", value: data.uniformColorAway },
  ])}

    ${goldBox("🔗 Share the link below with your players to complete their individual registrations. Each player must register before the cut-off date.")}

    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px 20px;margin:16px 0;word-break:break-all;">
      <div style="font-size:11px;color:#64748B;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">Team Registration Link</div>
      <a href="${joinLink}" style="color:#E31B23;font-size:13px;font-weight:600;text-decoration:none;">${joinLink}</a>
    </div>

    ${ctaButton("Manage Your Team", `${SITE_URL}/manage/team/${data.teamId}`)}
    ${divider()}
    ${p("Season 1 kicks off <strong style='color:#F8FAFC;'>May 4, 2026</strong>. Games are every Sunday at UPM, Selangor. Registration fee: RM 20 (student) / RM 40 (adult) per player — collected by the manager.", "font-size:13px;color:#64748B;")}
  `;
  return layout(`${data.teamName} — BPL Registration Confirmed`, `${data.teamName} is officially in BPL Season 1.`, body);
}

// ─── 4. Sponsor Welcome Email ──────────────────────────────────────────────────
export interface SponsorEmailData {
  companyName: string;
  contactName: string;
  email: string;
  packageTier: string;
  packagePrice: number;
  packageName: string;
}
export function sponsorWelcomeHtml(data: SponsorEmailData): string {
  const tierColor = data.packageTier === "title" ? "#F5A623" : "#E31B23";
  const body = `
    ${h1(`Welcome aboard, ${data.contactName.split(" ")[0]}!`)}
    ${p(`Thank you for your interest in becoming a <strong style="color:${tierColor};">${data.packageName}</strong> of the Baseball Premier League. You're among the founding partners of Malaysia's first adult baseball league.`)}

    ${infoBox([
    { label: "Company", value: data.companyName },
    { label: "Sponsorship Tier", value: data.packageName },
    { label: "Investment Value", value: `RM ${data.packagePrice.toLocaleString()}` },
    { label: "Status", value: "Interest Received — Pending Contract" },
  ])}

    ${goldBox("📋 <strong>Next Steps:</strong> A BPL sponsorship coordinator will reach out to you within <strong>24 hours</strong> with the formal sponsorship contract (via DocuSign) and onboarding kit detailing your brand placement, jersey rights, and matchday activations.")}

    <div style="margin:20px 0;">
      <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#F1F5F9;">What you're securing:</p>
      <ul style="margin:0;padding-left:20px;color:#94A3B8;font-size:14px;line-height:2;">
        <li>First-mover advantage as a founding BPL partner</li>
        <li>100,000+ total season impressions</li>
        <li>Jersey branding, scoreboard placement & digital exposure</li>
        <li>Access to a premium multicultural audience (18–45, mid-high income)</li>
        <li>National Sports Council government recognition in progress</li>
      </ul>
    </div>

    ${ctaButton("View Sponsorship Prospectus", `${SITE_URL}/sponsorship`)}
    ${divider()}
    ${p("For urgent enquiries, WhatsApp Commissioner Basit directly at <a href='https://wa.me/60102276014' style='color:#E31B23;'>+60 10-227 6014</a>.", "font-size:13px;color:#64748B;")}
  `;
  return layout(`Welcome to BPL, ${data.companyName}!`, `Your ${data.packageName} interest is confirmed. We'll be in touch in 24 hours.`, body);
}

// ─── 5. New Lead / Admin Alert Email ──────────────────────────────────────────
export interface LeadEmailData {
  type: "free_agent" | "team" | "sponsor";
  name: string;
  email: string;
  phone?: string;
  detail: string;
}
export function newLeadHtml(data: LeadEmailData): string {
  const typeLabel = data.type === "free_agent" ? "Free Agent" : data.type === "team" ? "Team Registration" : "Sponsorship Lead";
  const typeColor = data.type === "sponsor" ? "#F5A623" : "#E31B23";
  const body = `
    <div style="background:rgba(227,27,35,0.06);border:1px solid rgba(227,27,35,0.2);border-radius:10px;padding:12px 20px;margin-bottom:24px;">
      <span style="font-size:11px;color:${typeColor};text-transform:uppercase;letter-spacing:2px;font-weight:700;">🔔 New ${typeLabel}</span>
    </div>

    ${h1("New Registration Alert")}
    ${p(`A new <strong style="color:#F8FAFC;">${typeLabel}</strong> just came in through the BPL website.`)}

    ${infoBox([
    { label: "Name / Company", value: data.name },
    { label: "Email", value: data.email },
    ...(data.phone ? [{ label: "Phone / WhatsApp", value: data.phone }] : []),
    { label: "Details", value: data.detail },
  ])}

    ${ctaButton("Reply via WhatsApp", `https://wa.me/${data.phone?.replace(/[^0-9]/g, "") || "60102276014"}`)}
  `;
  return layout(`[BPL] New ${typeLabel}`, `New ${typeLabel}: ${data.name}`, body);
}

// ─── 6. Player Join Team — Welcome Email ──────────────────────────────────────
export interface PlayerJoinEmailData {
  fullName: string;
  email: string;
  primaryPosition: string;
  jerseySize: string;
  registrantType: "student" | "adult";
  teamName: string;
}
export function playerJoinWelcomeHtml(data: PlayerJoinEmailData): string {
  const fee = data.registrantType === "student" ? "RM 20 (Student)" : "RM 40 (Adult)";
  const body = `
    ${h1(`You're on the Roster!`)}
    ${p(`Welcome to <strong style="color:var(--slate-50);">${data.teamName}</strong>, ${data.fullName.split(" ")[0]}! Your registration and liability waiver are confirmed. You're officially part of BPL Season 1.`)}

    ${infoBox([
      { label: "Team", value: data.teamName },
      { label: "Primary Position", value: data.primaryPosition },
      { label: "Jersey Size", value: data.jerseySize },
      { label: "Registration Fee", value: `${fee} — Pay your Team Manager before opening day` },
    ])}

    ${goldBox("🗓️ <strong>Opening Day: May 4, 2026</strong> at UPM (Universiti Putra Malaysia), Selangor. Your team manager will share further details via WhatsApp.")}

    ${ctaButton("View Schedule & Rules", `${SITE_URL}/rules`)}
    ${divider()}
    ${p("Bring a glove if you have one. Show up early. Play hard.", "font-size:13px;color:#64748B;")}
  `;
  return layout(`You're on the Roster — ${data.teamName}!`, `Welcome to ${data.teamName} — BPL Season 1.`, body);
}

// ─── 7. Player Join Team — Manager Alert Email ────────────────────────────────
export interface ManagerAlertEmailData {
  managerName: string;
  managerEmail: string;
  teamName: string;
  playerName: string;
  playerEmail: string;
  playerPhone: string;
  primaryPosition: string;
  jerseySize: string;
  registrantType: "student" | "adult";
}
export function playerJoinManagerAlertHtml(data: ManagerAlertEmailData): string {
  const fee = data.registrantType === "student" ? "RM 20" : "RM 40";
  const body = `
    <div style="background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.2);border-radius:10px;padding:12px 20px;margin-bottom:24px;">
      <span style="font-size:11px;color:#22C55E;text-transform:uppercase;letter-spacing:2px;font-weight:700;">🟢 New Player Joined</span>
    </div>

    ${h1("New Player on Your Roster")}
    ${p(`A new player has completed their registration and signed the liability waiver for <strong style="color:var(--slate-50);">${data.teamName}</strong>.`)}

    ${infoBox([
      { label: "Player Name", value: data.playerName },
      { label: "Email", value: data.playerEmail },
      { label: "WhatsApp", value: data.playerPhone },
      { label: "Position", value: data.primaryPosition },
      { label: "Jersey Size", value: data.jerseySize },
      { label: "Fee to Collect", value: fee },
    ])}

    ${goldBox("💰 Reminder: Collect this player's registration fee (<strong>" + fee + "</strong>) before Opening Day — May 4, 2026.")}

    ${ctaButton("Reply via WhatsApp", `https://wa.me/${data.playerPhone.replace(/[^0-9]/g, "")}`)}
  `;
  return layout(`[${data.teamName}] New Player Registration`, `${data.playerName} has joined your team roster.`, body);
}