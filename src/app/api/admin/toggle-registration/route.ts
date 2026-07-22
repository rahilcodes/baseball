import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * POST /api/admin/toggle-registration
 * Securely toggles the global registrations_open flag using the service role key.
 * Protected by ADMIN_SECRET — never exposed to the browser.
 */
export async function POST(req: Request) {
  try {
    // Verify the admin secret sent from the server-rendered page
    const secret = req.headers.get("x-admin-secret");
    if (!secret || secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { value } = await req.json();
    if (typeof value !== "boolean") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("app_settings")
      .update({ registrations_open: value, updated_at: new Date().toISOString() })
      .eq("id", 1);

    if (error) throw error;

    return NextResponse.json({ success: true, registrations_open: value });
  } catch (err: any) {
    console.error("toggle-registration error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
