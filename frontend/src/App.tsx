import "./App.css";

import AppRouter from "./routes/AppRouter";

/*
========================================================

Application Entry

Responsibilities

✔ Load global application styles

✔ Render the application router

✔ Keep App.tsx free from business logic

Routing is handled inside AppRouter.

Authentication is provided by AuthProvider.

========================================================
*/

function App() {

    return <AppRouter />;

}

export default App;