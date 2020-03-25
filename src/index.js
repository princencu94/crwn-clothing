import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {persistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <persistGate persistor={persistor}>
                <App />
            </persistGate>
            
        </BrowserRouter>
    </Provider>

, document.getElementById('root'));


