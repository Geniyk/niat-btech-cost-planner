import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (!b.consent) return NextResponse.json({ error: "Consent is required before saving a request." }, { status: 400 });
    if (!b.name || String(b.name).trim().length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    if (!b.email && !b.phone) return NextResponse.json({ error: "Enter an email or phone number so the team can respond." }, { status: 400 });
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ error: "Lead storage is not configured yet. Set Supabase environment variables and redeploy." }, { status: 503 });

    const row = {
      name: String(b.name).trim().slice(0, 120),
      email: b.email ? String(b.email).trim().slice(0, 200) : null,
      phone: b.phone ? String(b.phone).trim().slice(0, 40) : null,
      city: b.city ? String(b.city).trim().slice(0, 100) : null,
      budget: Number(b.budget) || null,
      stage: String(b.stage || "Class 12").slice(0, 40),
      interest: String(b.interest || "Not specified").slice(0, 100),
      language: String(b.language || "English").slice(0, 30),
      university_fee: Number(b.universityFee) || null,
      program_fee: Number(b.programFee) || null,
      hostel_fee: Number(b.hostelFee) || null,
      entered_total: Number(b.total) || 0,
      source: String(b.source || "direct").slice(0, 100),
      consent: true
    };
    const { data, error } = await supabase.from("planner_leads").insert(row).select("id,created_at").single();
    if (error) {
      console.error("Supabase insert failed:", error.message);
      return NextResponse.json({ error: "Could not save the request. Check the database setup." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, leadId: data.id, createdAt: data.created_at });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}