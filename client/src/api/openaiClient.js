//src/api/openaiClient.js
export async function generateAIResponse(data) {
  try {
    const response = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result.text || "No response from AI.";
  } catch (err) {
    console.error("❌ AI fetch error:", err);
    return "Error contacting AI server.";
  }
}

