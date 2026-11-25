// Evaluate each letter of the guess against the target word.
export function evaluateGuess(guess, solution) {
  const result = Array(5).fill("absent")
  const remainingLetters = solution.split("")

  // First, mark letters that are in the correct position.
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      result[i] = "correct"
      remainingLetters[i] = null
    }
  }

  // Then, mark letters that exist in the word but are in the wrong position.
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue

    const letterIndex = remainingLetters.indexOf(guess[i])

    if (letterIndex !== -1) {
      result[i] = "present"
      remainingLetters[letterIndex] = null
    }
  }

  // Return the final status of all five letters.
  return result
}

// Calculate the keyboard letter statuses based on past guesses.
export function getKeyboardStatuses(guesses, solution) {
  const statuses = {}

  guesses.forEach((guess) => {
    const result = evaluateGuess(guess, solution)

    for (let i = 0; i < 5; i++) {
      const letter = guess[i]
      const status = result[i]
      const current = statuses[letter]

      // Rank: correct > present > absent
      if (current === "correct") continue
      if (current === "present" && status === "absent") continue

      statuses[letter] = status
    }
  })

  return statuses
}