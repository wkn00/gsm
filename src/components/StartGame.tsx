import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StartGame: React.FC = () => {
    const { gameId, playerName } = useParams<{ gameId: string, playerName: string }>();
    const navigate = useNavigate();
    const [number, setNumber] = useState('');

    const startGame = async () => {
        await axios.post('http://localhost:5000/start-game', { gameId, playerName, number });
        navigate(`/game/${gameId}/${playerName}`);
    };

    return (
        <div>
            <h1>Enter your 3-digit number</h1>
            <input placeholder="Your Number" value={number} onChange={(e) => setNumber(e.target.value)} />
            <button onClick={startGame}>Start Game</button>
        </div>
    );
};

export default StartGame;
