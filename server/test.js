import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
app.use(cors());

app.use(express.json());
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        { role: "system", content: "You are a successful developer." },
        { role: "user", content: message },
      ],
    });

    res.json(response.choices[0].message.content);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

app.listen(3000, () => console.log("Server listening on port 3000"));
