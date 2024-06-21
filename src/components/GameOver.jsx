export default function GameOver({handleRematch, hasDraw, winnerName}) {
  return (
    <div id='game-over'>
        <p style={{marginBottom: '12px'}}>
        {
            hasDraw ?
            'Draw!'
            :
            `${winnerName} won!`
        }
        </p>
        <button onClick={handleRematch}>
            Reset
        </button>
    </div>
  )
}
