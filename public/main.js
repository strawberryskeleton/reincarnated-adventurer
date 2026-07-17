// import { quest } from "../api/llm"

const generateBtn = document.getElementById('generate-btn')
const doneBtn = document.getElementById('done-btn')
const userXpDisplay = document.getElementById('user-xp')
const userLevelDisplay = document.getElementById('user-level')

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

let isQuestGenerated = true
let xp = parseInt(localStorage.getItem('xp')) || 0
let level = localStorage.getItem('level') || 1
let currentQuestXp = 20

userXpDisplay.textContent = String(xp).padStart(3, '0')
userLevelDisplay.textContent = String(level).padStart(2, '0')


generateBtn.addEventListener('click', () => {
    showQuest()
    // isQuestGenerated = true
})

async function showQuest () {
    generateBtn.disabled = true

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

    isQuestGenerated = true
}

if (isQuestGenerated) {
    doneBtn.disabled = false
    doneBtn.addEventListener('click', () => {
        completeQuest()
    })
}

function completeQuest () {
    xp += parseInt(currentQuestXp)
    localStorage.setItem('xp', xp)
    userXpDisplay.textContent = xp
    isQuestGenerated = false
    doneBtn.disabled = true
    generateBtn.disabled = false
}