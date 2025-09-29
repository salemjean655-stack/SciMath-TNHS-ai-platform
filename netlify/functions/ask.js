import OpenAI from "openai";

export async function handler(event, context) {
  try {
    // Parse the request body
    const { question } = JSON.parse(event.body);

    if (!question) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No question provided." }),
      };
    }

    // Initialize OpenAI client with your API key from environment variables
    const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

    // Call OpenAI API (you can adjust model and prompt)
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: question }],
    });

    // Return the AI answer
    return {
      statusCode: 200,
      body: JSON.stringify({ answer: response.choices[0].message.content }),
    };
  } catch (error) {
    console.error("AI Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
