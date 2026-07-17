import OpenAI from "openai";
// import dotenv from "dotenv"
// import { json } from "node:stream/consumers";
// dotenv.config()

// console.log(process.env.GROQ_API_KEY);

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

// console.log(client)


// console.log(quest)

export default async function handler(req, res) {
    try {
        const completion = await client.chat.completions.create({
            model: "qwen/qwen3-32b",
            temperature: 1.2,
            reasoning_effort: "none",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content: `You are a generator of daily quests.

            Return ONLY a raw JSON object.

            Do NOT:
            - wrap it in \`\`\`json
            - use markdown
            - include explanations
            - include comments
            - include any text before or after the JSON

            {
            "task": "",
            "difficulty": 1-5,
            "category": [],
            "estimatedMinutes": 5-60,
            "xp": 25-150,
            }

            Rules:
            - Safe
            - Family friendly
            - Creative
            - Complete in one day
            - Do not repeat common quests too often`
                },
                {
                    role: "user",
                    content: "Generate one daily quest."
                }
            ]
        })

        const content = completion.choices[0].message.content
        const quest = JSON.parse(content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim())

        res.status(200).json(quest);
    }
    catch (err) {
        // console.error(err);
        // res.status(500).json({
        // error: "Failed to generate quest"
        // });
         console.error(err);

    res.status(500).json({
        error: err.message
    });
    }
}