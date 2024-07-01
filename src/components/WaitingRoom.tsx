import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const WaitingRoom: React.FC = () => {
    const { gameId, playerName } = useParams<{ gameId: string, playerName: string }>();
    const navigate = useNavigate();
    const [players, setPlayers] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const interval = setInterval(async () => {
            const response = await axios.get(`http://localhost:5000/game/${gameId}`);
            setPlayers(response.data.players);
            if (Object.keys(response.data.players).length === 2) {
                clearInterval(interval);
                navigate(`/start/${gameId}/${playerName}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [gameId, navigate]);

    return (
        <div>
            <h1>Waiting for another player to join...</h1>
            <p>Game ID: {gameId}</p>
            <p>Players: {Object.keys(players).join(', ')}</p>
        </div>
    );
};

export default WaitingRoom;
