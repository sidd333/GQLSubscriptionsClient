// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Home from './Home'; // Optional Home component
import CreateUser from './CreateUser';
import CreatePost from './CreatePost';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/create-post" element={<CreatePost />} />
            </Routes>
        </Router>
    );
};

export default App;
