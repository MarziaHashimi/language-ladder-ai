import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  try {
    const { term } = req.body;
    if (!term) return res.status(400).json({ error: "Word is required." });

    console.log("📩 Received word:", term);

    const prompt = `
You are a helpful English learning assistant.
For the English word "${term}", return data in the following clear JSON structure:
{
  "meaning": "Simple and clear English explanation of the word",
  "translations": {
    "Dari": "...",
    "Pashto": "..."
  },
  "examples": [
    "Example sentence 1.",
    "Example sentence 2."
  ],
  "synonyms": ["synonym1", "synonym2", "synonym3"]
}
Make sure it is valid JSON.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = response.choices[0].message.content.trim();
    console.log("✅ AI response generated.");

    res.json({ text });
  } catch (error) {
    console.error("❌ Error generating AI response:", error);
    res.status(500).json({
      error: "Failed to generate AI response",
      details: error.message,
    });
  }
});

app.listen(port, () => console.log(`✅ Server running on port ${port}`));
