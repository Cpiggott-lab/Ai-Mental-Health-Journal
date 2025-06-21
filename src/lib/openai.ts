import { OpenAI } from "openai";

const openai = new OpenAI();

export async function analyzeJournalEntry(content: string) {
  const systemPrompt = `
    You are a compassionate mental health assistant helping someone reflect on their personal journal entry.
    
    Read the journal entry below and respond with:
    
    1. A warm, human summary of how the person seems to be feeling and any emotional themes you noticed — speak *to them*, not *about them*.
    2. A short list of 2–4 kind, supportive affirmations written directly to the person.
    3. A few gentle suggestions to help improve their mood or day, such as walks, journaling, breathing exercises, etc.
    
    Speak with kindness and warmth, and return the output in the following JSON format:
    
    {
      "summary": "Your warm, reflective summary here, written to the person.",
      "affirmations": [
        "You are doing your best, and that matters.",
        "It’s okay to have hard days — you are still growing.",
        "You deserve moments of peace and kindness."
      ],
      "suggestions": [
        "Take a gentle walk and notice the sounds around you.",
        "Spend 5 minutes doing deep breathing or mindfulness.",
        "Write one thing you're grateful for today."
      ]
    }
    
    Here is the journal entry:
    
    """${content}"""
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
