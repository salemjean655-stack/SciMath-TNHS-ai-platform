import OpenAI from "openai";

export async function handler(event, context) {
  try {
    const { question } = JSON.parse(event.body || "{}");

    if (!question) {
      return {
        statusCode: 400,
        body: JSON.stringify({ answer: "Please provide a question." }),
      };
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: question }],
    });

    const answer = response.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ answer }),
    };
  } catch (err) {
    console.error("Error in AI function:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ answer: "⚠️ AI failed to respond." }),
    };
  }
}
