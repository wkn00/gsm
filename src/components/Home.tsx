import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to Guess My Number</h1>
            <button onClick={() => navigate('/create')}>Create Game</button>
            <button onClick={() => navigate('/join')}>Join Game</button>
        </div>
    );
};

export default Home;
