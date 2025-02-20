// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Expected container DOM node to be defined');
}

const root = createRoot(container);
root.render(<App />);