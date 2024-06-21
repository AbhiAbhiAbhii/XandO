export default function Log({ gameTurns, winner }) {
  return (
    <ol id="log">
        {
            gameTurns && gameTurns.map(turn => (
                <li style={{color: 'white'}} key={`${turn.square.row}${turn.square.col}`}>
                    {turn.name} selected row{turn.square.row} and column{turn.square.col}
                </li>
            ))
        }
    </ol>
  )
}
