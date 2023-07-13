"use strict";


// rounds
const roundsInput = document.querySelector(".round-input")
const roundsOutput = document.querySelector(".rounds-output")

// Round Counter
const roundCounter = document.querySelector(".round-counter")
let roundCurrentValue = 0
let roundMaxValue

// Score
const score = document.querySelector(".score")
let scoreUserValue = 0
let scoreComputerValue = 0

// Text Output
const textOutput = document.querySelector(".output")

//  Buttons
const radioBtns = document.querySelectorAll('input[type="radio"]')
const rpsBtns = document.querySelectorAll(".buttons button")

function rpsInit() {
  roundsInput.classList.add("hidden")
  roundsOutput.classList.remove("hidden")
  radioBtns.forEach(btn => {
    if (btn.checked) {
      roundMaxValue = Number(btn.value)
    }
  })
  roundCounter.textContent = `${roundCurrentValue} / ${roundMaxValue}`

  rpsBtns.forEach(btn => btn.removeEventListener("click", rpsInit))
}

function rpsReset() {
  roundsInput.classList.remove("hidden")
  roundsOutput.classList.add("hidden")

  roundCurrentValue = 0

  scoreUserValue = 0
  scoreComputerValue = 0
  score.textContent = `${scoreUserValue} : ${scoreComputerValue}`

  textOutput.textContent = "Let's Play"

  rpsBtns.forEach(btn => btn.addEventListener("click", rpsInit))
}

function rps(event) {
  if (roundCurrentValue == roundMaxValue) {
    return
  }

  roundCurrentValue++
  roundCounter.textContent = `${roundCurrentValue} / ${roundMaxValue}`

  const choices = ["Rock", "par Bier", "Sister"]
  const choiceAmounts = rpsBtns.length

  const computerChoice = Math.floor(Math.random() * choiceAmounts)
  const userChoice = Number(event.target.value)

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

  score.textContent = `${scoreUserValue} : ${scoreComputerValue}`

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

// Event Listeners
rpsBtns.forEach(btn => btn.addEventListener("click", rpsInit))
document.querySelector(".reset").addEventListener("click", rpsReset)
rpsBtns.forEach(btn => btn.addEventListener("click", rps))