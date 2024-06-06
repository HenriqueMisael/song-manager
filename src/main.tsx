import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HotkeysProvider } from "@blueprintjs/core";
import { Provider } from "react-redux";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "normalize.css";

import { router } from "./routes";
import ThemeProvider from "./theme-provider.tsx";
import store from "./store";
import AppNavbar from "./app-navbar";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HotkeysProvider>
        <ThemeProvider>
          <AppNavbar />
          <RouterProvider router={router} />
        </ThemeProvider>
      </HotkeysProvider>
    </Provider>
  </React.StrictMode>
);
