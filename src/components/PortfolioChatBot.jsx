import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import "./PortfolioChatBot.css";

/* ============================================================
   1. CUSTOMIZE ME
   Fill this in with your real info. Everything the bot "knows"
   comes from here — no external API, no cost, fully offline.
   ============================================================ */
const PROFILE = {
  name: "Raksha",
  role: "a software engineer / developer",
  location: "Bengaluru, India",
  about:
    "I build things across the stack — from clean front-end interfaces to backend systems — and I love turning messy problems into simple, usable products.",
  skills: [
    "JavaScript / TypeScript",
    "React & Next.js",
    "Node.js",
    "Python",
    "SQL",
  ],
  projects: [
    {
      name: "Project One",
      blurb: "A short one-liner on what it does and why it's interesting.",
      link: "https://github.com/raksha-k-c/project-one",
    },
    {
      name: "Project Two",
      blurb: "Another short one-liner.",
      link: "https://github.com/raksha-k-c/project-two",
    },
  ],
  experience:
    "I've worked on [role] at [company], where I [one memorable thing you did].",
  education: "Studying/graduated in [degree], [school].",
  funFact: "outside of code I enjoy [hobby] — ask me about it!",
  resumeLink: "#",
  contact: {
    email: "you@example.com",
    linkedin: "https://linkedin.com/in/your-handle",
    github: "https://github.com/raksha-k-c",
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
    id: "about",
    keywords: ["about", "who are you", "who is", "yourself", "bio", "background"],
    replies: [
      PROFILE.about,
      `In short: I'm ${PROFILE.role}, based in ${PROFILE.location}. ${PROFILE.about}`,
    ],
  },
  {
    id: "skills",
    keywords: ["skill", "tech", "stack", "language", "tools", "know", "expert"],
    replies: [
      `My main toolkit is: ${PROFILE.skills.join(", ")}.`,
      `I mostly work with ${PROFILE.skills.slice(0, 3).join(", ")}, plus ${PROFILE.skills
        .slice(3)
        .join(", ") || "a few other tools"}.`,
    ],
  },
  {
    id: "projects",
    keywords: ["project", "work", "built", "made", "portfolio", "showcase"],
    replies: ["projects"],
  },
  {
    id: "experience",
    keywords: ["experience", "job", "career", "worked", "company", "internship"],
    replies: [PROFILE.experience],
  },
  {
    id: "education",
    keywords: ["study", "studied", "education", "degree", "college", "university", "school"],
    replies: [PROFILE.education],
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "hire", "linkedin", "connect", "talk"],
    replies: [
      `You can reach me at ${PROFILE.contact.email} or connect on LinkedIn: ${PROFILE.contact.linkedin}`,
      `Best way to reach me is email (${PROFILE.contact.email}) — or find me on GitHub: ${PROFILE.contact.github}`,
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
    replies: [`Good question — ${PROFILE.funFact}`],
  },
  {
    id: "isbot",
    keywords: ["are you a bot", "are you real", "are you ai", "human or bot", "chatbot"],
    replies: [
      `Ha, good eye — this chat is an automated version of me that answers common questions. For anything real-time, drop me an email at ${PROFILE.contact.email}!`,
    ],
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "thx", "appreciate"],
    replies: ["Anytime! 🙂", "Of course — happy to help.", "No problem at all!"],
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
  "I'm not sure about that one — but ask me about projects, skills, or how to get in touch!",
  "Hmm, I don't have an answer for that. Try asking about experience, education, or contact info.",
  "That's outside what I know how to answer — but I'm happy to talk projects, skills, or background!",
];

const QUICK_REPLIES = ["Tell me about you", "What are your skills?", "Show me projects", "How can I contact you?"];

/* ============================================================
   3. MATCHING + REPLY LOGIC
   ============================================================ */
function pickReply(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function nameFromMessage(text) {
  const match = text.match(/(?:i'?m|my name is|call me)\s+([a-zA-Z]+)/i);
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
      .map((p) => `• ${p.name} — ${p.blurb} (${p.link})`)
      .join("\n");
    return `Here are a couple of things I've built:\n${list}\n\nWant details on any of these?`;
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
      text: `Hey, I'm ${PROFILE.name} 👋 Ask me anything about my work, skills, or projects!`,
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
    // Gemini failed for any reason — quietly use the rule-based backup
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