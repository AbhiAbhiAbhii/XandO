import { useState } from "react"

export default function Player({ name, symbol, isActive, handlePlayerName }) {

    const [ isEditing, setIsEditing ] = useState(false)
    const [ playerName, setPlayerName ] = useState(name)
    const handleEdit = () => {
        setIsEditing(prevState => !prevState)
        handlePlayerName(symbol, playerName)
    }

  return (
    <li className={isActive ? 'active' : null}>
        <span className="player">
            {
                isEditing ?
                <input 
                    name={symbol}
                    onChange={(e) => setPlayerName(e.target.value)}
                    type="text" 
                    value={playerName} 
                />
                :
                <span className="player-name">{playerName}</span>
            }
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEdit}>
            {isEditing ? 'Save' : 'Edit'}
        </button>
    </li>
  )
}
