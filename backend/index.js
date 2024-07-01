const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let games = {};

function isValidNumber(number) {
    if (number.length !== 3) return false;
    if (number.includes('0')) return false;
    if (new Set(number).size !== 3) return false;
    return true;
}

app.post('/start', (req, res) => {
    const { playerName } = req.body;
    const gameId = Math.random().toString(36).substring(2, 9);
    games[gameId] = {
        players: {
            [playerName]: ''
        },
        turns: [],
        status: 'waiting',
        currentTurn: playerName,
        winner: null,
        guesses: { [playerName]: 0 }
    };
    res.json({ gameId, playerName });
});

app.post('/join', (req, res) => {
    const { gameId, playerName } = req.body;
    if (!games[gameId]) {
        return res.status(404).json({ message: 'Game not found' });
    }
    games[gameId].players[playerName] = '';
    games[gameId].guesses[playerName] = 0;
    res.json({ message: 'Joined the game' });
});

app.post('/start-game', (req, res) => {
    const { gameId, playerName, number } = req.body;
    if (!games[gameId]) {
        return res.status(404).json({ message: 'Game not found' });
    }
    if (!isValidNumber(number)) {
        return res.status(400).json({ message: 'Invalid number. Ensure it is 3 digits, no zeros, and no duplicates.' });
    }
    games[gameId].players[playerName] = number;

    // Check if both players have entered their numbers
    if (Object.values(games[gameId].players).every(playerNumber => playerNumber.length === 3)) {
        games[gameId].status = 'ready';
    }

    res.json({ message: 'Number set', status: games[gameId].status });
});

app.post('/guess', (req, res) => {
    const { gameId, playerName, guess } = req.body;
    const game = games[gameId];
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }

    if (!isValidNumber(guess)) {
        return res.status(400).json({ message: 'Invalid guess. Ensure it is 3 digits, no zeros, and no duplicates.' });
    }

    if (game.currentTurn !== playerName) {
        return res.status(400).json({ message: 'Not your turn' });
    }

    const opponentName = Object.keys(game.players).find(name => name !== playerName);
    const opponentNumber = game.players[opponentName];

    let result = '';
    for (let i = 0; i < 3; i++) {
        if (guess[i] === opponentNumber[i]) {
            result += 'X';
        } else if (opponentNumber.includes(guess[i])) {
            result += 'O';
        }
    }
    if (result === '') result = '-';

    game.turns.push({ playerName, guess, result });
    game.guesses[playerName] += 1;

    if (result === 'XXX') {
        if (game.guesses[opponentName] < game.guesses[playerName]) {
            // If opponent has less turns, wait for their guess
            game.currentTurn = opponentName;
        } else {
            // Both have equal turns or opponent has more turns, game over
            game.winner = playerName;
        }
    } else {
        game.currentTurn = opponentName;
    }

    res.json({ result, game });
});

app.get('/game/:gameId', (req, res) => {
    const { gameId } = req.params;
    const game = games[gameId];
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
