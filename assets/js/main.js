"use strict";

// rounds
const roundsInput = document.querySelector(".rpc-rounds-input")
const roundsOutput = document.querySelector(".rpc-rounds-output")

function createInputRadios(amount, steps) {
  for (let i = 0; i < amount; i++) {
    const inputRadioTemplate = 
      `<div>
        <input
          type="radio"
          name="roundsCount"
          id="round${i*steps+5}"
        />
        <label for="round${i*steps+5}">${i*steps+5}</label>
      </div>`
    roundsInput.insertAdjacentHTML("beforeend", inputRadioTemplate)
  }
  document.querySelector("[name='roundsCount'").checked = true
}
createInputRadios(4,5)

// Round Counter
const roundCounter = document.querySelector(".rpc-rounds-counter")
let roundCurrentValue = 0
let roundMaxValue = 0

// Score
const score = document.querySelector(".rpc-score")
let scoreUserValue = 0
let scoreComputerValue = 0

// Text Output
const textOutput = document.querySelector(".rpc-output")

//  Buttons
const choiceButtons = document.querySelectorAll(".rpc-choice-buttons button")

const choices = ["Rock", "par Bier", "Sister"]
const choiceAmounts = choiceButtons.length

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

function removeChoiceButtonsBgColor() {choiceButtons.forEach(button => {
  button.classList.remove("rpc-win")
  button.classList.remove("rpc-loose")
  button.classList.remove("rpc-draw")
})}

function rps(event) {
  if (roundCurrentValue == roundMaxValue && roundMaxValue != 0) {
    return
  }
  
  if (roundMaxValue == 0) {
    toggleRoundsDisplay()
    roundMaxValue = Number(document.querySelectorAll('input[type="radio"]:checked')[0].nextElementSibling.textContent)
  }

  roundCurrentValue++
  setRoundDisplay()

  removeChoiceButtonsBgColor()

  const userChoiceButton = event.target.closest("button")
  const computerChoice = Math.floor(Math.random() * choiceAmounts)
  const userChoice = Number(userChoiceButton.value)

  const winner = (userChoice - computerChoice + choiceAmounts) % choiceAmounts

  if (winner == 0) {
    textOutput.textContent = `It's a draw. You both chose ${choices[userChoice]}`
    userChoiceButton.classList.add("rpc-draw")
  } else if (winner == 1) {
  textOutput.textContent = `${choices[userChoice]} beats ${choices[computerChoice]}. You win!`
  scoreUserValue++
  userChoiceButton.classList.add("rpc-win")

  } else if (winner == 2) {
  textOutput.textContent = `${choices[computerChoice]} beats ${choices[userChoice]}. You loose!`
  scoreComputerValue++
  userChoiceButton.classList.add("rpc-loose")
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
  removeChoiceButtonsBgColor()

  roundCurrentValue = 0
  scoreUserValue = 0
  scoreComputerValue = 0
  roundMaxValue = 0
  setScoreDisplay()
  setRoundDisplay()

  textOutput.textContent = "Let's Play"
}

// Event Listeners
document.querySelector(".rpc-reset").addEventListener("click", rpsReset)
choiceButtons.forEach(btn => btn.addEventListener("click", rps))