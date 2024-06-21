
export default function GameBoard({ handleSelectSquare, gameBoard }) {

  return (
    <ol id="game-board">
        {
            gameBoard.map((row, rowIndex) => (
                <ol key={rowIndex}>
                    {row.map((col, colIndex) => (
                        <li key={colIndex}>
                            <button 
                                disabled={col !== null}
                                onClick={() => handleSelectSquare(rowIndex, colIndex)}
                            >
                                {col}
                            </button>
                        </li>
                    ))}
                </ol>
            ))
        }
    </ol>
  )
}
