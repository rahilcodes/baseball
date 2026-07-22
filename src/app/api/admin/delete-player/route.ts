import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * POST /api/admin/delete-player
 * Securely deletes a player using the service role key.
 * Protected by ADMIN_SECRET — never exposed to the browser.
 */
export async function POST(req: Request) {
  try {
    // Verify the admin secret sent from the server-rendered manage page
    const secret = req.headers.get("x-admin-secret");
    if (!secret || secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { playerId } = await req.json();
    if (!playerId || typeof playerId !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("players")
      .delete()
      .eq("id", playerId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("delete-player error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
