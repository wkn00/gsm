import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StartGame: React.FC = () => {
    const { gameId, playerName } = useParams<{ gameId: string, playerName: string }>();
    const navigate = useNavigate();
    const [number, setNumber] = useState('');
    const [error, setError] = useState('');
    const [waiting, setWaiting] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    const validateAndSetNumber = (input: string) => {
        const filteredInput = input.replace(/[^1-9]/g, '');
        if (new Set(filteredInput).size !== filteredInput.length) {
            setError('No duplicate digits allowed.');
            return;
        } else {
            setError('');
        }
        if (filteredInput.length <= 3) {
            setNumber(filteredInput);
        }
    };

    const startGame = async () => {
        if (number.length !== 3) {
            setError('Please enter exactly 3 distinct digits.');
            return;
        }
        await axios.post(`${apiUrl}/start-game`, { gameId, playerName, number });
        setWaiting(true);
    };

    useEffect(() => {
        if (waiting) {
            const interval = setInterval(async () => {
                const response = await axios.get(`${apiUrl}/ready/${gameId}`);
                if (response.data.allPlayersReady) {
                    clearInterval(interval);
                    navigate(`/game/${gameId}/${playerName}`);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [waiting, gameId, navigate, playerName, apiUrl]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-700 to-green-700 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-8">Enter your 3-digit number</h1>
            <div className="flex flex-col items-center space-y-4 w-full max-w-md">
                <input
                    className="text-center p-3 w-24 text-lg text-gray-900 bg-white bg-opacity-70 rounded-lg border-2 border-transparent focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out shadow-md"
                    placeholder="اويلي"
                    value={number}
                    onChange={(e) => validateAndSetNumber(e.target.value)}
                    maxLength={3}
                    disabled={waiting}
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
                    disabled={number.length !== 3 || error !== '' || waiting}
                >
                    {waiting ? 'Waiting for other player...' : 'Start Game'}
                </button>
            </div>
        </div>
    );
};

export default StartGame;
