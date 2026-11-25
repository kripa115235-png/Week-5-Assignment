// App.jsx
// This is the main component that connects everything together.
// It manages all game state, handles both physical and virtual keyboard input,
// checks win/lose conditions, and shows the game over modal.

import { useState, useEffect, useCallback } from "react"
import GameBoard from "./components/GameBoard"
import Keyboard from "./components/Keyboard"
import words from "./words"
import { evaluateGuess, getKeyboardStatuses } from "./gameLogic"
import "./App.css"

function App() {
  // Pick a random solution word once when the game starts.
  const [solutionWord] = useState(
    () => words[Math.floor(Math.random() * words.length)]
  )

  // The string the user is currently typing (max 5 letters).
  const [currentGuess, setCurrentGuess] = useState("")

  // Array of completed guess strings.
  const [pastGuesses, setPastGuesses] = useState([])

  // Game status: "IN_PROGRESS", "WON", or "LOST".
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS")

  // Handle a key press (from physical keyboard or virtual keyboard).
  const handleKeyPress = useCallback(
    (key) => {
      // Ignore all input if the game is already over.
      if (gameStatus !== "IN_PROGRESS") return

      if (key === "ENTER") {
        // Only submit if the guess has exactly 5 letters.
        if (currentGuess.length !== 5) return

        // Check for a win.
        if (currentGuess === solutionWord) {
          setPastGuesses((prev) => [...prev, currentGuess])
          setCurrentGuess("")
          setGameStatus("WON")
          return
        }

        // Add the guess to the list of past guesses.
        const newGuesses = [...pastGuesses, currentGuess]
        setPastGuesses(newGuesses)
        setCurrentGuess("")

        // Check for a loss (all 6 rows used).
        if (newGuesses.length === 6) {
          setGameStatus("LOST")
        }
      } else if (key === "BACKSPACE") {
        // Remove the last letter safely.
        setCurrentGuess((prev) => prev.slice(0, -1))
      } else if (/^[A-Z]$/.test(key)) {
        // Only accept single alphabetical letters, up to 5 per row.
        setCurrentGuess((prev) => (prev.length < 5 ? prev + key : prev))
      }
    },
    [currentGuess, pastGuesses, solutionWord, gameStatus]
  )

  // Listen for physical keyboard events.
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase()

      if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
        // Prevent default browser behavior for game keys.
        event.preventDefault()
        handleKeyPress(key)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    // Clean up the listener when the component unmounts.
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyPress])

  // Calculate the keyboard letter statuses based on past guesses.
  const keyStatuses = getKeyboardStatuses(pastGuesses, solutionWord)

  return (
    <div className="app">
      <h1>Wordle Clone</h1>

      {/* The 6x5 game board. */}
      <GameBoard
        guesses={pastGuesses}
        currentGuess={currentGuess}
        solution={solutionWord}
      />

      {/* The on-screen virtual keyboard. */}
      <Keyboard onKeyPress={handleKeyPress} keyStatuses={keyStatuses} />

      {/* Game over modal: shown when the player wins or loses. */}
      {gameStatus !== "IN_PROGRESS" && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{gameStatus === "WON" ? "You Won! 🎉" : "Game Over 😢"}</h2>
            <p>
              The word was: <strong>{solutionWord}</strong>
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App