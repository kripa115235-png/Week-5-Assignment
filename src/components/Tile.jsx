// Tile displays a single letter and its evaluation color.
function Tile({ letter, status }) {
  return (
    // Apply a status class to display the appropriate tile color.
    <div className={`tile ${status || ""}`}>
      {letter}
    </div>
  )
}

// Export Tile so it can be reused in other components.
export default Tile
