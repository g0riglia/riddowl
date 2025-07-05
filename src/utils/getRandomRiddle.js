import Anthropic from "@anthropic-ai/sdk";

const API_KEY = process.env.REACT_APP_API_KEY;

const SYSTEM_PROMPT = `You are a Riddle Generator. Generate a random riddle with exactly 4 clues and an answer. 
The riddle should be creative and diverse each time. 
Return ONLY a JSON object with this exact structure:
{
  "clues": [
    "First clue here",
    "Second clue here", 
    "Third clue here",
    "Fourth clue here"
  ],
  "answer": "The answer here"
}
Do not include any other text, just the JSON object.`;

const anthropic = new Anthropic({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});

async function getRandomRiddle() {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content:
            "Generate a new random riddle with 4 clues and an answer. Make it creative and different from previous ones.",
        },
      ],
    });
    console.log(response.json);

    const content = response.content[0].text;

    try {
      const riddleData = JSON.parse(content);

      if (
        !riddleData.clues ||
        !Array.isArray(riddleData.clues) ||
        riddleData.clues.length !== 4
      ) {
        throw new Error(
          "Invalid riddle structure: missing or incorrect clues array"
        );
      }

      if (!riddleData.answer || typeof riddleData.answer !== "string") {
        throw new Error(
          "Invalid riddle structure: missing or incorrect answer"
        );
      }

      return riddleData;
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      console.log("Raw response:", content);

      // Fallback to a default riddle if parsing fails
      return {
        clues: [
          "I am green. I move through the forest.",
          "In winter I take my rest.",
          "I can live in every condition.",
          "I hunt my preys from very far.",
        ],
        answer: "I am a frog!",
      };
    }
  } catch (error) {
    console.error("API error:", error);

    // Return fallback riddle on error
    return {
      clues: [
        "I am green. I move through the forest.",
        "In winter I take my rest.",
        "I can live in every condition.",
        "I hunt my preys from very far.",
      ],
      answer: "I am a frog!",
    };
  }
}

export default getRandomRiddle;
