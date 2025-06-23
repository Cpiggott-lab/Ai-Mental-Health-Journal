// Open AI function for analyzing multiple journal entries to give a mental health summary.

import OpenAI from "openai";
const client = new OpenAI();

const tools = [
  {
    name: "analyze_journal_entries",
    input_schema: {
      type: "object",
      properties: {
        entries: {
          type: "array",
          items: {
            type: "string",
            description: "A single journal entry text.",
          },
          description:
            "An array of journal entries to analyze for mental health insights.",
        },
      },
      required: ["entries"],
    },
    description:
      "Analyze multiple journal entries to provide a mental health summary, including emotional themes, affirmations, and suggestions for improvement.",
  },
];

const response = await client.responses.create({
  model: "gpt-4",
  input: [
    {
      role: "user",
      content:
        "Please analyze these journal entries and provide a mental health summary.",
      tools: tools,
    },
  ],
});

console.log(response.output);
