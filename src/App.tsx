import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import WaitingRoom from './components/WaitingRoom';
import StartGame from './components/StartGame';
import Game from './components/Game';
import HowToPlay from './components/HowToPlay';
import NotFound from './components/NotFound';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/gsm" element={<Home />} />
                <Route path="/gsm/create" element={<CreateGame />} />
                <Route path="/gsm/join" element={<JoinGame />} />
                <Route path="/gsm/waiting/:gameId/:playerName" element={<WaitingRoom />} />
                <Route path="/gsm/start/:gameId/:playerName" element={<StartGame />} />
                <Route path="/gsm/game/:gameId/:playerName" element={<Game />} />
                <Route path="/gsm/how-to-play" element={<HowToPlay />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
