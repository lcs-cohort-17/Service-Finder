import { useState } from "react";
import { AuthModal } from "./components/auth/AuthModal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <button
        onClick={() => setModalOpen(true)}
        className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white"
      >
        Sign in
      </button>
      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default App;