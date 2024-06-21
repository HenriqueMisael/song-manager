import { FocusStyleManager, HotkeysProvider } from '@blueprintjs/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'normalize.css';
import './main.css';
import { RouterProvider } from 'react-router-dom';

import AppNavbar from './app-navbar';
import { router } from './routes';
import store from './store';
import ThemeProvider from './theme-provider.tsx';

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HotkeysProvider>
        <ThemeProvider>
          <AppNavbar />
          <RouterProvider router={router} />
        </ThemeProvider>
      </HotkeysProvider>
    </Provider>
  </React.StrictMode>,
);
