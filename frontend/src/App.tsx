import { useState } from "react";
import { AuthModal } from "./features/auth/components/AuthModal";

function Home() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
        find-a-service
      </h1>
    </section>
  );
}

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <button
        onClick={() => setIsAuthOpen(true)}
        className="m-4 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white"
      >
        Sign in
      </button>

      <Home />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default App;