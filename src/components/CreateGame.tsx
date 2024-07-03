import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateGame: React.FC = () => {
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState('');
    const [isPlayerNameValid, setIsPlayerNameValid] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    const createGame = async () => {
        const response = await axios.post(`${apiUrl}/start`, { playerName });
        navigate(`/waiting/${response.data.gameId}/${response.data.playerName}`);
    };

    const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPlayerName(value);
        setIsPlayerNameValid(value.trim().length > 0);
    };


    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-700 to-blue-700 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-8">Create a New Game</h1>
            <div className="flex flex-col items-center space-y-6">
            <input
                className="p-3 text-center text-lg rounded-lg bg-white bg-opacity-20 text-white focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
                placeholder="Your Name"
                value={playerName}
                onChange={handlePlayerNameChange}
            />
            
            <button
                    className={`px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 ${
                        isPlayerNameValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
                    }`}
                    onClick={createGame}
                    disabled={!isPlayerNameValid}
                >
                    Create Game
            </button>
            </div>
        </div>
    );
};

export default CreateGame;
