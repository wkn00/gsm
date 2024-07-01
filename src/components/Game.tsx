import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useSpring, animated } from '@react-spring/web';

const Game: React.FC = () => {
    const { gameId, playerName } = useParams<{ gameId: string, playerName: string }>();
    const [guess, setGuess] = useState('');
    const [turns, setTurns] = useState<any[]>([]);
    const [currentTurn, setCurrentTurn] = useState('');
    const [winner, setWinner] = useState<string | null>(null);
    const [error, setError] = useState('');

    const fetchGameState = useCallback(async () => {
        const response = await axios.get(`http://localhost:5000/game/${gameId}`);
        setTurns(response.data.turns);
        setCurrentTurn(response.data.currentTurn);
        setWinner(response.data.winner);
    }, [gameId]);

    useEffect(() => {
        fetchGameState(); // Initial fetch
        const interval = setInterval(fetchGameState, 1000); // Poll every second
        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [fetchGameState]);

    const validateAndSetGuess = (input: string) => {
        // Remove any character that is not 1-9
        const filteredInput = input.replace(/[^1-9]/g, '');

        // Ensure no duplicates
        if (new Set(filteredInput).size !== filteredInput.length) {
            setError('No duplicate digits allowed.');
            return;
        } else {
            setError('');
        }

        // Update the state only if input has 1-3 digits
        if (filteredInput.length <= 3) {
            setGuess(filteredInput);
        }
    };

    const makeGuess = async () => {
        if (currentTurn !== playerName) {
            setError("It's not your turn!");
            return;
        }
        if (guess.length !== 3) {
            setError('Please enter exactly 3 distinct digits.');
            return;
        }
        await axios.post('http://localhost:5000/guess', { gameId, playerName, guess });
        setGuess('');
        fetchGameState();
    };

    const getXOCount = (result: string) => {
        const xCount = (result.match(/X/g) || []).length;
        const oCount = (result.match(/O/g) || []).length;
        return { xCount, oCount };
    };

    const playerGuesses = (player: string) => {
        return turns.filter(turn => turn.playerName === player).reverse().map((turn, index) => {
            const { xCount, oCount } = getXOCount(turn.result);
            return (
                <tr key={index} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-center">{turn.guess}</td>
                    <td className="px-4 py-2 text-center text-green-500">{xCount}</td>
                    <td className="px-4 py-2 text-center text-orange-500">{oCount}</td>
                </tr>
            );
        });
    };

    const checkForWinner = useCallback(() => {
        const playerTurns = turns.filter(turn => turn.playerName === playerName);
        const opponentTurns = turns.filter(turn => turn.playerName !== playerName);

        const playerWin = playerTurns.some(turn => turn.result === 'XXX');
        const opponentWin = opponentTurns.some(turn => turn.result === 'XXX');

        if (playerWin && opponentWin) {
            if (playerTurns.length === opponentTurns.length) {
                return 'Draw';
            }
            return playerTurns.length < opponentTurns.length ? playerName : opponentTurns[0].playerName;
        } else if (playerWin && playerTurns.length <= opponentTurns.length) {
            return playerName;
        } else if (opponentWin && opponentTurns.length <= playerTurns.length) {
            return opponentTurns[0].playerName;
        }
        return null;
    }, [turns, playerName]);

    useEffect(() => {
        const winner = checkForWinner();
        if (winner) {
            setWinner(winner);
        }
    }, [turns, checkForWinner]);

    const opponentTurn = turns.find(turn => turn.playerName !== playerName);
    const opponentName = opponentTurn ? opponentTurn.playerName : 'Opponent';

    const confettiStyles = useSpring({
        opacity: winner ? 1 : 0,
        transform: winner ? 'translateY(0)' : 'translateY(-100%)',
        config: { duration: 1000 }
    });

    if (winner) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-gray-700 to-indigo-700 flex flex-col items-center justify-center text-white font-sans relative">
                <animated.div style={confettiStyles}>
                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        numberOfPieces={500}
                        recycle={false}
                    />
                </animated.div>
                <h1 className="text-4xl font-bold mb-8">Game {gameId}</h1>
                <h2 className="text-4xl font-bold mb-4 animate-bounce">{winner === 'Draw' ? "It's a draw!" : winner === playerName ? "Congratulations, You win!" : `${winner} wins!`}</h2>
                <p className="text-2xl mb-4">Thanks for playing!</p>
                <div className="flex space-x-16 w-full max-w-4xl">
                    <div className="w-full">
                        <h3 className="text-xl mb-4 text-center">{playerName}</h3>
                        <table className="w-full table-auto bg-white bg-opacity-10 rounded-lg shadow-lg">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Guess</th>
                                    <th className="px-4 py-2">X</th>
                                    <th className="px-4 py-2">O</th>
                                </tr>
                            </thead>
                            <tbody>
                                {playerGuesses(playerName || '')}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full">
                        <h3 className="text-xl mb-4 text-center">{opponentName}</h3>
                        <table className="w-full table-auto bg-white bg-opacity-10 rounded-lg shadow-lg">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Guess</th>
                                    <th className="px-4 py-2">X</th>
                                    <th className="px-4 py-2">O</th>
                                </tr>
                            </thead>
                            <tbody>
                                {playerGuesses(opponentName)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-800 to-blue-700 flex flex-col items-center justify-center text-white font-sans">
            <h1 className="text-4xl font-bold mb-8">Game {gameId}</h1>
            <h2 className="text-2xl mb-4">{currentTurn === playerName ? "Your turn!" : "Opponent's turn"}</h2>
            <input 
                className="p-3 w-24 text-lg text-gray-900 bg-white bg-opacity-70 rounded-lg border-2 border-transparent focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out shadow-md mb-4"
                placeholder="123"
                value={guess}
                onChange={(e) => validateAndSetGuess(e.target.value)}
                disabled={currentTurn !== playerName}
                maxLength={3}
            />
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
                className={`px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform mb-4 ${
                    currentTurn === playerName && guess.length === 3 && !error ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={makeGuess}
                disabled={currentTurn !== playerName || guess.length !== 3 || error !== ''}
            >
                Guess
            </button>
            <div className="flex space-x-16 w-full max-w-4xl">
                <div className="w-full">
                    <h3 className="text-xl mb-4 text-center">{playerName}</h3>
                    <table className="w-full table-auto bg-white bg-opacity-10 rounded-lg shadow-lg">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Guess</th>
                                <th className="px-4 py-2">X</th>
                                <th className="px-4 py-2">O</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playerGuesses(playerName || '')}
                        </tbody>
                    </table>
                </div>
                <div className="w-full">
                    <h3 className="text-xl mb-4 text-center">{opponentName}</h3>
                    <table className="w-full table-auto bg-white bg-opacity-10 rounded-lg shadow-lg">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Guess</th>
                                <th className="px-4 py-2">X</th>
                                <th className="px-4 py-2">O</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playerGuesses(opponentName)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Game;
