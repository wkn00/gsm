import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const WaitingRoom: React.FC = () => {
    const { gameId, playerName } = useParams<{ gameId: string, playerName: string }>();
    const navigate = useNavigate();
    const [players, setPlayers] = useState<{ [key: string]: string }>({});
    const [copied, setCopied] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const interval = setInterval(async () => {
            const response = await axios.get(`${apiUrl}/game/${gameId}`);
            setPlayers(response.data.players);
            if (Object.keys(response.data.players).length === 2) {
                clearInterval(interval);
                navigate(`/gsm/start/${gameId}/${playerName}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [gameId, navigate, apiUrl, playerName]);

    const copyGameId = () => {
        navigator.clipboard.writeText(gameId!); // Use non-null assertion operator
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-800 to-blue-800 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-8">Waiting for another player to join...</h1>
            <div className="flex items-center mb-4">
                <p className="text-xl mr-4">Game Code:</p>
                <button 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 text-2xl font-semibold font-mono"
                    onClick={copyGameId}
                >
                    {copied ? "Copied to clipboard!" : gameId}
                </button>
            </div>
            <p className="text-xl">Players: <span className="font-semibold">{Object.keys(players).join(', ')}</span></p>
        </div>
    );
};

export default WaitingRoom;
