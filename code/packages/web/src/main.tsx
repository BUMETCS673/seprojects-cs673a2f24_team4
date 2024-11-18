import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store.ts';
import UserService from './services/UserService.ts';

const renderApp = () =>
  createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

UserService.initKeycloak(renderApp);
