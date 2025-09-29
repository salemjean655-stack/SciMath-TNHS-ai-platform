async function askAI(question) {
  try {
    const res = await fetch("/.netlify/functions/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data.answer;
  } catch (err) {
    console.error("Frontend Error:", err);
    return "Sorry, AI did not respond.";
  }
}

// Example usage
document.getElementById("askBtn").addEventListener("click", async () => {
  const question = document.getElementById("questionInput").value;
  const answer = await askAI(question);
  document.getElementById("answer").innerText = answer;
});
