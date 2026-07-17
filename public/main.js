// import { quest } from "../api/llm"

const generateBtn = document.getElementById('generate-btn')

const qTask = document.getElementById('qtask')
const qCategory = document.getElementById('qcategory')
const qDifficulty = document.getElementById('qdifficulty')
const qTime = document.getElementById('qtime')
const qXp = document.getElementById('qxp')

// console.log(generateBtn)
// console.log(quest)

// const response = await fetch("/api/llm");
// const quest = await response.json();

// console.log(quest);

let isQuestGenerated = false
let xp = localStorage.getItem('xp') || 0
let level = localStorage.getItem('level') || 1
let currentQuestXp = 0

generateBtn.addEventListener('click', () => {
    showQuest()
    isQuestGenerated = true
})

async function showQuest () {
    const response = await fetch("/api/llm");
    const quest = await response.json();

    console.log(quest);

    // let categories = ""
    // quest.category.forEach(cat => {
    //     categories += `${cat} | `
    // });
    // qCategory.textContent = categories

    qTask.textContent = quest.task
    qCategory.textContent = quest.category
    qDifficulty.textContent = quest.difficulty
    qTime.textContent = quest.estimatedMinutes + " mins"

    currentQuestXp = quest.xp
    qXp.textContent = currentQuestXp
}

