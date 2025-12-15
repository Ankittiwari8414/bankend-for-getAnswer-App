import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          input: question
        })
      }
    );

    const data = await response.json();
    res.json({ answer: data.output_text });

  } catch (err) {
    res.json({ answer: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
