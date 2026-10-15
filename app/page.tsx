"use client";

import { useMemo, useState } from "react";

const copy: Record<string, Record<string, string>> = {
  English: {
    title: "B.Tech Cost & College Planner",
    subtitle: "Understand the costs you know, identify what is missing, and prepare better questions before speaking to a counsellor.",
    planner: "Plan your budget", assistant: "Budget checklist assistant", leads: "Request fee guidance",
    city: "Preferred city", budget: "Approximate total budget (₹)", stage: "Current stage",
    interest: "Area of interest", university: "University fee (₹)", program: "Separate program/upskilling fee (₹)",
    hostel: "Hostel and other costs (₹)", calculate: "Calculate entered costs",
    generate: "Generate my budget checklist", name: "Your name", email: "Email (optional)", phone: "Phone (optional)",
    consent: "I agree that my details may be used to respond to this request. I understand this is not an official fee quote.",
    save: "Request guidance", notice: "Only amounts you enter are counted. This tool is an independent prototype, not an official NIAT fee calculator. Verify all fees with the university and NIAT before making a decision."
  },
  Hindi: {
    title: "B.Tech खर्च और कॉलेज प्लानर",
    subtitle: "अपने बजट को समझें, बाकी जानकारी पहचानें और काउंसलर से बात करने से पहले सही सवाल तैयार करें।",
    planner: "अपना बजट बनाएं", assistant: "बजट चेकलिस्ट सहायक", leads: "फीस की जानकारी मांगें",
    city: "पसंदीदा शहर", budget: "कुल अनुमानित बजट (₹)", stage: "आपकी वर्तमान स्थिति",
    interest: "रुचि का क्षेत्र", university: "यूनिवर्सिटी फीस (₹)", program: "अलग प्रोग्राम/अपस्किलिंग फीस (₹)",
    hostel: "हॉस्टल और अन्य खर्च (₹)", calculate: "दर्ज खर्च जोड़ें",
    generate: "बजट चेकलिस्ट बनाएं", name: "आपका नाम", email: "ईमेल (वैकल्पिक)", phone: "फोन (वैकल्पिक)",
    consent: "मैं सहमत हूं कि मेरी जानकारी का उपयोग इस अनुरोध का जवाब देने के लिए किया जा सकता है। यह आधिकारिक फीस कोट नहीं है।",
    save: "जानकारी के लिए अनुरोध करें", notice: "केवल आपके द्वारा दर्ज राशि जोड़ी जाती है। यह एक स्वतंत्र प्रोटोटाइप है, NIAT का आधिकारिक फीस कैलकुलेटर नहीं। निर्णय से पहले सभी फीस की पुष्टि करें।"
  },
  Telugu: {
    title: "B.Tech ఖర్చులు & కాలేజ్ ప్లానర్",
    subtitle: "మీ బడ్జెట్‌ను అర్థం చేసుకుని, కౌన్సిలర్‌ను అడగాల్సిన ప్రశ్నలను సిద్ధం చేసుకోండి.",
    planner: "మీ బడ్జెట్", assistant: "బడ్జెట్ చెక్‌లిస్ట్ సహాయకుడు", leads: "ఫీజు వివరాలు అడగండి",
    city: "ఇష్టమైన నగరం", budget: "అంచనా మొత్తం బడ్జెట్ (₹)", stage: "ప్రస్తుత దశ",
    interest: "ఆసక్తి ఉన్న రంగం", university: "యూనివర్సిటీ ఫీజు (₹)", program: "ప్రోగ్రామ్ ఫీజు (₹)",
    hostel: "హాస్టల్ మరియు ఇతర ఖర్చులు (₹)", calculate: "నమోదు చేసిన ఖర్చులను కలపండి",
    generate: "బడ్జెట్ చెక్‌లిస్ట్ రూపొందించండి", name: "మీ పేరు", email: "ఇమెయిల్ (ఐచ్ఛికం)", phone: "ఫోన్ (ఐచ్ఛికం)",
    consent: "ఈ అభ్యర్థనకు స్పందించడానికి నా వివరాలను ఉపయోగించడానికి నేను అంగీకరిస్తున్నాను.",
    save: "వివరాలు కోరండి", notice: "మీరు నమోదు చేసిన మొత్తాలనే లెక్కిస్తాం. ఇది అధికారిక NIAT ఫీజు కోట్ కాదు. నిర్ణయం తీసుకునే ముందు ఫీజులను ధృవీకరించండి."
  },
  Tamil: {
    title: "B.Tech செலவு & கல்லூரி திட்டமிடல்",
    subtitle: "உங்கள் பட்ஜெட்டை புரிந்துகொண்டு ஆலோசகரிடம் கேட்க வேண்டிய கேள்விகளைத் தயார் செய்யுங்கள்.",
    planner: "பட்ஜெட்டை திட்டமிடுங்கள்", assistant: "பட்ஜெட் பட்டியல் உதவியாளர்", leads: "கட்டண விவரங்களைக் கேளுங்கள்",
    city: "விருப்பமான நகரம்", budget: "மதிப்பிடப்பட்ட மொத்த பட்ஜெட் (₹)", stage: "தற்போதைய நிலை",
    interest: "ஆர்வமுள்ள துறை", university: "பல்கலைக்கழகக் கட்டணம் (₹)", program: "தனி திட்டக் கட்டணம் (₹)",
    hostel: "விடுதி மற்றும் பிற செலவுகள் (₹)", calculate: "உள்ளிட்ட செலவுகளைக் கணக்கிடுங்கள்",
    generate: "பட்ஜெட் பட்டியலை உருவாக்குங்கள்", name: "உங்கள் பெயர்", email: "மின்னஞ்சல் (விருப்பம்)", phone: "தொலைபேசி (விருப்பம்)",
    consent: "இந்தக் கோரிக்கைக்கு பதிலளிக்க எனது விவரங்களைப் பயன்படுத்த ஒப்புக்கொள்கிறேன்.",
    save: "வழிகாட்டலைக் கோருங்கள்", notice: "நீங்கள் உள்ளிட்ட தொகைகள் மட்டுமே கணக்கிடப்படும். இது அதிகாரப்பூர்வ NIAT கட்டணக் கணக்கீடு அல்ல."
  },
  Kannada: {
    title: "B.Tech ವೆಚ್ಚ ಮತ್ತು ಕಾಲೇಜು ಯೋಜಕ",
    subtitle: "ನಿಮ್ಮ ಬಜೆಟ್ ತಿಳಿದುಕೊಂಡು ಸಲಹೆಗಾರರನ್ನು ಕೇಳಬೇಕಾದ ಪ್ರಶ್ನೆಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿ.",
    planner: "ಬಜೆಟ್ ಯೋಜಿಸಿ", assistant: "ಬಜೆಟ್ ಪರಿಶೀಲನಾ ಸಹಾಯಕ", leads: "ಶುಲ್ಕದ ಮಾಹಿತಿ ಕೇಳಿ",
    city: "ಆದ್ಯತೆಯ ನಗರ", budget: "ಅಂದಾಜು ಒಟ್ಟು ಬಜೆಟ್ (₹)", stage: "ಪ್ರಸ್ತುತ ಹಂತ",
    interest: "ಆಸಕ್ತಿಯ ಕ್ಷೇತ್ರ", university: "ವಿಶ್ವವಿದ್ಯಾಲಯ ಶುಲ್ಕ (₹)", program: "ಪ್ರತ್ಯೇಕ ಕಾರ್ಯಕ್ರಮ ಶುಲ್ಕ (₹)",
    hostel: "ಹಾಸ್ಟೆಲ್ ಮತ್ತು ಇತರ ವೆಚ್ಚಗಳು (₹)", calculate: "ನಮೂದಿಸಿದ ವೆಚ್ಚಗಳನ್ನು ಲೆಕ್ಕಿಸಿ",
    generate: "ಬಜೆಟ್ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ ರಚಿಸಿ", name: "ನಿಮ್ಮ ಹೆಸರು", email: "ಇಮೇಲ್ (ಐಚ್ಛಿಕ)", phone: "ಫೋನ್ (ಐಚ್ಛಿಕ)",
    consent: "ಈ ವಿನಂತಿಗೆ ಪ್ರತಿಕ್ರಿಯಿಸಲು ನನ್ನ ವಿವರಗಳನ್ನು ಬಳಸಲು ನಾನು ಒಪ್ಪುತ್ತೇನೆ.",
    save: "ಮಾಹಿತಿ ಕೇಳಿ", notice: "ನೀವು ನಮೂದಿಸಿದ ಮೊತ್ತಗಳನ್ನು ಮಾತ್ರ ಲೆಕ್ಕಿಸಲಾಗುತ್ತದೆ. ಇದು ಅಧಿಕೃತ NIAT ಶುಲ್ಕದ ಉಲ್ಲೇಖವಲ್ಲ."
  },
  Malayalam: {
    title: "B.Tech ചെലവ് & കോളേജ് പ്ലാനർ",
    subtitle: "നിങ്ങളുടെ ബജറ്റ് മനസ്സിലാക്കി കൗൺസിലറോട് ചോദിക്കേണ്ട ചോദ്യങ്ങൾ തയ്യാറാക്കുക.",
    planner: "ബജറ്റ് തയ്യാറാക്കുക", assistant: "ബജറ്റ് ചെക്ക്ലിസ്റ്റ് സഹായി", leads: "ഫീസ് വിവരങ്ങൾ ചോദിക്കുക",
    city: "ആഗ്രഹിക്കുന്ന നഗരം", budget: "ഏകദേശ മൊത്തം ബജറ്റ് (₹)", stage: "നിലവിലെ ഘട്ടം",
    interest: "താൽപര്യമുള്ള മേഖല", university: "യൂണിവേഴ്സിറ്റി ഫീസ് (₹)", program: "പ്രത്യേക പ്രോഗ്രാം ഫീസ് (₹)",
    hostel: "ഹോസ്റ്റൽ, മറ്റ് ചെലവുകൾ (₹)", calculate: "നൽകിയ ചെലവുകൾ കണക്കാക്കുക",
    generate: "ബജറ്റ് ചെക്ക്ലിസ്റ്റ് തയ്യാറാക്കുക", name: "പേര്", email: "ഇമെയിൽ (ഐച്ഛികം)", phone: "ഫോൺ (ഐച്ഛികം)",
    consent: "ഈ അഭ്യർത്ഥനയ്ക്ക് മറുപടി നൽകാൻ എന്റെ വിവരങ്ങൾ ഉപയോഗിക്കാൻ ഞാൻ സമ്മതിക്കുന്നു.",
    save: "വിവരങ്ങൾ അഭ്യർത്ഥിക്കുക", notice: "നിങ്ങൾ നൽകിയ തുകകൾ മാത്രമാണ് കണക്കാക്കുന്നത്. ഇത് ഔദ്യോഗിക NIAT ഫീസ് ക്വോട്ട് അല്ല."
  }
};

export default function Home() {
  const [lang, setLang] = useState("English");
  const t = copy[lang] || copy.English;
  const [form, setForm] = useState({city:"",budget:"",stage:"Class 12",interest:"AI / Software",universityFee:"",programFee:"",hostelFee:"",name:"",email:"",phone:"",consent:false});
  const [ai, setAi] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const total = useMemo(() => [form.universityFee,form.programFee,form.hostelFee].reduce((s,v)=>s+(Number(v)||0),0), [form]);
  const money = (n:number) => "₹" + n.toLocaleString("en-IN");
  function update(k:string,v:string|boolean) { setForm(p=>({...p,[k]:v})); }
  async function generate() {
    setBusy(true); setStatus("");
    try {
      const r = await fetch("/api/ai-checklist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,total,language:lang})});
      const d = await r.json(); setAi(d.analysis || d.error || "Could not generate checklist.");
    } catch { setAi("Could not reach the AI service. Check deployment settings."); }
    finally { setBusy(false); }
  }
  async function submitLead() {
    setBusy(true); setStatus("");
    try {
      const r = await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,total,language:lang,source:new URLSearchParams(location.search).get("source")||"direct"})});
      const d = await r.json();
      setStatus(r.ok ? "Request saved. Please verify all fees directly with the relevant institution." : (d.error||"Could not save request."));
    } catch { setStatus("Could not save request. Please try again."); }
    finally { setBusy(false); }
  }
  return <main>
    <header>
      <span className="pill">Independent growth-hack prototype</span>
      <div style={{float:"right"}}>
        <label htmlFor="language" style={{color:"white",marginTop:0}}>Language</label>
        <select id="language" value={lang} onChange={e=>setLang(e.target.value)} style={{width:145}}>
          {Object.keys(copy).map(x=><option key={x}>{x}</option>)}
        </select>
      </div>
      <h1>{t.title}</h1><p>{t.subtitle}</p>
    </header>
    <div className="grid">
      <section className="card">
        <h2>{t.planner}</h2>
        <label>{t.city}</label><input value={form.city} onChange={e=>update("city",e.target.value)} placeholder="e.g. Hyderabad, Bengaluru" />
        <label>{t.budget}</label><input type="number" min="0" value={form.budget} onChange={e=>update("budget",e.target.value)} placeholder="e.g. 800000" />
        <label>{t.stage}</label><select value={form.stage} onChange={e=>update("stage",e.target.value)}><option>Class 12</option><option>Class 11</option><option>Parent / guardian</option><option>Other</option></select>
        <label>{t.interest}</label><select value={form.interest} onChange={e=>update("interest",e.target.value)}><option>AI / Software</option><option>Data / Analytics</option><option>Electronics / IoT</option><option>Cybersecurity</option><option>Not sure yet</option></select>
        <label>{t.university}</label><input type="number" min="0" value={form.universityFee} onChange={e=>update("universityFee",e.target.value)} placeholder="Only enter a verified amount" />
        <label>{t.program}</label><input type="number" min="0" value={form.programFee} onChange={e=>update("programFee",e.target.value)} placeholder="Only enter a verified amount" />
        <label>{t.hostel}</label><input type="number" min="0" value={form.hostelFee} onChange={e=>update("hostelFee",e.target.value)} placeholder="Optional" />
        <div className="result"><div className="costline"><span>Entered cost total</span><strong>{money(total)}</strong></div><small>Only the amounts entered above are included. Unknown costs are not estimated.</small></div>
        <button onClick={generate} disabled={busy}>{busy ? "Working…" : t.generate}</button>
      </section>
      <section className="card">
        <h2>{t.assistant}</h2>
        <p className="muted">Your budget assistant creates a checklist from the details you enter. It must not be treated as an official fee quote.</p>
        <div className="result" aria-live="polite">{ai || "Your budget checklist will appear here."}</div>
        <h2 style={{marginTop:24}}>{t.leads}</h2>
        <label>{t.name}</label><input value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Name" />
        <label>{t.email}</label><input type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="name@example.com" />
        <label>{t.phone}</label><input value={form.phone} onChange={e=>update("phone",e.target.value)} placeholder="Phone number (optional)" />
        <label className="consent"><input type="checkbox" checked={form.consent} onChange={e=>update("consent",e.target.checked)} /> <span>{t.consent}</span></label>
        <button onClick={submitLead} disabled={busy || !form.consent}>{busy ? "Working…" : t.save}</button>
        {status && <p role="status">{status}</p>}
      </section>
    </div>
    <footer>{t.notice} Do not enter sensitive personal information. Contact details are only submitted if you give consent.</footer>
  </main>;
}