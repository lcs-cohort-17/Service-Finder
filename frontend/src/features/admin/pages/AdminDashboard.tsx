import { useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import useServiceStore from "../../../store/useServiceStore";
import ReviewQueue from "../components/ReviewQueue";

function AdminDashboard() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const {
    approvedServices,
    pendingServices,
    rejectedServices,
    loading,
    error,
    fetchAllServices,
    fetchAllPendingServices,
    fetchAllRejectedServices,
  } = useServiceStore();

  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      void Promise.all([
        fetchAllPendingServices(),
        fetchAllServices(),
        fetchAllRejectedServices(),
      ]);
    }
  }, []);

  if (!isAuthenticated || !user) {
    return (
      <div className="access-denied">
        Please log in to access this page.
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="access-denied">
        Access Denied. Admins only.
      </div>
    );
  }

  const refresh = async () => {
    await Promise.all([
      fetchAllPendingServices(),
      fetchAllServices(),
      fetchAllRejectedServices(),
    ]);
  };

  return (
    <main className="min-h-screen bg-slate-400 px-4 py-5">
      <div className="mx-auto max-w-[1440px] rounded-2xl bg-white shadow-2xl">

        <header className="flex items-center justify-between border-b p-6">
          <div>
            <h1 className="text-3xl font-bold">
              Admin Dashboard
            </h1>
            <p>Welcome back, {user.email}</p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg border px-5 py-2"
          >
            Logout
          </button>
        </header>

        <div className="p-8">

          <div className="mb-8 grid grid-cols-3 gap-4">

            <div className="rounded-xl border p-6 text-center">
              <h3 className="font-bold">Pending</h3>
              <p className="text-4xl font-bold text-amber-600">
                {pendingServices.length}
              </p>
            </div>

            <div className="rounded-xl border p-6 text-center">
              <h3 className="font-bold">Approved</h3>
              <p className="text-4xl font-bold text-green-600">
                {approvedServices.length}
              </p>
            </div>

            <div className="rounded-xl border p-6 text-center">
              <h3 className="font-bold">Rejected</h3>
              <p className="text-4xl font-bold text-red-600">
                {rejectedServices.length}
              </p>
            </div>

          </div>

          <div className="mb-8 flex justify-end">
            <button
              onClick={() => void refresh()}
              className="rounded-lg border px-5 py-2"
            >
              Refresh
            </button>
          </div>

          {loading && (
            <div className="mb-6">
              Loading...
            </div>
          )}

          {error && (
            <div className="mb-6 rounded border border-red-300 bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          <ReviewQueue
            title="Pending"
            services={pendingServices}
            status="pending"
          />

          <ReviewQueue
            title="Approved"
            services={approvedServices}
            status="approved"
          />

          <ReviewQueue
            title="Rejected"
            services={rejectedServices}
            status="rejected"
          />

        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;