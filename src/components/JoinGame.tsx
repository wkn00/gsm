import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JoinGame: React.FC = () => {
    const navigate = useNavigate();
    const [gameId, setGameId] = useState('');
    const [playerName, setPlayerName] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;

    const joinGame = async () => {
        await axios.post(`${apiUrl}/join`, { gameId, playerName });
        navigate(`/waiting/${gameId}/${playerName}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-700 to-green-700 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-8">Join Game</h1>
            <div className="flex flex-col items-center space-y-4">
                <input 
                    className="p-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    placeholder="Game ID"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)} 
                />
                <input 
                    className="p-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    placeholder="Your Name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)} 
                />
                <button 
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                    onClick={joinGame}
                >
                    Join Game
                </button>
            </div>
        </div>
    );
};

export default JoinGame;
