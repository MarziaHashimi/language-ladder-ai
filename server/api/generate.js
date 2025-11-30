// //./api/generate.js
// import OpenAI from "openai";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { term } = req.body;
//     if (!term) return res.status(400).json({ error: "Word is required." });

//     const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//     const prompt = `
// You are a helpful English learning assistant.
// For the English word "${term}", return data in the following JSON format:
// {
//   "meaning": "...",
//   "translations": { "Dari": "...", "Pashto": "..." },
//   "examples": ["...", "..."],
//   "synonyms": ["...", "..."]
// }
// `;

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//     });

//     const text = response.choices[0].message.content.trim();
//     res.status(200).json({ text });
//   } catch (error) {
//     console.error("❌ Error generating AI response:", error);
//     res.status(500).json({
//       error: "Failed to generate AI response",
//       details: error.message,
//     });
//   }
// }


import OpenAI from "openai";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { term } = req.body;
    if (!term) return res.status(400).json({ error: "Word is required." });

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
You are a helpful English learning assistant.
For the English word "${term}", return data in this JSON format:
{
  "meaning": "...",
  "translations": { "Dari": "...", "Pashto": "..." },
  "examples": ["...", "..."],
  "synonyms": ["...", "..."]
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = response.choices[0].message.content.trim();
    res.status(200).json({ text });

  } catch (error) {
    console.error("❌ Backend Error:", error);
    res.status(500).json({
      error: "Failed to generate AI response",
      details: error.message,
    });
  }
}
