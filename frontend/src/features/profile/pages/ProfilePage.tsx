import { NavLink, Navigate, Outlet } from "react-router-dom";
import{ useAuthStore }from "../../../store/useAuthStore";
import Avatar from "../../../components/ui/Avatar";

const tabLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "mr-5 border-b-2 pb-2.5 text-sm font-semibold no-underline",
    isActive
      ? "border-teal-600 text-teal-700"
      : "border-transparent text-slate-500",
  ].join(" ");

function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.loading);

  // Wait for the initial auth state to resolve before deciding whether to redirect.
  if (isLoading) {
    return null;
  }

  // Guard: no session, no dashboard.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const fullName = user ? `${user.first_name} ${user.last_name}`.trim() : "";
  const firstName = fullName.split(" ")[0];

  return (
    <section className="mx-auto max-w-2xl px-6 py-8">
      <header className="mb-6 flex items-center gap-4">
        <Avatar name={firstName} size="lg" />
        <div>
          <h1 className="m-0 text-2xl font-semibold text-slate-900">
            {fullName}
          </h1>
          <p className="mt-1 text-slate-500">{user?.email}</p>
        </div>
      </header>

      <nav className="mb-6 flex gap-2 border-b border-slate-200">
        <NavLink to="/profile" end className={tabLinkClass}>
          Overview
        </NavLink>
        <NavLink to="/profile/saved-routes" className={tabLinkClass}>
          Saved routes
        </NavLink>
        <NavLink to="/profile/report-history" className={tabLinkClass}>
          Report history
        </NavLink>
        <NavLink to="/profile/settings" className={tabLinkClass}>
          Settings
        </NavLink>
      </nav>

      <div>
        <Outlet />
      </div>
    </section>
  );
}

export default ProfilePage;