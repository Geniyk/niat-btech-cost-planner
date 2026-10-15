import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const key = req.headers.get("x-admin-key");
  if (!process.env.ADMIN_DASHBOARD_KEY || key !== process.env.ADMIN_DASHBOARD_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  const { data, error } = await supabase.from("planner_leads")
    .select("id,created_at,city,budget,stage,interest,language,source,entered_total")
    .order("created_at", { ascending: false }).limit(1000);
  if (error) return NextResponse.json({ error: "Could not load metrics." }, { status: 502 });
  const rows = data || [];
  const countBy = (field: string) => rows.reduce((acc: Record<string, number>, row: any) => {
    const k = String(row[field] || "Not provided"); acc[k] = (acc[k] || 0) + 1; return acc;
  }, {});
  return NextResponse.json({
    totalLeads: rows.length,
    last7Days: rows.filter((r: any) => Date.now() - new Date(r.created_at).getTime() <= 7 * 86400000).length,
    cities: countBy("city"), interests: countBy("interest"), languages: countBy("language"), sources: countBy("source"),
    recent: rows.slice(0, 20).map(({ id, created_at, city, stage, interest, language, source }) => ({ id, created_at, city, stage, interest, language, source }))
  });
}