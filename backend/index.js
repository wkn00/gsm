const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let games = {};

app.post('/start', (req, res) => {
    const { playerName } = req.body;
    const gameId = Math.random().toString(36).substring(2, 9);
    games[gameId] = {
        players: {
            [playerName]: ''
        },
        turns: [],
        status: 'waiting',
        currentTurn: playerName
    };
    res.json({ gameId, playerName });
});

app.post('/join', (req, res) => {
    const { gameId, playerName } = req.body;
    if (!games[gameId]) {
        return res.status(404).json({ message: 'Game not found' });
    }
    games[gameId].players[playerName] = '';
    games[gameId].status = 'ready';
    res.json({ message: 'Joined the game' });
});

app.post('/start-game', (req, res) => {
    const { gameId, playerName, number } = req.body;
    if (!games[gameId]) {
        return res.status(404).json({ message: 'Game not found' });
    }
    games[gameId].players[playerName] = number;
    res.json({ message: 'Game started' });
});

app.post('/guess', (req, res) => {
    const { gameId, playerName, guess } = req.body;
    const game = games[gameId];
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
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

    // Switch turn to the opponent
    game.currentTurn = opponentName;

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
