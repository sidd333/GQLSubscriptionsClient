// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'; // Import ApolloClient and ApolloProvider

import App from './App'; // Import your main App component
import client from './ApolloClient';




// Create a root for rendering
const container = document.getElementById('root');
const root = createRoot(container!); // Ensure container is not null
console.log(client);
// Render the application
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);



