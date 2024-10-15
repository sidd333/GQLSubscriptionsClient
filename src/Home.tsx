// src/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <nav>
                <Link to="/create-user">Create User</Link>
                <Link to="/create-post">Create Post</Link>
            </nav>
        </div>
    );
};

export default Home;
