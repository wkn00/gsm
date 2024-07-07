import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-700 to-purple-700 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Guess My Number Game</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-md">
                <button 
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 whitespace-nowrap"
                    onClick={() => navigate('/create')}
                >
                    Create Game
                </button>
                <button 
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 whitespace-nowrap"
                    onClick={() => navigate('/join')}
                >
                    Join Game
                </button>
                <button 
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 whitespace-nowrap"
                    onClick={() => navigate('/how-to-play')}
                >
                    How to Play
                </button>
            </div>
        </div>
    );
};

export default Home;
