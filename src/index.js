import React from 'react';
import ReactDOM from 'react-dom';
import './assets/shared.scss';
import App from './App';
import { GlobalContextProvider } from './context/GlobalContext';
import { SessionContextProvider } from './context/SessionContext';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <GlobalContextProvider>
        <SessionContextProvider>
          <App />
        </SessionContextProvider>
      </GlobalContextProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
