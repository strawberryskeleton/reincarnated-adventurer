import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI(
    {
        apiKey: process.env.GEMINI_API_KEY
    }
)

// console.log(client)


// console.log(quest)

export default async function handler(req, res) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: "Generate one daily quest.",
            config: {
                temperature: 1.2,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        task: { type: Type.STRING },
                        difficulty: { type: Type.INTEGER },
                        category: { 
                            type: Type.ARRAY, 
                            items: { type: Type.STRING } 
                        },
                        estimatedMinutes: { type: Type.INTEGER },
                        xp: { type: Type.INTEGER }
                    },
                    required: ["task", "difficulty", "category", "estimatedMinutes", "xp"]
                },
                systemInstruction: `You are a generator of daily quests.

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
                "xp": 25-150
                }

                Rules:
                - Safe
                - Family friendly
                - Creative
                - Complete in one day
                - Do not repeat common quests too often`,
            },
        })

        const content = response.text
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