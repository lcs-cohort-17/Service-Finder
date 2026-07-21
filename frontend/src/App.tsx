import { useEffect, useState } from "react";
import { AuthModal } from "./features/auth/components/AuthModal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(() => {
    if (typeof window === "undefined") return false;

    const navigationEntry = window.performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    return navigationEntry?.type === "reload";
  });

  useEffect(() => {
    if (!isRefreshing) return;

    const refreshTimer = window.setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);

    return () => window.clearTimeout(refreshTimer);
  }, [isRefreshing]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <button
        onClick={() => setModalOpen(true)}
        className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white"
      >
        Sign in
      </button>
      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {isRefreshing && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-100">
          <div
            className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900"
            aria-label="Refreshing"
            role="status"
          />
          <p className="mt-4 text-sm font-semibold text-slate-700">
            Refreshing browser...
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
