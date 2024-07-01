import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-800 to-indigo-800 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-8">Welcome to Guess My Number</h1>
            <div className="space-x-4">
                <button 
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                    onClick={() => navigate('/create')}
                >
                    Create Game
                </button>
                <button 
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                    onClick={() => navigate('/join')}
                >
                    Join Game
                </button>
            </div>
        </div>
    );
};

export default Home;
