import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';

import './assets/styles/global.sass';

import App from './components/app/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>
);