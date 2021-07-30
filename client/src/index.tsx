import React from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { CookiesProvider } from 'react-cookie';

let persistor = persistStore(store);

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </CookiesProvider>,
document.getElementById('root')
);

