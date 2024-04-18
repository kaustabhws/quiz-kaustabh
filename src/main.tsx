import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./components/login-provider.tsx";
import { Toaster } from "react-hot-toast";
import { OptionsProvider } from "./components/options-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <OptionsProvider>
          <LoginProvider defaultStatus="false" storageKey="login-status">
            <Toaster />
            <App />
          </LoginProvider>
        </OptionsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
