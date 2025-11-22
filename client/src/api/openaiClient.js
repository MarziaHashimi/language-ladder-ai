// //src/api/openaiClient.js
export async function generateAIResponse(data) {
  try {
    const response = await fetch("language-ladder-ai-vm93.vercel.app/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
// const response = await fetch("http://localhost:5000/api/generate", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(data),
// });

    const result = await response.json();
    return result.text || "No response from AI.";
  } catch (err) {
    console.error("❌ AI fetch error:", err);
    return "Error contacting AI server.";
  }
}

// src/api/openaiClient.js
// const BASE_URL =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:5000" // ✅ Local backend when testing
//     : "https://language-ladder-ai-vm93.vercel.app"; // ✅ Deployed backend when live

// export async function generateAIResponse(data) {
//   try {
//   const response = await fetch(`${BASE_URL}/api/generate`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();
//     return result.text || "No response from AI.";
//   } catch (err) {
//     console.error("❌ AI fetch error:", err);
//     return "Error contacting AI server.";
//   }
// }

