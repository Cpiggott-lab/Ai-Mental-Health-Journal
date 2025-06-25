import { OpenAI } from "openai";

const openai = new OpenAI();

export async function analyzeJournalEntry(content: string) {
  const analysisPrompt = `
You are a compassionate mental health assistant helping someone reflect on their personal journal entry.

Read the journal entry below and return a structured analysis **as pure JSON only** with the following fields:

{
  "mood": "anxious",
  "summary": "It sounds like you're feeling overwhelmed and unsure, but you're showing strength by opening up.",
  "affirmations": [
    "You’re allowed to feel what you're feeling.",
    "Just taking time to write this is a form of healing.",
    "You are not alone in this."
  ],
  "suggestions": [
    "Try stepping outside for a few minutes and taking slow, deep breaths.",
    "Reach out to someone you trust and talk about how you’re feeling."
  ],
  "followUps": [
    "What’s one small thing that gave you comfort today?",
    "If a friend shared these thoughts with you, what would you say to them?"
  ],
  "themes": ["self-doubt", "work stress"],
  "cognitive_distortions": [
    {
      "pattern": "All-or-nothing thinking",
      "reframe": "It’s okay to make mistakes — progress isn’t always linear."
    }
  ]
}

Here is the journal entry to analyze:

"""${content}"""
`.trim();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a compassionate mental health assistant.",
        },
        {
          role: "user",
          content: analysisPrompt,
        },
      ],
    });

    let raw = response.choices?.[0]?.message?.content?.trim();

    if (!raw) throw new Error("OpenAI returned empty content");

    // Remove markdown fences or junk
    if (raw.startsWith("```json")) {
      raw = raw
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
    }

    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error("Error parsing OpenAI journal entry analysis:", err);

    return {
      mood: "neutral",
      summary:
        "We couldn’t analyze your journal entry this time, but reflecting like this is already a powerful step.",
      affirmations: ["You are doing your best, and that’s enough."],
      suggestions: ["Try taking a short walk and checking in with yourself."],
      followUps: [
        "How do you feel after writing this?",
        "What do you want to remember from today?",
      ],
      themes: [],
      cognitive_distortions: [],
    };
  }
}
