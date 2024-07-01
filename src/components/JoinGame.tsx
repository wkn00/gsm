import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JoinGame: React.FC = () => {
    const navigate = useNavigate();
    const [gameId, setGameId] = useState('');
    const [playerName, setPlayerName] = useState('');

    const joinGame = async () => {
        await axios.post('http://localhost:5000/join', { gameId, playerName });
        navigate(`/waiting/${gameId}/${playerName}`);
    };

    return (
        <div>
            <h1>Join Game</h1>
            <input placeholder="Game ID" value={gameId} onChange={(e) => setGameId(e.target.value)} />
            <input placeholder="Your Name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
            <button onClick={joinGame}>Join Game</button>
        </div>
    );
};

export default JoinGame;
