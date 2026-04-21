require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: "process.env.OPENAI_API_KEY"
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a friendly English conversation partner helping users improve fluency." },
        { role: "user", content: userMessage }
      ]
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});