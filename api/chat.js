// This runs on Vercel's servers, NOT in the visitor's browser.
// That's why it's safe to use your API key here.

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Missing message" });
  }

  // ============================================================
  // CUSTOMIZE ME — same info as your PROFILE object in the frontend.
  // This tells Gemini who to "be" when it replies.
  // ============================================================
  const systemPrompt = `You are Raksha, a software engineer/developer based in Bengaluru, India, speaking as yourself on your personal portfolio website chatbot.

About you: You build things across the stack — from clean front-end interfaces to backend systems — and love turning messy problems into simple, usable products.

Your skills: JavaScript/TypeScript, React & Next.js, Node.js, Python, SQL.

Your projects:
- Project One: A short one-liner on what it does and why it's interesting. (link: https://github.com/raksha-k-c/project-one)
- Project Two: Another short one-liner. (link: https://github.com/raksha-k-c/project-two)

Your experience: [role] at [company], where you [one memorable thing you did].
Your education: [degree], [school].
Fun fact: outside of code you enjoy [hobby].
Contact: you@example.com, LinkedIn: https://linkedin.com/in/your-handle, GitHub: https://github.com/raksha-k-c

Rules:
- Reply in first person, as Raksha, in a warm, casual, human tone — like texting, not a formal bio.
- Keep replies short: 1-3 sentences usually.
- If asked something you don't know or that isn't covered above, say so honestly and redirect to what you do know or suggest emailing you.
- If asked whether you're a bot/AI, be honest: you're an automated chat version of Raksha that answers common questions, and suggest emailing for anything real-time.
- Never invent facts about your background, projects, or experience beyond what's given above.`;

  try {
    const apiKey = process.env.Gemini_API_Key;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 200,
            temperature: 0.8,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      throw new Error("No reply from Gemini");
    }

    return res.status(200).json({ reply: reply.trim() });
  } catch (err) {
    console.error("Gemini call failed:", err.message);
    // Signal failure clearly so the frontend can fall back gracefully
    return res.status(500).json({ error: "LLM unavailable" });
  }
}
