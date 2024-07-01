import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Game: React.FC = () => {
    const { gameId, playerName } = useParams<{ gameId: string, playerName: string }>();
    const [guess, setGuess] = useState('');
    const [turns, setTurns] = useState<any[]>([]);
    const [currentTurn, setCurrentTurn] = useState('');
    const [winner, setWinner] = useState<string | null>(null);
    const [error, setError] = useState('');

    const fetchGameState = async () => {
        const response = await axios.get(`http://localhost:5000/game/${gameId}`);
        setTurns(response.data.turns);
        setCurrentTurn(response.data.currentTurn);
        setWinner(response.data.winner);
    };

    useEffect(() => {
        fetchGameState(); // Initial fetch
        const interval = setInterval(fetchGameState, 1000); // Poll every second
        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [gameId]);

    const validateAndSetGuess = (input: string) => {
        // Remove any character that is not 1-9
        const filteredInput = input.replace(/[^1-9]/g, '');

        // Ensure no duplicates
        if (new Set(filteredInput).size !== filteredInput.length) {
            setError('No duplicate digits allowed.');
            return;
        } else {
            setError('');
        }

        // Update the state only if input has 1-3 digits
        if (filteredInput.length <= 3) {
            setGuess(filteredInput);
        }
    };

    const makeGuess = async () => {
        if (currentTurn !== playerName) {
            setError("It's not your turn!");
            return;
        }
        if (guess.length !== 3) {
            setError('Please enter exactly 3 distinct digits.');
            return;
        }
        await axios.post('http://localhost:5000/guess', { gameId, playerName, guess });
        setGuess('');
        fetchGameState();
    };

    if (winner) {
        return (
            <div>
                <h1>Game {gameId}</h1>
                <h2>{winner === playerName ? "You win!" : `${winner} wins!`}</h2>
                <ul>
                    {turns.map((turn, index) => (
                        <li key={index}>{turn.playerName}: {turn.guess} - {turn.result}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div>
            <h1>Game {gameId}</h1>
            <h2>{currentTurn === playerName ? "Your turn!" : "Opponent's turn"}</h2>
            <input 
                placeholder="Your Guess (1-9, no duplicates)"
                value={guess}
                onChange={(e) => validateAndSetGuess(e.target.value)}
                disabled={currentTurn !== playerName}
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button onClick={makeGuess} disabled={currentTurn !== playerName || guess.length !== 3 || error !== ''}>Guess</button>
            <ul>
                {turns.map((turn, index) => (
                    <li key={index}>{turn.playerName}: {turn.guess} - {turn.result}</li>
                ))}
            </ul>
        </div>
    );
};

export default Game;
