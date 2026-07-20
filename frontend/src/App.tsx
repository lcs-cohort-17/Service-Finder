import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Settings from "./views/Settings";
import Users from "./views/Users";
import ProtectedRoute from "./components/layout/proctectedRouter";
import { useAuthStore } from "./store/useAuthStore";
import LoginForm from "./features/auth/components/LoginForm";
import SignUpForm from "./features/auth/components/SignUpForm";
import "./index.css";


function App() {
  const initAuthListener = useAuthStore((state) => state.initAuthListener);

  useEffect(() => {
    const unsubscribe = initAuthListener();

    return () => {
      unsubscribe?.();
    };
  }, [initAuthListener]);

  const isRegister = window.location.pathname === "/register";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 text-slate-900">
      <section className="w-full max-w-[475px] rounded-[18px] bg-white px-6 py-7 shadow-2xl sm:px-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              {isRegister ? "Create your account" : "Sign in"}
            </h1>
            <p className="mt-1 text-base leading-5 text-slate-500">
              Save routes, track your reports, and personalize ConnectWithUs.
            </p>
          </div>
          <a
            href="/"
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl leading-none text-slate-900 hover:bg-slate-200"
          >
            x
          </a>
        </div>

        {isRegister ? <SignUpForm /> : <LoginForm />}
      </section>
    </main>
  );
}

export default App;
