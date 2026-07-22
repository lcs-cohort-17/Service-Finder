import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";

/*
========================================================

Application Entry Point

Responsibilities

✔ Start React

✔ Enable BrowserRouter

✔ Render the application

Authentication restoration now happens inside
AuthProvider.

========================================================
*/

createRoot(

    document.getElementById("root")!

).render(

    <StrictMode>

        <BrowserRouter>

            <App />

        </BrowserRouter>

    </StrictMode>

);