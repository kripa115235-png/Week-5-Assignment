// Define the rows of letters for the virtual keyboard.
const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
]

// Keyboard displays clickable keys for user input.
function Keyboard({ onKeyPress, keyStatuses }) {
  return (
    <div className="keyboard">
      {/* Render each row of the virtual keyboard. */}
      {keyboardRows.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {/* Render each individual key in the current row. */}
          {row.map((key) => (
            <button
              key={key}
              type="button"
              // Apply the evaluation color to letter keys,
              // and a special class to ENTER / BACKSPACE.
              className={`key ${
                key === "ENTER" || key === "BACKSPACE"
                  ? key.toLowerCase()
                  : (keyStatuses[key] || "")
              }`}
              // Send the clicked key to the parent component.
              onClick={() => onKeyPress(key)}
            >
              {/* Display a readable label for special keys. */}
              {key === "BACKSPACE" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

// Export Keyboard so it can be used in the main game component.
export default Keyboard