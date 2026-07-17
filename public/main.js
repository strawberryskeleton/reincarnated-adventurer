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

let isQuestGenerated = false
let xp = parseInt(localStorage.getItem('xp')) || 0
let level = localStorage.getItem('level') || "Novice"
let currentQuestXp = 0

userXpDisplay.textContent = String(xp).padStart(3, '0')
userLevelDisplay.textContent = level


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

    updateLevel()
}

function updateLevel () {

    if (xp >= 0 && xp <= 100) {
        level = "Novice"
    } else if (xp > 100 && xp <= 250) {
        level = "Aprentice"
    } else if (xp > 250 && xp <= 400) {
        level = "Experienced"
    } else if (xp > 400 && xp <= 600) {
        level = "Elite"
    } else if (xp > 600 && xp <= 850) {
        level = "Master"
    } else if (xp > 850 && xp <= 1000) {
        level = "Mythic"
    }
    
    localStorage.setItem('level', level)
    userLevelDisplay.textContent = level
}