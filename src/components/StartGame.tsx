import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StartGame: React.FC = () => {
    const { gameId, playerName } = useParams<{ gameId: string, playerName: string }>();
    const navigate = useNavigate();
    const [number, setNumber] = useState('');
    const [error, setError] = useState('');

    const validateAndSetNumber = (input: string) => {
        // Remove any character that is not 1-9
        const filteredInput = input.replace(/[^1-9]/g, '');

        // Ensure no duplicates and proper length
        if (new Set(filteredInput).size !== filteredInput.length) {
            setError('No duplicate digits allowed.');
            return;
        } else {
            setError('');
        }

        // Update the state only if input has 1-3 digits
        if (filteredInput.length <= 3) {
            setNumber(filteredInput);
        } else {
            setError('Enter exactly 3 digits.');
        }
    };

    const startGame = async () => {
        if (number.length !== 3) {
            setError('Please enter exactly 3 distinct digits.');
            return;
        }
        await axios.post('http://localhost:5000/start-game', { gameId, playerName, number });
        navigate(`/game/${gameId}/${playerName}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-8">Enter your 3-digit number</h1>
            <div className="flex flex-col items-center space-y-4 w-full max-w-md">
                <input
                    className="p-3 w-24 text-lg text-gray-900 bg-white bg-opacity-70 rounded-lg border-2 border-transparent focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out shadow-md"
                    placeholder="123"
                    value={number}
                    onChange={(e) => validateAndSetNumber(e.target.value)}
                    maxLength={3}
                />
                {error && <div className="text-red-500">{error}</div>}
                <div className="text-gray-200 text-sm">
                    <p>Enter exactly 3 distinct digits.</p>
                    <p>Digits should be between 1-9 with no duplicates.</p>
                </div>
                <button
                    className={`px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform ${
                        number.length === 3 && !error ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    onClick={startGame}
                    disabled={number.length !== 3 || error !== ''}
                >
                    Start Game
                </button>
            </div>
        </div>
    );
};

export default StartGame;
