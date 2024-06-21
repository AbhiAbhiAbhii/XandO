import { useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import Player from './components/Player'
import { WINNING_COMBINATIONS } from './winning-combination'
import GameOver from './components/GameOver'

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

function deriveActivePlayer(gameTurns) {
  let activePlayer = 'X'
  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    activePlayer = 'O'
  }
  return activePlayer
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])]
  for(const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square
    gameBoard[row][col] = player
  }
  return gameBoard
}

function deriveWinner(gameBoard, player) {
  let winnerKeyValue
  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareCheckSymbol = gameBoard[combination[0].row][combination[0].col]
    const secondSquareCheckSymbol = gameBoard[combination[1].row][combination[1].col]
    const thirdSquareCheckSymbol = gameBoard[combination[2].row][combination[2].col]

    if(firstSquareCheckSymbol && firstSquareCheckSymbol === secondSquareCheckSymbol && firstSquareCheckSymbol === thirdSquareCheckSymbol) {
      winnerKeyValue = player[firstSquareCheckSymbol]
    }
  }
  return winnerKeyValue
}

function App() {

  const [ playerName, setPlayerName ] = useState(PLAYERS)
  const [ gameTurns, setGameTurns ] = useState([])
 
  const isActive = deriveActivePlayer(gameTurns)
  const gameBoard = deriveGameBoard(gameTurns)
  const winnerKeyValue = deriveWinner(gameBoard, playerName)

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns(prevState => {
      const activePlayer = deriveActivePlayer(prevState, playerName)
      const ourPlayer = activePlayer === 'X' ? playerName.X : playerName.O 
      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer, name: ourPlayer },
        ...prevState
      ]
      return updatedTurn
    })
  }

  const handlePlayerName = (symbol, value) => {
    setPlayerName(prevState => {
      return {
        ...prevState,
        [symbol]: value
      }
    })
  }

  const symbol = Object.keys(PLAYERS).map(item => item)
  const players = Object.values(PLAYERS).map(item => item)
  const X = symbol[0]
  const O = symbol[1]
  
  const hasDraw = gameTurns.length === 9 && !winnerKeyValue

  const handleRematch = () => setGameTurns(() => [])
  
  return (
    <main>
      <div id="game-container">
        <ol id='players' className='highlight-player'>
          <Player 
            handlePlayerName={handlePlayerName}
            isActive={isActive === X} 
            name={players[0]} 
            symbol={X} 
          />
          <Player 
            handlePlayerName={handlePlayerName}
            isActive={isActive === O} 
            name={players[1]} 
            symbol={O} 
          />
        </ol>
        {(winnerKeyValue || hasDraw) && <GameOver winnerName={winnerKeyValue} handleRematch={handleRematch} hasDraw={hasDraw}  />}
        <GameBoard gameBoard={gameBoard} handleSelectSquare={handleSelectSquare} />
      </div>
      <Log playerName={playerName} gameTurns={gameTurns} />
    </main>
  )
}

export default App
