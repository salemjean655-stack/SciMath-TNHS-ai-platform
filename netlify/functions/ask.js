// netlify/functions/ask.js
exports.handler = async function (event, context) {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const question = body.question || "Hello";

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: data }),
      };
    }

    const answer = data.choices?.[0]?.message?.content;

    return {
      statusCode: 200,
      body: JSON.stringify(
        answer
          ? { answer }
          : { warning: "No answer received", fullResponse: data }
      ),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
