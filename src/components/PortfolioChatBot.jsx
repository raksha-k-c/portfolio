import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import "./PortfolioChatBot.css";

/* ============================================================
   1. PROFILE — your real info, used by the rule-based backup
   ============================================================ */
const PROFILE = {
  name: "Raksha",
  fullName: "Raksha KC",
  role: "a full-stack software engineer with an applied-AI and biomedical engineering background",
  location: "Bengaluru, India",
  about:
    "I'm a full-stack engineer pursuing a B.E. in Medical Electronics Engineering. I build across React/TypeScript frontends, Python/Node backends, and applied-ML pipelines with PyTorch and computer vision, and I've also worked hands-on with embedded hardware and clinical device systems.",
  currentRole:
    "I'm currently a Software Development Engineer Intern at Scoop Labs, where I build modular, reusable React frontends and ship end-to-end features with design and backend teams.",
  student:
    "Yes, I'm a full-time engineering student, studying Medical Electronics Engineering at BMS College of Engineering in Bengaluru (2023 to 2027, expected).",
  skills: [
    "React & TypeScript",
    "JavaScript, HTML5/CSS3, Vite",
    "Python, Node.js/Express, Flask/FastAPI",
    "PostgreSQL, MongoDB, SQL",
    "PyTorch, computer vision, scikit-learn",
    "ESP32 & embedded C++",
    "Git, Docker, CI/CD, Azure, Linux",
  ],
  projects: [
    {
      name: "Smart Injector",
      blurb:
        "An embedded medical device prototype built with ESP32, C++, ultrasonic sensing, and stepper control — hardware, firmware, and monitoring, end to end.",
      link: "https://github.com/raksha-k-c",
    },
    {
      name: "Healthcare Management Dashboard",
      blurb:
        "A multi-view dashboard (Java 21, Swing, CardLayout) with charts for structured clinical and operational data.",
      link: "https://github.com/raksha-k-c",
    },
    {
      name: "Personal Portfolio & Blog Platform",
      blurb:
        "This site! Built with React, Vite, React Router, and Canvas — a data-driven blog and command palette, all reusable, config-driven components.",
      link: "https://rakshakc.xyz",
    },
  ],
  experience: [
    {
      role: "Software Development Engineer Intern",
      org: "Scoop Labs",
      dates: "Apr 2026 – Present",
      blurb:
        "Architecting client platforms and shipping modular, reusable frontend systems in React, deploying performant web properties with Vite, and collaborating cross-functionally with design and backend teams.",
    },
    {
      role: "Biomedical Engineering Intern",
      org: "Sri Jayadeva Institute of Cardiovascular Sciences and Research",
      dates: "Jul 2025 – Aug 2025",
      blurb:
        "Analyzed real-world clinical device workflows and interface metrics, and tracked signal integrity on live cardiovascular hardware, documenting device behavior for reliability improvements.",
    },
  ],
  education:
    "I'm pursuing a B.E. in Medical Electronics Engineering at BMS College of Engineering, Bengaluru (2023 to 2027, expected).",
  certifications: [
    "Machine Learning with MATLAB (MathWorks)",
    "Signal Processing (MathWorks)",
  ],
  leetcode:
    "I keep a consistent daily LeetCode practice, mostly DSA and algorithms. You can check it out at leetcode.com/u/rakshakc.",
  funFact:
    "outside of code, I've gotten pretty hooked on solving DSA problems daily on LeetCode, it's basically become a little ritual at this point!",
  availability:
    "I'm available to work 6 days a week, in-office, starting 20th July 2026.",
  resumeLink: "/Raksha_KC_Resume_Medtech.pdf",
  contact: {
    email: "raksha.chandru66@gmail.com",
    linkedin: "https://linkedin.com/in/rakshakc",
    github: "https://github.com/raksha-k-c",
    leetcode: "https://leetcode.com/u/rakshakc",
  },
};

/* ============================================================
   2. INTENTS
   ============================================================ */
const INTENTS = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "yo", "sup", "howdy"],
    replies: [
      `Hey! 👋 I'm ${PROFILE.name}. Ask me about my work, skills, or projects — happy to chat!`,
      `Hi there! Great to meet you — I'm ${PROFILE.name}. What would you like to know?`,
    ],
  },
  {
    id: "wellbeing",
    keywords: [
      "how are you", "how're you", "hows it going", "how's it going",
      "how you doing", "how are u", "you good", "you okay", "whats up", "what's up",
    ],
    replies: [
      "I'm doing good, thanks for asking! How about you?",
      "Pretty great, actually! What about you, how's your day going?",
      "All good here! Thanks for checking in 😊 How are you doing?",
    ],
  },
  {
    id: "name",
    keywords: ["your name", "who are you", "whats your name", "what's your name"],
    replies: [`I'm ${PROFILE.fullName}! Nice to meet you.`],
  },
  {
    id: "about",
    keywords: ["about", "yourself", "bio", "background", "tell me about"],
    replies: [
      PROFILE.about,
      `In short: I'm ${PROFILE.role}, based in ${PROFILE.location}. ${PROFILE.about}`,
    ],
  },
  {
    id: "location",
    keywords: ["where are you from", "where do you live", "based", "location", "which city"],
    replies: [`I'm based in ${PROFILE.location}.`],
  },
  {
    id: "student",
    keywords: ["are you a student", "still studying", "still in college", "in school"],
    replies: [PROFILE.student],
  },
  {
    id: "currentrole",
    keywords: ["what do you do", "current job", "current role", "where do you work", "what are you working on"],
    replies: [PROFILE.currentRole],
  },
  {
    id: "skills",
    keywords: ["skill", "tech", "stack", "language", "tools", "know", "expert"],
    replies: [
      `My main toolkit is: ${PROFILE.skills.join(", ")}.`,
      `I mostly work with ${PROFILE.skills.slice(0, 4).join(", ")}, and a bit of ${PROFILE.skills
        .slice(4)
        .join(", ")}.`,
    ],
  },
  {
    id: "projects",
    keywords: ["project", "work", "built", "made", "portfolio", "showcase", "favorite project"],
    replies: ["projects"],
  },
  {
    id: "experience",
    keywords: ["experience", "job", "career", "worked", "company", "internship"],
    replies: ["experience"],
  },
  {
    id: "education",
    keywords: ["study", "studied", "education", "degree", "college", "university", "school"],
    replies: [PROFILE.education],
  },
  {
    id: "certifications",
    keywords: ["certification", "certificate", "certified", "matlab"],
    replies: [`I've also done a couple of certifications: ${PROFILE.certifications.join(" and ")}.`],
  },
  {
    id: "leetcode",
    keywords: ["leetcode", "dsa", "algorithms", "coding practice", "competitive programming"],
    replies: [PROFILE.leetcode],
  },
  {
    id: "availability",
    keywords: ["available", "availability", "notice period", "when can you start", "joining"],
    replies: [PROFILE.availability],
  },
  {
    id: "medtech",
    keywords: ["medtech", "medical device", "healthcare industry", "biomedical", "why medical"],
    replies: [
      "Medtech genuinely excites me — I'm studying Medical Electronics Engineering, and I've worked hands-on with clinical device workflows during my internship at a cardiovascular research institute, plus built an embedded medical device prototype (the Smart Injector). I love that it combines rigorous engineering with real-world impact on people's health.",
    ],
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "hire", "linkedin", "connect", "talk"],
    replies: [
      `You can reach me at ${PROFILE.contact.email} or connect on LinkedIn: ${PROFILE.contact.linkedin}`,
      `Best way to reach me is email (${PROFILE.contact.email}), or find me on GitHub: ${PROFILE.contact.github}`,
    ],
  },
  {
    id: "resume",
    keywords: ["resume", "cv"],
    replies: [`Here's my resume: ${PROFILE.resumeLink}`],
  },
  {
    id: "fun",
    keywords: ["fun", "hobby", "hobbies", "free time", "interest"],
    replies: [`Good question, ${PROFILE.funFact}`],
  },
  {
    id: "isbot",
    keywords: ["are you a bot", "are you real", "are you ai", "human or bot", "chatbot"],
    replies: [
      `Ha, good eye, this chat is an automated version of me that answers common questions. For anything real-time, drop me an email at ${PROFILE.contact.email}!`,
    ],
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "thx", "appreciate"],
    replies: ["Anytime! 🙂", "Of course, happy to help.", "No problem at all!"],
  },
  {
    id: "bye",
    keywords: ["bye", "goodbye", "see ya", "later"],
    replies: [
      `Thanks for stopping by! Feel free to reach out anytime at ${PROFILE.contact.email}.`,
      "Take care! Come back if you have more questions.",
    ],
  },
];

const FALLBACKS = [
  "I'm not sure about that one, but ask me about my projects, skills, experience, or how to get in touch!",
  "Hmm, I don't have an answer for that. Try asking about my background, education, or availability.",
  "That's outside what I know how to answer, but I'm happy to talk projects, skills, or experience!",
];

const QUICK_REPLIES = ["Tell me about you", "What are your skills?", "Show me projects", "How can I contact you?"];

/* ============================================================
   3. MATCHING + REPLY LOGIC
   ============================================================ */
function pickReply(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function nameFromMessage(text) {
  const match = text.match(/(?:my name is|call me|i'?m called)\s+([a-zA-Z]+)/i);
  return match ? match[1] : null;
}

function getBotReply(userText, memory) {
  const text = userText.toLowerCase();

  const newName = nameFromMessage(text);
  if (newName) memory.userName = newName;

  if (/^(hi|hello|hey)\b/.test(text) && memory.userName) {
    return `Hey ${memory.userName}! 👋 What would you like to know?`;
  }

  let best = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    const score = intent.keywords.reduce((acc, kw) => {
      const pattern = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      return pattern.test(text) ? acc + kw.split(" ").length : acc;
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  if (!best || bestScore === 0) {
    return pickReply(FALLBACKS);
  }

  if (best.id === "projects") {
    const list = PROFILE.projects
      .map((p) => `• ${p.name} — ${p.blurb}`)
      .join("\n");
    return `Here are the main things I've built:\n${list}\n\nWant more detail on any of these?`;
  }

  if (best.id === "experience") {
    const list = PROFILE.experience
      .map((e) => `• ${e.role} at ${e.org} (${e.dates}) — ${e.blurb}`)
      .join("\n");
    return `Here's my experience so far:\n${list}`;
  }

  const reply = pickReply(best.replies);
  return memory.userName && Math.random() < 0.3
    ? `${reply} Let me know if you want more, ${memory.userName}.`
    : reply;
}

/* ============================================================
   4. UI COMPONENT
   ============================================================ */
export default function PortfolioChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: `Hey, I'm ${PROFILE.name} 👋 Ask me anything about my work, skills, projects, or background!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const memory = useRef({ userName: null });
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    let reply;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();
      reply = data.reply;
    } catch (err) {
      reply = getBotReply(trimmed, memory.current);
    }

    setTyping(false);
    setMessages((prev) => [...prev, { role: "bot", text: reply }]);
  }

  return (
    <div className="pcb-container">
      {open ? (
        <div className="pcb-window">
          <div className="pcb-header">
            <div>
              <p className="pcb-header-title">Chat with {PROFILE.name}</p>
              <p className="pcb-header-sub">Usually replies instantly</p>
            </div>
            <button className="pcb-close" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={20} />
            </button>
          </div>

          <div className="pcb-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`pcb-row ${m.role}`}>
                <div className={`pcb-bubble ${m.role}`}>{m.text}</div>
              </div>
            ))}

            {typing && (
              <div className="pcb-typing">
                <span className="pcb-dot" />
                <span className="pcb-dot" />
                <span className="pcb-dot" />
              </div>
            )}
          </div>

          {messages.length < 3 && (
            <div className="pcb-quick-replies">
              {QUICK_REPLIES.map((q) => (
                <button key={q} className="pcb-chip" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="pcb-input-row">
            <input
              className="pcb-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Type a message..."
            />
            <button className="pcb-send" onClick={() => sendMessage(input)} aria-label="Send message">
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button className="pcb-launcher" onClick={() => setOpen(true)} aria-label="Open chat">
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}
