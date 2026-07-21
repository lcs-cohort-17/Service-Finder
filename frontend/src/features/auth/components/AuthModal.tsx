// src/components/auth/AuthModal.tsx
import { useState } from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[475px] rounded-[18px] bg-white px-6 py-7 shadow-2xl sm:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              {mode === "signin" ? "Sign in" : "Create your account"}
            </h1>
            <p className="mt-1 text-base leading-5 text-slate-500">
              Save routes, track your reports, and personalize ConnectWithUs.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-2xl leading-none text-slate-900 hover:bg-slate-200"
          >
            x
          </button>
        </div>

        {mode === "signin" ? (
          <LoginForm onSuccess={handleSuccess} />
        ) : (
          <SignUpForm onSuccess={handleSuccess} />
        )}

        <p className="mt-6 text-center text-base text-slate-500">
          {mode === "signin" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="font-bold text-teal-700 underline-offset-4 hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="font-bold text-teal-700 underline-offset-4 hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}