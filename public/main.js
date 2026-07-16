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

generateBtn.addEventListener('click', () => {
    showQuest()
})

async function showQuest () {
    const response = await fetch("/api/llm");
    const quest = await response.json();

    console.log(quest);

    qTask.textContent = quest.task
    // let categories = ""
    // quest.category.forEach(cat => {
    //     categories += `${cat} | `
    // });
    // qCategory.textContent = categories
    qCategory.textContent = quest.category
    qDifficulty.textContent = quest.difficulty
    qTime.textContent = quest.estimatedMinutes + " mins"
    qXp.textContent = quest.xp
}