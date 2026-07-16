// import { quest } from "../api/llm"

const generateBtn = document.getElementById('generate-btn')

// console.log(generateBtn)
// console.log(quest)

const response = await fetch("/api/llm");

const quest = await response.json();

console.log(quest);