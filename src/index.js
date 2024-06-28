import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";

import store from './store';

import 'normalize.css';

import './assets/styles/global.sass';

import App from './components/app/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);