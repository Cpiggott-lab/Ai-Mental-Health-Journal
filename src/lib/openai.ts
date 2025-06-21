import { OpenAI } from "openai";

const openai = new OpenAI();

export async function analyzeJournalEntry(content: string) {
  const systemPrompt = `
You are taking a journal entry from a user and analyzing it for mental health insights.
Your task is to provide a concise summary of the user's emotional state and any potential areas of concern based on the content of the journal entry.
The journal entry is as follows:

${content}

Please provide a summary of the user's emotional state and any potential areas of concern based on the content of the journal entry.
After providing the brief summary, give some positive affirmations to the user, encouraging them to continue their journey of self-reflection and mental health awareness.
After affirmations return some things the user can do to improve their day or mood (like walking, exercising, meditating, etc.).

Return the summary and affirmations in a JSON format with the following structure:
{
  "summary": "Your summary here",
  "affirmations": [
    "Affirmation 1",
    "Affirmation 2",
    "Affirmation 3"
  ],
  "suggestions": [
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3"
  ]
}
  `.trim();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // You can switch this to "gpt-3.5-turbo" or "o4-mini" if needed
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
    };
  }
}
