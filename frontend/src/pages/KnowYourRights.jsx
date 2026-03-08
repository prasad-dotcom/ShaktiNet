import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   ShaktiNet — Know Your Rights
   Offline-capable · Multilingual · Women's Legal Rights India
   ═══════════════════════════════════════════════════════════════ */

const LANG_META = {
  en: { label: "English",  flag: "🇬🇧", dir: "ltr" },
  hi: { label: "हिंदी",    flag: "🇮🇳", dir: "ltr" },
  ta: { label: "தமிழ்",    flag: "🟠",  dir: "ltr" },
  te: { label: "తెలుగు",   flag: "🔵",  dir: "ltr" },
  mr: { label: "मराठी",    flag: "🟡",  dir: "ltr" },
  bn: { label: "বাংলা",    flag: "🟢",  dir: "ltr" },
};

const UI = {
  en: {
    title: "Know Your Rights", subtitle: "Your legal rights explained simply. Available offline.",
    search: "Search a law, right, or situation…", readMore: "Read More", readLess: "Read Less",
    helpline: "Helplines", download: "Save Offline", saved: "Saved!", all: "All",
    emergency: "EMERGENCY", callNow: "Call Now", noResults: "No results found. Try different words.",
  },
  hi: {
    title: "अपने अधिकार जानें", subtitle: "आपके कानूनी अधिकार सरल भाषा में। ऑफलाइन उपलब्ध।",
    search: "कानून, अधिकार या स्थिति खोजें…", readMore: "और पढ़ें", readLess: "कम करें",
    helpline: "हेल्पलाइन", download: "ऑफलाइन सेव करें", saved: "सेव हो गया!", all: "सभी",
    emergency: "आपातकाल", callNow: "अभी कॉल करें", noResults: "कोई परिणाम नहीं। अलग शब्द आज़माएं।",
  },
  ta: {
    title: "உங்கள் உரிமைகளை அறியுங்கள்", subtitle: "உங்கள் சட்ட உரிமைகள் எளிமையாக விளக்கப்பட்டுள்ளன.",
    search: "சட்டம், உரிமை தேடுங்கள்…", readMore: "மேலும் படிக்க", readLess: "குறைக்க",
    helpline: "உதவி எண்", download: "ஆஃப்லைனில் சேமி", saved: "சேமிக்கப்பட்டது!", all: "அனைத்தும்",
    emergency: "அவசரநிலை", callNow: "இப்போது அழைக்கவும்", noResults: "முடிவுகள் இல்லை.",
  },
  te: {
    title: "మీ హక్కులు తెలుసుకోండి", subtitle: "మీ చట్టపరమైన హక్కులు సులభంగా వివరించబడ్డాయి.",
    search: "చట్టం లేదా హక్కు వెతకండి…", readMore: "మరింత చదవండి", readLess: "తగ్గించు",
    helpline: "హెల్ప్‌లైన్", download: "ఆఫ్‌లైన్‌లో సేవ్ చేయి", saved: "సేవ్ అయింది!", all: "అన్నీ",
    emergency: "అత్యవసరం", callNow: "ఇప్పుడు కాల్ చేయి", noResults: "ఫలితాలు లేవు.",
  },
  mr: {
    title: "तुमचे हक्क जाणून घ्या", subtitle: "तुमचे कायदेशीर हक्क सोप्या भाषेत.",
    search: "कायदा किंवा हक्क शोधा…", readMore: "अधिक वाचा", readLess: "कमी करा",
    helpline: "हेल्पलाइन", download: "ऑफलाइन जतन करा", saved: "जतन केले!", all: "सर्व",
    emergency: "आणीबाणी", callNow: "आत्ता फोन करा", noResults: "कोणतेही परिणाम नाहीत.",
  },
  bn: {
    title: "আপনার অধিকার জানুন", subtitle: "আপনার আইনি অধিকার সহজ ভাষায়।",
    search: "আইন বা অধিকার খুঁজুন…", readMore: "আরো পড়ুন", readLess: "কম করুন",
    helpline: "হেল্পলাইন", download: "অফলাইনে সংরক্ষণ করুন", saved: "সংরক্ষিত!", all: "সব",
    emergency: "জরুরি", callNow: "এখনই কল করুন", noResults: "কোনো ফলাফল পাওয়া যায়নি।",
  },
};

const RIGHTS_DATA = [
  {
    id: "dv", category: "Home & Family", icon: "🏠", color: "#e91e8c", urgency: "high",
    en: {
      title: "Protection from Domestic Violence",
      law: "Protection of Women from Domestic Violence Act, 2005",
      summary: "You have the right to live free from physical, sexual, emotional, or economic abuse — even within marriage.",
      details: `**What counts as domestic violence?**
Physical abuse (hitting, slapping), sexual abuse, emotional abuse (insults, threats, isolation), and economic abuse (controlling your money, stopping you from working).

**What can you get?**
• Protection Order — stops the abuser from contacting you
• Residence Order — you keep the right to stay in your home
• Monetary Relief — maintenance, medical expenses, losses
• Custody Order — for your children

**How to report?**
Go to any police station and ask for a Protection Officer. You can also contact an NGO or court directly.

**Important:** This law covers wives, live-in partners, sisters, mothers, daughters living in the same household.`,
    },
    hi: {
      title: "घरेलू हिंसा से सुरक्षा",
      law: "घरेलू हिंसा से महिला संरक्षण अधिनियम, 2005",
      summary: "आपको शारीरिक, यौन, भावनात्मक या आर्थिक दुर्व्यवहार से मुक्त रहने का अधिकार है।",
      details: `**घरेलू हिंसा क्या है?**
मारपीट, यौन शोषण, भावनात्मक प्रताड़ना, और पैसों पर नियंत्रण सभी घरेलू हिंसा हैं।

**आपको क्या मिल सकता है?**
• संरक्षण आदेश
• निवास आदेश — घर में रहने का अधिकार
• आर्थिक राहत

**शिकायत कैसे करें?**
किसी भी थाने में जाएं और संरक्षण अधिकारी से मांगें।`,
    },
  },
  {
    id: "posh", category: "Workplace", icon: "💼", color: "#ff9800", urgency: "high",
    en: {
      title: "Sexual Harassment at Workplace",
      law: "POSH Act (Sexual Harassment of Women at Workplace Act, 2013)",
      summary: "Every woman has the right to a safe workplace. Employers must have an Internal Complaints Committee (ICC).",
      details: `**What is sexual harassment?**
Unwanted physical contact, sexual remarks or jokes, showing pornography, sexual requests or demands, any unwelcome sexual behaviour.

**Your rights at work:**
• Right to complain to the Internal Complaints Committee (ICC)
• Complaint must be filed within 3 months of the incident
• Right to transfer or leave during inquiry — with full pay
• Employer cannot retaliate against you for complaining

**If your employer has no ICC:**
This itself is a violation. File a complaint with the Labour Department. Employer can face a fine of ₹50,000.

**Applies to:** Offices, factories, hospitals, schools, NGOs, domestic workers, even work-from-home situations.`,
    },
    hi: {
      title: "कार्यस्थल पर यौन उत्पीड़न",
      law: "POSH अधिनियम, 2013",
      summary: "हर महिला को सुरक्षित कार्यस्थल का अधिकार है। नियोक्ता को ICC बनाना अनिवार्य है।",
      details: `**यौन उत्पीड़न क्या है?**
अवांछित स्पर्श, यौन टिप्पणियां, अश्लील सामग्री दिखाना।

**आपके अधिकार:**
• ICC में 3 महीने के अंदर शिकायत करें
• जांच के दौरान तबादला या अवकाश का अधिकार
• नियोक्ता आपसे बदला नहीं ले सकता`,
    },
  },
  {
    id: "498a", category: "Home & Family", icon: "⚖️", color: "#c2185b", urgency: "high",
    en: {
      title: "Protection from Cruelty in Marriage",
      law: "BNS Section 85–86 (earlier IPC Section 498A)",
      summary: "Your husband or in-laws cannot mentally or physically torture you, or harass you for dowry. This is a criminal offence.",
      details: `**What is covered?**
• Physical cruelty: hitting, beating, causing bodily harm
• Mental cruelty: threats, insults, humiliation, isolation
• Dowry harassment: demands for money, gold, property from your family

**Punishment for the accused:**
Up to 3 years imprisonment + fine. Police can arrest without a warrant.

**How to file a complaint?**
Visit the nearest police station. Ask for Women's Help Desk. You can also file online at your state police website.

**Important:** You can file within 3 years of the incident.`,
    },
    hi: {
      title: "विवाह में क्रूरता से सुरक्षा",
      law: "BNS धारा 85-86 (पहले IPC धारा 498A)",
      summary: "पति या ससुराल वाले आपको शारीरिक-मानसिक प्रताड़ना नहीं दे सकते।",
      details: `**क्या कवर होता है?**
• शारीरिक क्रूरता: मारपीट
• मानसिक क्रूरता: धमकी, अपमान
• दहेज उत्पीड़न

**सजा:** 3 साल जेल + जुर्माना
**शिकायत:** नजदीकी थाने में महिला हेल्प डेस्क पर जाएं।`,
    },
  },
  {
    id: "property", category: "Property & Finance", icon: "🏡", color: "#4caf50", urgency: "medium",
    en: {
      title: "Property & Inheritance Rights",
      law: "Hindu Succession Act, 1956 (amended 2005) · Muslim Personal Law · Indian Succession Act",
      summary: "A daughter has an equal right to ancestral property as a son. This right exists from birth.",
      details: `**Hindu women's property rights (2005 Amendment):**
• Daughters have equal right to ancestral property as sons
• This right exists even if the father died before 2005
• A married daughter retains full property rights

**Streedhan (Your personal property):**
• All gifts received before, during, or after marriage are YOUR property
• Jewellery, clothes, household items given to you belong to you
• Your husband/in-laws cannot claim it

**Right to maintenance:**
• Under Section 125 CrPC / BNSS, your husband must support you financially if separated`,
    },
    hi: {
      title: "संपत्ति और विरासत के अधिकार",
      law: "हिंदू उत्तराधिकार अधिनियम, 1956 (संशोधन 2005)",
      summary: "बेटी को पुश्तैनी संपत्ति में बेटे के समान अधिकार है।",
      details: `**बेटी के अधिकार:**
• पुश्तैनी संपत्ति में बराबर हिस्सा
• विवाह के बाद भी यह अधिकार बना रहता है

**स्त्रीधन:**
• विवाह से पहले, दौरान या बाद में मिले उपहार आपकी संपत्ति हैं`,
    },
  },
  {
    id: "workplace_equal", category: "Workplace", icon: "💰", color: "#9c27b0", urgency: "medium",
    en: {
      title: "Equal Pay & Maternity Rights",
      law: "Equal Remuneration Act, 1976 · Maternity Benefit Act, 1961",
      summary: "You must be paid equally for equal work. You are entitled to 26 weeks of paid maternity leave.",
      details: `**Equal Pay:**
• Employers cannot pay women less than men for the same work
• File complaint with the Labour Commissioner if discriminated

**Maternity Benefits:**
• 26 weeks paid maternity leave (for 2 or fewer children)
• 12 weeks for the 3rd child onwards
• Employer cannot fire you during maternity leave
• Right to a nursing break during working hours (until child is 15 months old)

**Crèche facility:**
Establishments with 50+ employees must provide a crèche. You have the right to visit it 4 times a day.`,
    },
    hi: {
      title: "समान वेतन और मातृत्व अधिकार",
      law: "समान पारिश्रमिक अधिनियम, 1976",
      summary: "समान कार्य के लिए समान वेतन मिलना चाहिए। 26 सप्ताह का सवेतन मातृत्व अवकाश।",
      details: `**समान वेतन:** समान कार्य के लिए महिलाओं को पुरुषों से कम नहीं देना चाहिए।

**मातृत्व लाभ:**
• 26 सप्ताह का सवेतन अवकाश (पहले दो बच्चों के लिए)
• मातृत्व अवकाश के दौरान नौकरी से नहीं निकाल सकते`,
    },
  },
  {
    id: "divorce", category: "Home & Family", icon: "📜", color: "#607d8b", urgency: "medium",
    en: {
      title: "Right to Divorce & Alimony",
      law: "Hindu Marriage Act, 1955 · Special Marriage Act, 1954",
      summary: "You have the right to seek divorce and claim maintenance, alimony, and custody of children.",
      details: `**Grounds for divorce (women can file on these):**
• Cruelty (physical or mental)
• Adultery by husband
• Desertion (husband left for 2+ years)
• Husband converted to another religion
• Husband has a mental disorder or incurable disease

**Special rights for women:**
• You can file divorce if husband married again (bigamy)
• If married before 15 years of age, you can repudiate marriage before turning 18

**Alimony / Maintenance:**
• Temporary maintenance during divorce proceedings
• Permanent alimony after divorce based on husband's income`,
    },
    hi: {
      title: "तलाक और गुजारा भत्ते का अधिकार",
      law: "हिंदू विवाह अधिनियम, 1955",
      summary: "आपको तलाक मांगने और गुजारा भत्ता पाने का अधिकार है।",
      details: `**तलाक के आधार:**
• क्रूरता, व्यभिचार, परित्याग (2+ वर्ष)
• पुनर्विवाह, मानसिक विकार

**गुजारा भत्ता:** पति की आय के आधार पर अस्थायी और स्थायी भरण-पोषण मिलता है।`,
    },
  },
  {
    id: "safety", category: "Safety & Body", icon: "🛡️", color: "#f44336", urgency: "high",
    en: {
      title: "Right to Safety & Self-Defence",
      law: "BNS Section 34–44 (Right to Private Defence) · BNS Sections 63–73 (Sexual Offences)",
      summary: "You have the right to protect your body from any attack. Rape, stalking, and voyeurism are criminal offences.",
      details: `**Your right to self-defence:**
You can use force — even lethal force — to protect yourself from assault, kidnapping, rape, or death threat.

**Sexual offences under law:**
• Rape: 10 years to life imprisonment
• Sexual assault: 1–5 years
• Stalking: 1–5 years
• Voyeurism: 1–7 years

**How to report:**
• Call 112 (National Emergency) or 1091 (Women's Helpline)
• File FIR at any police station — they cannot refuse
• Zero FIR can be filed at any station regardless of jurisdiction

**Your rights during reporting:**
• Statement must be recorded by a female officer
• Your identity must not be disclosed publicly`,
    },
    hi: {
      title: "सुरक्षा और आत्मरक्षा का अधिकार",
      law: "BNS धारा 34-44 · BNS धारा 63-73",
      summary: "आपको अपने शरीर की रक्षा करने का अधिकार है। FIR दर्ज करने से पुलिस मना नहीं कर सकती।",
      details: `**आत्मरक्षा का अधिकार:** जान का खतरा होने पर घातक बल का उपयोग भी कर सकती हैं।

**यौन अपराध:**
• बलात्कार: 10 साल से आजीवन कारावास
• यौन उत्पीड़न: 1-5 साल
• जीरो FIR किसी भी थाने में दर्ज हो सकती है`,
    },
  },
  {
    id: "education", category: "Education & Health", icon: "📚", color: "#00bcd4", urgency: "low",
    en: {
      title: "Right to Education & Health",
      law: "RTE Act, 2009 · MTP Act, 1971 (amended 2021) · Constitution Articles 14, 15, 21",
      summary: "Every girl has the right to free education up to age 14. You have the right to safe abortion up to 24 weeks.",
      details: `**Right to Education:**
• Free and compulsory education for all children 6–14 years (RTE Act)
• No girl can be expelled for being pregnant

**Right to abortion (MTP Act, 2021 amendment):**
• Up to 20 weeks: requires one doctor's opinion
• 20–24 weeks: requires two doctors' opinion (for rape survivors, minors, contraceptive failure)
• Your consent is mandatory — husband/family cannot override
• Doctor cannot disclose your identity

**Mental health:**
• Mental Healthcare Act 2017 — you have the right to mental health treatment`,
    },
    hi: {
      title: "शिक्षा और स्वास्थ्य का अधिकार",
      law: "RTE अधिनियम, 2009 · MTP अधिनियम, 1971",
      summary: "हर लड़की को 14 वर्ष तक मुफ्त शिक्षा का अधिकार है। 24 सप्ताह तक सुरक्षित गर्भपात का अधिकार।",
      details: `**शिक्षा का अधिकार:** 6-14 वर्ष के बच्चों को मुफ्त और अनिवार्य शिक्षा

**गर्भपात का अधिकार (MTP 2021):**
• 20 सप्ताह तक: एक डॉक्टर की राय
• आपकी सहमति अनिवार्य है`,
    },
  },
  {
    id: "cyber", category: "Digital & Cyber", icon: "💻", color: "#673ab7", urgency: "high",
    en: {
      title: "Cyber Crime & Online Harassment",
      law: "IT Act, 2000 · BNS Sections 77, 79 · POCSO Act",
      summary: "Online harassment, deepfakes, stalking, and non-consensual sharing of intimate images are criminal offences.",
      details: `**What is cybercrime against women?**
• Sending obscene messages or images — up to 5 years
• Cyberstalking: repeatedly messaging, monitoring, threatening online — up to 3 years
• Morphing photos / deepfakes — up to 3 years
• Non-consensual sharing of intimate images ("revenge porn") — up to 3 years + fine
• Online impersonation — up to 3 years

**How to report:**
• Visit cybercrime.gov.in (national portal, report anonymously)
• Call 1930 (National Cyber Crime Helpline)
• File FIR at local Cyber Crime police station

**Preserve evidence first:**
• Take screenshots with timestamps
• Note usernames, URLs, phone numbers
• Do not delete anything before reporting`,
    },
    hi: {
      title: "साइबर अपराध और ऑनलाइन उत्पीड़न",
      law: "IT अधिनियम, 2000 · BNS धारा 77, 79",
      summary: "ऑनलाइन उत्पीड़न, डीपफेक, और अंतरंग तस्वीरें साझा करना आपराधिक अपराध हैं।",
      details: `**साइबर अपराध:**
• अश्लील संदेश: 5 साल तक जेल
• डीपफेक: 3 साल तक
• बिना सहमति के अंतरंग तस्वीरें: 3 साल + जुर्माना

**शिकायत:** cybercrime.gov.in पर ऑनलाइन या 1930 पर कॉल करें।`,
    },
  },
  {
    id: "child_marriage", category: "Education & Health", icon: "👧", color: "#ff5722", urgency: "high",
    en: {
      title: "Protection from Child Marriage",
      law: "Prohibition of Child Marriage Act, 2006 · POCSO Act, 2012",
      summary: "Marriage below age 18 (girls) and 21 (boys) is illegal. A girl can get the marriage annulled.",
      details: `**Your rights:**
• You can get the marriage declared void (annulled) before you turn 20
• File petition in district court even without your family's support
• Parents arranging child marriage can be fined and imprisoned (up to 2 years)

**Who can file a complaint?**
• The child herself
• Any person on her behalf (NGO, guardian, teacher)
• Child Marriage Prohibition Officer (CMPO) in every district

**Note:** Any sexual act with a girl under 18, even within marriage, is statutory rape under POCSO.

**Helpline:** Call Childline at 1098 (free, 24/7).`,
    },
    hi: {
      title: "बाल विवाह से सुरक्षा",
      law: "बाल विवाह निषेध अधिनियम, 2006 · POCSO अधिनियम, 2012",
      summary: "18 वर्ष से कम उम्र में लड़की का विवाह अवैध है।",
      details: `**आपके अधिकार:**
• 20 वर्ष की आयु से पहले विवाह को अमान्य घोषित करवा सकती हैं
• परिवार की मदद के बिना भी जिला न्यायालय में याचिका दायर कर सकती हैं

**हेल्पलाइन:** Childline 1098 (मुफ्त, 24/7)`,
    },
  },
];

const HELPLINES = [
  { number: "1091",  label: "Women's Helpline",  icon: "📞", color: "#e91e8c" },
  { number: "112",   label: "National Emergency", icon: "🚨", color: "#f44336" },
  { number: "181",   label: "Women in Distress",  icon: "🆘", color: "#ff5722" },
  { number: "1930",  label: "Cyber Crime",        icon: "💻", color: "#673ab7" },
  { number: "1098",  label: "Childline",          icon: "👧", color: "#00bcd4" },
  { number: "14567", label: "Elder Care",         icon: "🏥", color: "#4caf50" },
];

const CATEGORIES = [
  "All", "Home & Family", "Workplace", "Safety & Body",
  "Property & Finance", "Education & Health", "Digital & Cyber",
];

function matchesSearch(right, query, lang) {
  const q = query.toLowerCase();
  const t = right[lang] || right.en;
  return (
    t.title.toLowerCase().includes(q) ||
    t.summary.toLowerCase().includes(q) ||
    t.law.toLowerCase().includes(q) ||
    (t.details || "").toLowerCase().includes(q)
  );
}

function RichText({ text }) {
  return (
    <div className="kyr-rich">
      {text.trim().split("\n").map((line, i) => {
        line = line.trim();
        if (!line) return <br key={i} />;
        if (line.startsWith("**") && line.endsWith("**"))
          return <p key={i} className="kyr-rich__heading">{line.replace(/\*\*/g, "")}</p>;
        if (line.startsWith("•"))
          return <p key={i} className="kyr-rich__bullet">{line}</p>;
        return <p key={i} className="kyr-rich__body">{line}</p>;
      })}
    </div>
  );
}

function RightCard({ right, lang, uiStr }) {
  const [expanded, setExpanded] = useState(false);
  const data = right[lang] || right.en;
  return (
    <div className="kyr-rc" style={{ "--rc-color": right.color }}>
      <div className="kyr-rc__header">
        <span className="kyr-rc__icon">{right.icon}</span>
        <div className="kyr-rc__meta">
          <span className="kyr-rc__cat">{right.category}</span>
          {right.urgency === "high" && <span className="kyr-rc__urgent">⚡ Know This</span>}
        </div>
      </div>
      <h3 className="kyr-rc__title">{data.title}</h3>
      <p className="kyr-rc__law">📋 {data.law}</p>
      <p className="kyr-rc__summary">{data.summary}</p>
      {data.details && (
        <>
          {expanded && (
            <div className="kyr-rc__details">
              <RichText text={data.details} />
            </div>
          )}
          <button className="kyr-rc__toggle" onClick={() => setExpanded(e => !e)}>
            {expanded ? `▲ ${uiStr.readLess}` : `▼ ${uiStr.readMore}`}
          </button>
        </>
      )}
    </div>
  );
}

function HelplinesPanel({ uiStr }) {
  return (
    <div className="kyr-hl-panel">
      <h3 className="kyr-hl-panel__title">📞 {uiStr.helpline}</h3>
      <div className="kyr-hl-grid">
        {HELPLINES.map(h => (
          <a key={h.number} href={`tel:${h.number}`} className="kyr-hl-card" style={{ "--hl-color": h.color }}>
            <span className="kyr-hl-card__icon">{h.icon}</span>
            <div className="kyr-hl-card__number">{h.number}</div>
            <div className="kyr-hl-card__label">{h.label}</div>
            <div className="kyr-hl-card__call">{uiStr.callNow}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function OfflineBanner({ uiStr }) {
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    localStorage.setItem("kyr_cached", JSON.stringify({ ts: Date.now(), data: RIGHTS_DATA }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  return (
    <div className="kyr-offline-banner">
      <span>📥</span>
      <span>{saved ? uiStr.saved : uiStr.download}</span>
      <button
        className={`kyr-offline-banner__btn${saved ? " kyr-offline-banner__btn--saved" : ""}`}
        onClick={handleSave}
      >
        {saved ? "✓" : "↓"}
      </button>
    </div>
  );
}

export default function KnowYourRights() {
  const [lang, setLang]         = useState("en");
  const [category, setCategory] = useState("All");
  const [search, setSearch]     = useState("");
  const [showHL, setShowHL]     = useState(false);

  const ui = UI[lang] || UI.en;

  const visible = RIGHTS_DATA.filter(r => {
    const catMatch = category === "All" || r.category === category;
    const searchMatch = !search.trim() || matchesSearch(r, search, lang);
    return catMatch && searchMatch;
  });

  return (
    <div className="kyr-page">
      {/* Top bar */}
      <div className="kyr-topbar">
        <div className="kyr-topbar__brand">🌸 ShaktiNet · Know Your Rights</div>
        <div className="kyr-topbar__langs">
          {Object.entries(LANG_META).map(([code, meta]) => (
            <button
              key={code}
              className={`kyr-lang-btn${lang === code ? " kyr-lang-btn--active" : ""}`}
              onClick={() => setLang(code)}
              title={meta.label}
            >
              {meta.flag} {meta.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="kyr-hero">
        <div className="kyr-hero__bg" />
        <div className="kyr-hero__inner">
          <span className="kyr-hero__eyebrow">Legal Rights · India</span>
          <h1 className="kyr-hero__title">{ui.title}</h1>
          <p className="kyr-hero__subtitle">{ui.subtitle}</p>
          <div className="kyr-search-wrap">
            <span className="kyr-search-wrap__icon">🔍</span>
            <input
              className="kyr-search"
              placeholder={ui.search}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="kyr-search__clear" onClick={() => setSearch("")}>✕</button>
            )}
          </div>
          <div className="kyr-hero__actions">
            <OfflineBanner uiStr={ui} />
            <button
              className={`kyr-hl-toggle${showHL ? " kyr-hl-toggle--active" : ""}`}
              onClick={() => setShowHL(v => !v)}
            >
              📞 {ui.helpline}
            </button>
          </div>
        </div>
      </div>

      {/* Helplines panel */}
      {showHL && <HelplinesPanel uiStr={ui} />}

      {/* SOS strip */}
      <div className="kyr-sos-strip">
        <span className="kyr-sos-strip__label">🆘 {ui.emergency}</span>
        <div className="kyr-sos-strip__nums">
          <a href="tel:112"  className="kyr-sos-num">112</a>
          <a href="tel:1091" className="kyr-sos-num">1091</a>
          <a href="tel:181"  className="kyr-sos-num">181</a>
        </div>
        <span className="kyr-sos-strip__hint">Tap to call instantly</span>
      </div>

      {/* Category filters */}
      <div className="kyr-filters">
        {CATEGORIES.map(c => (
          <button
            key={c}
            className={`kyr-pill${category === c ? " kyr-pill--active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c === "All" ? ui.all : c}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="kyr-count">
        {visible.length} right{visible.length !== 1 ? "s" : ""} found
        {search && <span> for "<strong>{search}</strong>"</span>}
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="kyr-grid">
          {visible.map(r => (
            <RightCard key={r.id} right={r} lang={lang} uiStr={ui} />
          ))}
        </div>
      ) : (
        <div className="kyr-empty">
          <span className="kyr-empty__icon">🔍</span>
          <p>{ui.noResults}</p>
        </div>
      )}

      {/* Footer */}
      <footer className="kyr-footer">
        <p>🌸 ShaktiNet · Know Your Rights</p>
        <p className="kyr-footer__note">
          For awareness only — not a substitute for legal advice. Consult a qualified lawyer for your specific situation.
        </p>
        <p className="kyr-footer__note">Laws updated as of 2025 · BNS replaces IPC from July 2024</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .kyr-page {
          min-height: 100vh;
          background: #0d0a0b;
          color: #f5e6d3;
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        /* Top bar */
        .kyr-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.9rem 2rem;
          background: rgba(13,10,11,0.98);
          border-bottom: 1px solid #2e1a20;
          backdrop-filter: blur(12px);
          position: sticky; top: 0; z-index: 100;
          flex-wrap: wrap; gap: 0.75rem;
        }
        .kyr-topbar__brand {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 900; color: #e91e8c; white-space: nowrap;
        }
        .kyr-topbar__langs { display: flex; gap: 0.35rem; flex-wrap: wrap; }
        .kyr-lang-btn {
          padding: 0.28rem 0.7rem; border-radius: 100px;
          border: 1px solid #2e1a20; background: transparent;
          color: #7a6a5a; font-size: 0.72rem; cursor: pointer; transition: all 0.18s;
        }
        .kyr-lang-btn:hover { color: #f5e6d3; }
        .kyr-lang-btn--active {
          color: #e91e8c; border-color: rgba(233,30,140,0.35);
          background: rgba(233,30,140,0.08); font-weight: 600;
        }

        /* Hero */
        .kyr-hero {
          position: relative; overflow: hidden;
          padding: 4rem 2rem 3rem; text-align: center;
        }
        .kyr-hero__bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(233,30,140,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 80% 80%, rgba(194,24,91,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .kyr-hero__inner {
          position: relative; z-index: 1;
          max-width: 700px; margin: 0 auto;
          display: flex; flex-direction: column; align-items: center; gap: 1rem;
        }
        .kyr-hero__eyebrow {
          font-size: 0.7rem; text-transform: uppercase;
          letter-spacing: 0.22em; color: #e91e8c; font-weight: 700;
        }
        .kyr-hero__title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 900; color: #f5e6d3;
          line-height: 1.08; letter-spacing: -0.03em;
        }
        .kyr-hero__subtitle {
          font-size: 0.95rem; color: #c9b8a8; max-width: 480px; line-height: 1.75;
        }

        /* Search */
        .kyr-search-wrap {
          position: relative; width: 100%; max-width: 520px; margin-top: 0.5rem;
        }
        .kyr-search-wrap__icon {
          position: absolute; left: 1rem; top: 50%; transform: translateY(-50%);
          font-size: 1rem; pointer-events: none;
        }
        .kyr-search {
          width: 100%; background: #1a0e12; border: 1px solid #2e1a20;
          border-radius: 0.75rem; padding: 0.85rem 2.8rem;
          color: #f5e6d3; font-size: 0.95rem; outline: none; transition: border-color 0.2s;
        }
        .kyr-search:focus { border-color: rgba(233,30,140,0.35); }
        .kyr-search::placeholder { color: #3a2a2a; }
        .kyr-search__clear {
          position: absolute; right: 1rem; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: #7a6a5a; cursor: pointer;
          font-size: 0.85rem; transition: color 0.2s;
        }
        .kyr-search__clear:hover { color: #e91e8c; }

        /* Hero actions */
        .kyr-hero__actions {
          display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center;
        }

        /* Offline banner */
        .kyr-offline-banner {
          display: flex; align-items: center; gap: 0.5rem;
          background: #1a0e12; border: 1px solid #2e1a20;
          border-radius: 100px; padding: 0.45rem 1rem;
          font-size: 0.8rem; color: #c9b8a8;
        }
        .kyr-offline-banner__btn {
          width: 24px; height: 24px; border-radius: 50%;
          background: rgba(233,30,140,0.08); border: 1px solid rgba(233,30,140,0.35);
          color: #e91e8c; font-size: 0.85rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center; transition: all 0.2s;
        }
        .kyr-offline-banner__btn--saved {
          background: rgba(76,175,80,0.15); border-color: rgba(76,175,80,0.4); color: #4caf50;
        }

        /* Helpline toggle */
        .kyr-hl-toggle {
          padding: 0.5rem 1.25rem; border-radius: 100px;
          border: 1px solid rgba(233,30,140,0.35); background: rgba(233,30,140,0.08);
          color: #e91e8c; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.22s;
        }
        .kyr-hl-toggle:hover, .kyr-hl-toggle--active { background: #e91e8c; color: white; }

        /* SOS strip */
        .kyr-sos-strip {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; padding: 0.65rem 2rem;
          background: rgba(244,67,54,0.08);
          border-top: 1px solid rgba(244,67,54,0.2);
          border-bottom: 1px solid rgba(244,67,54,0.2);
          flex-wrap: wrap;
        }
        .kyr-sos-strip__label {
          font-size: 0.72rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em; color: #ff5252;
        }
        .kyr-sos-strip__nums { display: flex; gap: 0.5rem; }
        .kyr-sos-num {
          padding: 0.3rem 0.9rem;
          background: rgba(244,67,54,0.12); border: 1px solid rgba(244,67,54,0.3);
          border-radius: 100px; color: #ff5252; font-weight: 800;
          font-size: 0.88rem; text-decoration: none; transition: all 0.2s;
        }
        .kyr-sos-num:hover { background: rgba(244,67,54,0.25); }
        .kyr-sos-strip__hint { font-size: 0.7rem; color: #7a6a5a; }

        /* Helplines panel */
        .kyr-hl-panel {
          background: #130c0f; border-bottom: 1px solid #2e1a20;
          padding: 1.5rem 2rem;
          animation: kyrSlideDown 0.3s ease;
        }
        @keyframes kyrSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .kyr-hl-panel__title { font-size: 1rem; font-weight: 700; color: #f5e6d3; margin-bottom: 1rem; }
        .kyr-hl-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 0.75rem; max-width: 900px; margin: 0 auto;
        }
        .kyr-hl-card {
          display: flex; flex-direction: column; align-items: center; gap: 0.3rem;
          padding: 1rem 0.75rem; background: #1a0e12; border: 1px solid #2e1a20;
          border-radius: 0.75rem; text-decoration: none; transition: all 0.22s;
          border-left: 3px solid var(--hl-color);
        }
        .kyr-hl-card:hover { transform: translateY(-3px); background: rgba(255,255,255,0.03); }
        .kyr-hl-card__icon { font-size: 1.4rem; }
        .kyr-hl-card__number {
          font-size: 1.3rem; font-weight: 900; color: var(--hl-color);
          font-family: 'Playfair Display', serif;
        }
        .kyr-hl-card__label { font-size: 0.7rem; color: #7a6a5a; text-align: center; }
        .kyr-hl-card__call {
          font-size: 0.65rem; color: var(--hl-color); font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em; margin-top: 0.15rem;
        }

        /* Filters */
        .kyr-filters {
          display: flex; gap: 0.5rem; flex-wrap: wrap;
          padding: 1.25rem 2rem 0.75rem; max-width: 1200px; margin: 0 auto;
        }
        .kyr-pill {
          padding: 0.35rem 1rem; border-radius: 100px;
          border: 1px solid #2e1a20; background: transparent;
          color: #7a6a5a; font-size: 0.78rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .kyr-pill:hover { color: #f5e6d3; }
        .kyr-pill--active {
          color: #e91e8c; border-color: rgba(233,30,140,0.35);
          background: rgba(233,30,140,0.08); font-weight: 600;
        }

        /* Count */
        .kyr-count {
          padding: 0.4rem 2rem 0.75rem; font-size: 0.78rem;
          color: #7a6a5a; max-width: 1200px; margin: 0 auto;
        }

        /* Grid */
        .kyr-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.25rem; padding: 0.5rem 2rem 2.5rem;
          max-width: 1200px; margin: 0 auto;
        }

        /* Right card */
        .kyr-rc {
          background: #1a0e12; border: 1px solid #2e1a20;
          border-radius: 1rem; padding: 1.5rem;
          border-top: 3px solid var(--rc-color);
          transition: transform 0.22s, box-shadow 0.22s;
          animation: kyrFadeUp 0.4s ease both;
          display: flex; flex-direction: column; gap: 0.6rem;
        }
        .kyr-rc:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
        @keyframes kyrFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .kyr-rc__header { display: flex; align-items: center; gap: 0.75rem; }
        .kyr-rc__icon { font-size: 1.8rem; }
        .kyr-rc__meta { display: flex; flex-direction: column; gap: 0.2rem; }
        .kyr-rc__cat {
          font-size: 0.65rem; text-transform: uppercase;
          letter-spacing: 0.12em; color: #7a6a5a; font-weight: 700;
        }
        .kyr-rc__urgent { font-size: 0.65rem; color: #ff9800; font-weight: 700; }
        .kyr-rc__title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 800; color: #f5e6d3; line-height: 1.3;
        }
        .kyr-rc__law {
          font-size: 0.72rem; color: var(--rc-color); font-weight: 600;
          line-height: 1.5; padding: 0.4rem 0.75rem;
          background: color-mix(in srgb, var(--rc-color) 10%, transparent);
          border-radius: 0.4rem; border-left: 2px solid var(--rc-color);
        }
        .kyr-rc__summary { font-size: 0.88rem; color: #c9b8a8; line-height: 1.7; }
        .kyr-rc__details {
          background: #130c0f; border: 1px solid #2e1a20;
          border-radius: 0.5rem; padding: 1rem 1.25rem;
          animation: kyrFadeUp 0.3s ease;
        }
        .kyr-rc__toggle {
          background: none; border: none; color: var(--rc-color);
          font-size: 0.8rem; font-weight: 600; cursor: pointer;
          padding: 0.25rem 0; transition: opacity 0.2s; text-align: left;
        }
        .kyr-rc__toggle:hover { opacity: 0.75; }

        /* Rich text */
        .kyr-rich { display: flex; flex-direction: column; gap: 0.5rem; }
        .kyr-rich__heading { font-weight: 700; font-size: 0.85rem; color: #f5e6d3; margin-top: 0.5rem; }
        .kyr-rich__bullet { font-size: 0.84rem; color: #c9b8a8; line-height: 1.6; padding-left: 0.5rem; }
        .kyr-rich__body   { font-size: 0.84rem; color: #c9b8a8; line-height: 1.7; }

        /* Empty */
        .kyr-empty { text-align: center; padding: 4rem 2rem; color: #7a6a5a; }
        .kyr-empty__icon { font-size: 3rem; display: block; margin-bottom: 1rem; }

        /* Footer */
        .kyr-footer {
          background: #130c0f; border-top: 1px solid #2e1a20;
          padding: 2rem; text-align: center; margin-top: 2rem;
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
        }
        .kyr-footer p { font-size: 0.85rem; color: #7a6a5a; }
        .kyr-footer p:first-child {
          color: #e91e8c; font-weight: 700;
          font-family: 'Playfair Display', serif; font-size: 1rem;
        }
        .kyr-footer__note { font-size: 0.72rem !important; color: #3a2a2a !important; line-height: 1.6; }

        @media (max-width: 640px) {
          .kyr-topbar { padding: 0.75rem 1rem; }
          .kyr-lang-btn { font-size: 0.65rem; padding: 0.22rem 0.5rem; }
          .kyr-hero { padding: 2.5rem 1rem 2rem; }
          .kyr-filters { padding: 1rem 1rem 0.5rem; }
          .kyr-grid { grid-template-columns: 1fr; padding: 0.5rem 1rem 2rem; }
          .kyr-count { padding: 0.4rem 1rem 0.5rem; }
          .kyr-hl-panel { padding: 1rem; }
        }
      `}</style>
    </div>
  );
}
