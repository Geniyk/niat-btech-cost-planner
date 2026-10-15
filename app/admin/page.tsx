"use client";
import { useState } from "react";

export default function Admin() {
  const [key, setKey] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  async function load() {
    setError(""); setData(null);
    const res = await fetch("/api/admin-metrics", { headers: { "x-admin-key": key } });
    const d = await res.json();
    if (!res.ok) { setError(d.error || "Could not load dashboard."); return; }
    setData(d);
  }
  const breakdown = (title: string, obj: Record<string, number>) => <section className="card"><h2>{title}</h2>{Object.entries(obj).length ? Object.entries(obj).map(([k,v])=><div className="costline" key={k}><span>{k}</span><strong>{v}</strong></div>) : <p>No data yet.</p>}</section>;
  return <main><header><h1>Planner Lead Dashboard</h1><p>Private reporting page. Do not share your admin key.</p></header>
    <section className="card" style={{marginTop:18}}><label>Admin dashboard key</label><input type="password" value={key} onChange={e=>setKey(e.target.value)} placeholder="Enter ADMIN_DASHBOARD_KEY" /><button onClick={load}>Load metrics</button>{error&&<p role="alert">{error}</p>}</section>
    {data && <><div className="grid"><section className="card"><h2>Total leads</h2><p className="total">{data.totalLeads}</p></section><section className="card"><h2>Last 7 days</h2><p className="total">{data.last7Days}</p></section>{breakdown("By city",data.cities)}{breakdown("By interest",data.interests)}{breakdown("By language",data.languages)}{breakdown("By source",data.sources)}</div>
    <section className="card" style={{marginTop:16}}><h2>Recent leads (no contact details displayed)</h2>{data.recent.map((r:any)=><div className="costline" key={r.id}><span>{new Date(r.created_at).toLocaleString()} · {r.city||"No city"} · {r.interest} · {r.language}</span><small>{r.source}</small></div>)}</section></>}
  </main>;
}