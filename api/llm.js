import { OpenAI } from "openai/client.js";
import dotenv from "dotenv"
dotenv.config()

// console.log(process.env.GROQ_API_KEY);

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

// console.log(client)
