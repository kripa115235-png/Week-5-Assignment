import Row from "./Row"

// GameBoard displays the six rows of the Wordle game.
function GameBoard({ guesses, currentGuess, solution }) {
  return (
    <div className="game-board">
      {/* Create exactly six rows for the six allowed attempts. */}
      {Array.from({ length: 6 }, (_, index) => (
        <Row
          key={index}
          // Display a completed guess or the current guess being typed.
          guess={
            guesses[index] ||
            (index === guesses.length ? currentGuess : "")
          }
          solution={solution}
          // Check whether the current row has already been submitted.
          isSubmitted={index < guesses.length}
        />
      ))}
    </div>
  )
}

// Export GameBoard so it can be used in App.
export default GameBoard
