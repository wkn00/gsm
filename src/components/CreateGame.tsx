import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateGame: React.FC = () => {
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;

    const createGame = async () => {
        const response = await axios.post(`${apiUrl}/start`, { playerName });
        navigate(`/waiting/${response.data.gameId}/${response.data.playerName}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-700 to-blue-700 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-8">Create a New Game</h1>
            <input 
                className="p-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                placeholder="Your Name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />
            <button
                className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                onClick={createGame}
            >
                Create Game
            </button>
        </div>
    );
};

export default CreateGame;
