import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  resend, FROM, REPLY_TO, TEAM_EMAILS,
  playerJoinWelcomeHtml, playerJoinManagerAlertHtml,
  type PlayerJoinEmailData, type ManagerAlertEmailData,
} from "@/lib/emails";

// Use service-role so we can SELECT the teams table without RLS blocking us
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { teamId, fullName, email, phone, primaryPosition, jerseySize, registrantType } = body;

    if (!teamId || !fullName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // --- Fetch team info so we can personalise both emails ---
    const { data: team, error: teamError } = await supabaseAdmin
      .from("teams")
      .select("team_name, manager_name, manager_email")
      .eq("id", teamId)
      .single();

    const teamName = team?.team_name ?? "Your Team";
    const managerName = team?.manager_name ?? "Team Manager";
    const managerEmail = team?.manager_email ?? null;

    if (teamError) {
      console.warn("Could not fetch team info for player-join email:", teamError.message);
    }

    // --- 1. Welcome email → Player ---
    const playerEmailData: PlayerJoinEmailData = {
      fullName,
      email,
      primaryPosition,
      jerseySize,
      registrantType,
      teamName,
    };

    const playerResult = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: `You're on the roster, ${fullName.split(" ")[0]}! ⚾`,
      html: playerJoinWelcomeHtml(playerEmailData),
    });

    if (playerResult.error) {
      console.error("Player join welcome email failed:", playerResult.error);
    }

    // --- 2. Alert email → Team Manager ---
    if (managerEmail) {
      const managerAlertData: ManagerAlertEmailData = {
        managerName,
        managerEmail,
        teamName,
        playerName: fullName,
        playerEmail: email,
        playerPhone: phone ?? "",
        primaryPosition,
        jerseySize,
        registrantType,
      };

      const managerResult = await resend.emails.send({
        from: FROM,
        to: managerEmail,
        replyTo: email,
        subject: `[${teamName}] New Player — ${fullName} has joined your roster`,
        html: playerJoinManagerAlertHtml(managerAlertData),
      });

      if (managerResult.error) {
        console.error("Manager alert email failed:", managerResult.error);
      }
    }

    // --- 3. BPL Admin backup alert ---
    await resend.emails.send({
      from: FROM,
      to: TEAM_EMAILS,
      replyTo: email,
      subject: `[BPL] New Player Joined — ${fullName} → ${teamName}`,
      html: playerJoinManagerAlertHtml({
        managerName: "BPL Admin",
        managerEmail: TEAM_EMAILS[0],
        teamName,
        playerName: fullName,
        playerEmail: email,
        playerPhone: phone ?? "",
        primaryPosition,
        jerseySize,
        registrantType,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("player-join API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
