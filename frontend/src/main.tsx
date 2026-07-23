import React from "react";
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

Authentication is handled by useAuthStore (Zustand).

========================================================
*/

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);