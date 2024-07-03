import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-red-500 to-pink-700 flex flex-col items-center justify-center text-white">
            <h1 className="text-6xl font-bold mb-8">404</h1>
            <p className="text-2xl mb-4">Oops! The page you are looking for does not exist.</p>
            <Link to="/" className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
