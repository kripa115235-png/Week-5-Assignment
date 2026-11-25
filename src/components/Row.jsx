import Tile from "./Tile"
import { evaluateGuess } from "../gameLogic"

// Row displays five tiles for a single guess attempt.
function Row({ guess = "", solution, isSubmitted }) {
  // Convert the guess string into an array of five letters.
  const letters = Array.from({ length: 5 }, (_, index) =>
    guess[index] || ""
  )

  // Evaluate the guess only after it has been submitted.
  const statuses =
    isSubmitted && solution
      ? evaluateGuess(guess, solution)
      : Array(5).fill("")

  return (
    <div className="row">
      {/* Render five tiles for the current row. */}
      {letters.map((letter, index) => (
        <Tile
          key={index}
          letter={letter}
          status={statuses[index]}
        />
      ))}
    </div>
  )
}

// Export Row so it can be used inside GameBoard.
export default Row
