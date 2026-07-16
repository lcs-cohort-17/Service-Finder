// src/components/auth/LogOutButton.tsx
// src/components/auth/LogOutButton.tsx
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.ts";

type LogOutButtonProps = {
  onSuccess?: () => void;
};

export function LogOutButton({ onSuccess }: LogOutButtonProps) {
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      onSuccess?.();
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  return (
    <button
      onClick={handleLogOut}
      className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100"
    >
      Log out
    </button>
  );
}