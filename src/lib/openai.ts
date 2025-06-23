// AI prompt for initial summary of journal entry

import { OpenAI } from "openai";

const openai = new OpenAI();

export async function analyzeJournalEntry(content: string) {
  const systemPrompt = `
    You are a compassionate mental health assistant helping someone reflect on their personal journal entry.
    
    Read the journal entry below and return a structured analysis in JSON format. Your tone should be gentle, human, and encouraging — write *to the person*, not *about them*.
    
    Please include the following fields in your response:
    
    1. **"mood"**: A single-word summary of their emotional tone (e.g. "anxious", "grateful", "lonely", "hopeful"). Choose from: ["anxious", "depressed", "angry", "lonely", "neutral", "hopeful", "happy", "grateful", "confused", "overwhelmed"].
    
    2. **"summary"**: A warm reflection of how they seem to be feeling. Speak *to* them (e.g. "It sounds like you've been carrying a lot lately").
    
    3. **"affirmations"**: 2–4 kind, supportive statements directed at the person (e.g. “You’re allowed to feel this way.”).
    
    4. **"suggestions"**: 2–3 gentle suggestions to help them today (e.g. walking, journaling, talking to someone, taking breaks).
    
    5. **"themes"**: A list of up to 3 key themes or topics in the entry (e.g. ["self-worth", "work stress", "family"]). These should be broad emotional or situational tags.
    
    6. **"cognitive_distortions"**: If you notice any negative thought patterns (e.g. catastrophizing, black-and-white thinking), include them here along with a gentle reframe. Leave empty if none.
    
    7. **"follow_ups"**: 1–2 thoughtful, open-ended questions the user could answer to deepen their reflection.
    
    Return the following JSON format:
    
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
      ]
      "themes": ["self-doubt", "work stress"],
      "cognitive_distortions": [
        {
          "pattern": "All-or-nothing thinking",
          "reframe": "It’s okay to make mistakes — progress isn’t always linear."
        }
      ],
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
          content: systemPrompt,
        },
      ],
    });

    const raw = response.choices[0]?.message?.content;

    if (!raw) throw new Error("Empty response from OpenAI");

    const parsed = JSON.parse(raw);
    return parsed;
  } catch (error) {
    console.error("Error analyzing journal entry:", error);
    return {
      summary:
        "We couldn’t analyze your journal entry. Please try again later.",
      affirmations: [],
      suggestions: [],
      followUps: [],
    };
  }
}
