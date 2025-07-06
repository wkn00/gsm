import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JoinGame: React.FC = () => {
    const navigate = useNavigate();
    const [gameId, setGameId] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [isGameIdValid, setIsGameIdValid] = useState(false);
    const [isPlayerNameValid, setIsPlayerNameValid] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    const joinGame = async () => {
        await axios.post(`${apiUrl}/join`, { gameId, playerName });
        navigate(`/gsm/waiting/${gameId}/${playerName}`);
    };

    const handleGameIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9]{0,5}$/.test(value)) {
            setGameId(value);
            setIsGameIdValid(value.length === 5);
        }
    };

    const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPlayerName(value);
        setIsPlayerNameValid(value.trim().length > 0);
    };

    const isFormValid = isGameIdValid && isPlayerNameValid;

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-700 to-green-700 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-8 animate-pulse">Join Game</h1>
            <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                    <input
                        className={`p-3 text-center text-lg rounded-lg bg-white bg-opacity-20 text-white focus:outline-none focus:ring-4 transition duration-300 ease-in-out ${isGameIdValid ? 'focus:ring-green-500' : 'focus:ring-red-500'}`}
                        placeholder="Game ID"
                        value={gameId}
                        onChange={handleGameIdChange}
                        maxLength={5}
                    />
                </div>
                <input
                    className="p-3 text-center text-lg rounded-lg bg-white bg-opacity-20 text-white focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300 ease-in-out"
                    placeholder="Your Name"
                    value={playerName}
                    onChange={handlePlayerNameChange}
                />
                <button
                    className={`px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 ${
                        isFormValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 cursor-not-allowed'
                    }`}
                    onClick={joinGame}
                    disabled={!isFormValid}
                >
                    Join Game
                </button>
            </div>
        </div>
    );
};

export default JoinGame;
