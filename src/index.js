import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LangContextProvider } from "./store/LangContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <LangContextProvider>
            <App />
        </LangContextProvider>
    </React.StrictMode>
);
