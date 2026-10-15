# NIAT AI Growth System — B.Tech Cost & College Planner

A multi-component prototype for Layer 3. It is **not an official NIAT tool** and contains no official partner-college fee data.

## Connected components and tools
1. **Next.js** — interactive cost planner, lead form, admin dashboard.
2. **Google Gemini API** — generates a personalised checklist from the user's inputs (real model call when configured; safe fallback preview when not configured).
3. **Supabase** — stores consented leads and provides data for the private dashboard.
4. **Vercel** — deploys the app and API routes to a public HTTPS URL.
5. **Language selector** — English, Hindi, Telugu, Tamil, Kannada, and Malayalam interface labels. AI output is requested in the selected language.

## Setup
Requirements: Node.js 18+, GitHub account, Vercel account, Google AI Studio API key, Supabase account.

1. Extract this ZIP.
2. Create a GitHub repository and upload the project files.
3. In Supabase, create a project. Open SQL Editor and run `supabase.sql`.
4. In Google AI Studio, create a Gemini API key.
5. Import the GitHub repository into Vercel as a Next.js project.
6. In Vercel → Project Settings → Environment Variables, set:
   - `GEMINI_API_KEY` — Google AI Studio key
   - `SUPABASE_URL` — Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase service-role key (server-side only)
   - `ADMIN_DASHBOARD_KEY` — a long random secret
7. Redeploy after setting environment variables.
8. Open the deployment URL. Try the planner and AI checklist. To save a lead, enter a name and email or phone, then tick consent.
9. Open `/admin`, enter `ADMIN_DASHBOARD_KEY`, and load the metrics.
10. Share the public app URL only after testing. Never share the admin key or service-role key.

## Local run
```bash
npm install
cp .env.example .env.local
# Fill in environment variables
npm run dev
```
Then open `http://localhost:3000`.

## Components / routes
- `/` — cost planner, budget calculator, AI checklist, lead capture.
- `POST /api/ai-checklist` — calls Gemini API.
- `POST /api/leads` — validates consent and saves a lead to Supabase.
- `/admin` — private metrics page.
- `GET /api/admin-metrics` — checks `x-admin-key` before returning aggregate metrics.
- `supabase.sql` — database schema.

## Data and privacy notes
- The cost total includes only amounts entered by the user.
- No NIAT/partner-college fee data is supplied. Do not invent fees; add only institution-specific values verified from official sources.
- Do not enter sensitive personal data. The prototype stores contact details only after consent, but add a formal privacy notice, retention policy, and security review before real production use.
- The dashboard is protected by a shared key, suitable only for a demo. For production, use proper authenticated admin access.
- Gemini is a real API call when `GEMINI_API_KEY` is configured. Without a key, the app returns a labelled fallback checklist preview.

## 3-minute Loom walkthrough
- 0:00–0:20 — Explain the problem and the cost planner.
- 0:20–0:55 — Enter city, budget, and example amounts clearly labelled as illustrative.
- 0:55–1:25 — Generate the AI checklist and show its questions.
- 1:25–1:55 — Submit a test lead with consent.
- 1:55–2:25 — Show the saved row in Supabase (do not expose contact details on camera).
- 2:25–2:45 — Open `/admin` and show counts/breakdowns.
- 2:45–3:00 — Explain the 14-day pilot target: 15% qualified leads from at least 100 visitors. This is a hypothesis, not a benchmark.

## Troubleshooting
- AI fallback appears: verify `GEMINI_API_KEY`, model access, and quota; redeploy.
- Lead saving fails: verify Supabase URL/key, run `supabase.sql`, and redeploy.
- Admin returns Unauthorized: enter the exact `ADMIN_DASHBOARD_KEY` value from Vercel.
- Never paste API keys into client code or public repositories.
