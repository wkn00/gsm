import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateGame: React.FC = () => {
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState('');

    const createGame = async () => {
        const response = await axios.post('http://localhost:5000/start', { playerName });
        navigate(`/waiting/${response.data.gameId}/${response.data.playerName}`);
    };

    return (
        <div>
            <h1>Create a New Game</h1>
            <input placeholder="Your Name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
            <button onClick={createGame}>Create Game</button>
        </div>
    );
};

export default CreateGame;
