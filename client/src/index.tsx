import React from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { CookiesProvider } from 'react-cookie';

import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Poppins',
        'sans-serif'
      ].join(','),
    }
});

let persistor = persistStore(store);

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CookiesProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </CookiesProvider>
    </ThemeProvider>,
document.getElementById('root')
);

