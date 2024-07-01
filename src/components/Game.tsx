import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Game: React.FC = () => {
    const { gameId, playerName } = useParams<{ gameId: string, playerName: string }>();
    const [guess, setGuess] = useState('');
    const [turns, setTurns] = useState<any[]>([]);
    const [currentTurn, setCurrentTurn] = useState('');

    const fetchGameState = async () => {
        const response = await axios.get(`http://localhost:5000/game/${gameId}`);
        setTurns(response.data.turns);
        setCurrentTurn(response.data.currentTurn);
    };

    useEffect(() => {
        fetchGameState(); // Initial fetch
        const interval = setInterval(fetchGameState, 1000); // Poll every second
        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [gameId]);

    const makeGuess = async () => {
        if (currentTurn !== playerName) {
            alert("It's not your turn!");
            return;
        }
        await axios.post('http://localhost:5000/guess', { gameId, playerName, guess });
        setGuess('');
        fetchGameState();
    };

    return (
        <div>
            <h1>Game {gameId}</h1>
            <h2>{currentTurn === playerName ? "Your turn!" : "Opponent's turn"}</h2>
            <input placeholder="Your Guess" value={guess} onChange={(e) => setGuess(e.target.value)} disabled={currentTurn !== playerName} />
            <button onClick={makeGuess} disabled={currentTurn !== playerName}>Guess</button>
            <ul>
                {turns.map((turn, index) => (
                    <li key={index}>{turn.playerName}: {turn.guess} - {turn.result}</li>
                ))}
            </ul>
        </div>
    );
};

export default Game;
