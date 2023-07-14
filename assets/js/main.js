"use strict";

// rounds
const roundsInput = document.querySelector(".rounds-input")
const roundsOutput = document.querySelector(".rounds-output")

function createInputRadios(amount, steps) {
  for (let i = 0; i < amount; i++) {
    const inputRadioTemplate = 
    `<div>
      <input
        type="radio"
        name="roundsCount"
        id="round${i*steps+5}"
        value="${i*steps+5}"
      />
      <label for="round${i*steps+5}">${i*steps+5}</label>
    </div>`
    roundsInput.insertAdjacentHTML("beforeend", inputRadioTemplate)
  }
  document.querySelector("[name='roundsCount'").checked = true
}

createInputRadios(4,5)

console.log( document.querySelector("[name='roundsCount'").setAttribute("checked", ""))

// Round Counter
const roundCounter = document.querySelector(".rounds-counter")
let roundCurrentValue = 0
let roundMaxValue = 0

// Score
const score = document.querySelector(".score")
let scoreUserValue = 0
let scoreComputerValue = 0

// Text Output
const textOutput = document.querySelector(".output")

//  Buttons
const rpsBtns = document.querySelectorAll(".buttons button")

const choices = ["Rock", "par Bier", "Sister"]
const choiceAmounts = rpsBtns.length


function toggleRoundsDisplay() {
  roundsInput.classList.toggle("hidden")
  roundsOutput.classList.toggle("hidden")
}

function setRoundDisplay() {
  roundCounter.textContent = `${roundCurrentValue} / ${roundMaxValue}`
}

function setScoreDisplay() {
  score.textContent = `${scoreUserValue} : ${scoreComputerValue}`
}

function rps(event) {
  if (roundCurrentValue == roundMaxValue && roundMaxValue != 0) {
    return
  }
  
  if (roundMaxValue == 0) {
    toggleRoundsDisplay()
    roundMaxValue = Number(document.querySelectorAll('input[type="radio"]:checked')[0].value)
  }

  roundCurrentValue++
  setRoundDisplay()

  const computerChoice = Math.floor(Math.random() * choiceAmounts)
  const userChoice = Number(event.target.closest("button").value)

  const winner = (userChoice - computerChoice + choiceAmounts) % choiceAmounts

  if (winner == 0) {
    textOutput.textContent = `It's a draw. You both chose ${choices[userChoice]}`
  } else if (winner == 1) {
  textOutput.textContent = `${choices[userChoice]} beats ${choices[computerChoice]}. You win!`
  scoreUserValue++
  } else if (winner == 2) {
  textOutput.textContent = `${choices[computerChoice]} beats ${choices[userChoice]}. You loose!`
  scoreComputerValue++
  }

  setScoreDisplay()

  if (roundCurrentValue == roundMaxValue || scoreUserValue > roundMaxValue / 2 || scoreComputerValue > roundMaxValue / 2) {
    if (scoreUserValue == scoreComputerValue) {
      textOutput.textContent = "Draw"
    } else if (scoreUserValue > scoreComputerValue) {
      textOutput.textContent = "You Won"
    } else if (scoreUserValue < scoreComputerValue) {
      textOutput.textContent = "You Lost"
    }
  }
}

function rpsReset() {
  if (roundMaxValue == 0) {
    return
  }
  toggleRoundsDisplay()

  roundCurrentValue = 0
  scoreUserValue = 0
  scoreComputerValue = 0
  roundMaxValue = 0
  setScoreDisplay()
  setRoundDisplay()

  textOutput.textContent = "Let's Play"
}

// Event Listeners
document.querySelector(".reset").addEventListener("click", rpsReset)
rpsBtns.forEach(btn => btn.addEventListener("click", rps))

// get value from label instead of input value
// assemble input and label with javascript from template with steps and count aka 4 buttons in steps of 5