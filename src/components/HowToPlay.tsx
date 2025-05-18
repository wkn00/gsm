import React from 'react';
import { Link } from 'react-router-dom';

const HowToPlay: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 flex flex-col items-center justify-center text-white p-8">
            <h1 className="text-5xl font-bold mb-8 animate-pulse">How to Play</h1>
            <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-lg max-w-4xl w-full space-y-6">
                <div className="text-lg leading-relaxed">
                    <p className="mb-4">
                        Guess My Number is a two-player game where both players choose a 3-digit number at the start. The numbers must not contain zeros and must not have duplicate digits. Players take turns trying to guess each other's number.
                    </p>
                    <p className="mb-4">
                        After each guess, feedback is provided:
                    </p>
                    <ul className="list-disc list-inside mb-4">
                        <li className="text-green-400"><strong>X</strong> - Correct number in the correct position</li>
                        <li className="text-orange-400"><strong>O</strong> - Correct number in the wrong position</li>
                        <li className="text-gray-400"><strong></strong> - No correct numbers</li>
                    </ul>
                    <p className="mb-4">
                        The first player to guess the opponent's number correctly wins the game.
                    </p>
                </div>
                <div className="mt-8">
                    <h2 className="text-3xl font-semibold mb-4">Example</h2>
                    <div className="flex justify-between items-center space-x-8">
                        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                            <p className="text-lg mb-4">If your secret number is <strong>123</strong> and your opponent guesses <strong>135</strong>:</p>
                            <ul className="list-none">
                                <li className="text-green-400"><strong>1</strong> is correct and in the right place: <strong>X</strong></li>
                                <li className="text-orange-400"><strong>3</strong> is correct but in the wrong place: <strong>O</strong></li>
                                <li className="text-gray-400"><strong>5</strong> is not in the number.<strong></strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Link to="/" className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 inline-block">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default HowToPlay;
