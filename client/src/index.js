import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import configureStore from './store';
import App from './App';
import './assets/styles/main.css';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const rootEl = document.getElementById('root');
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Provider>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    ReactDOM.render(
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <NextApp />
        </SnackbarProvider>
      </Provider >,
      rootEl
    );
  });
}