import { Link, useNavigate } from "react-router-dom";
import {useAuthStore} from "../../store/useAuthStore";
import Avatar from "../ui/Avatar";

type NavBarProps = {
  onSignIn: () => void;
};

function NavBar({ onSignIn }: NavBarProps) {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);

  const navigate = useNavigate();

  const firstName = user?.first_name || "";

  return (
    <nav className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
      <Link to="/" className="font-bold text-slate-900 no-underline">
        find-a-service
      </Link>

      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <Link
            to="/community"
            className="text-sm font-semibold text-slate-700 no-underline hover:text-slate-900"
          >
            {/* COMMUNITY-001/002 - Onke Mbingeleli */}
            Community Reports
          </Link>
        )}
        {isLoggedIn ? (
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-slate-100 py-1 pl-1 pr-4 font-semibold text-slate-900"
          >
            <Avatar name={firstName} size="sm" />
            {firstName}
          </button>
        ) : (
          <button
            type="button"
            onClick={onSignIn}
            className="cursor-pointer rounded-full bg-slate-900 px-5 py-2 font-semibold text-white"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;