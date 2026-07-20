// src/components/auth/SignInForm.tsx
import { useState, FormEvent } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

type SignInFormProps = {
  onSuccess: () => void;
};

export function SignInForm({ onSuccess }: SignInFormProps) {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Enter an email and password.");
      return;
    }

    setSubmitting(true);
    const user = await login(email, password);
    setSubmitting(false);

    if (!user) {
      setError(useAuthStore.getState().error || "Incorrect email or password.");
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="signin-email" className="text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          id="signin-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="signin-password" className="text-sm font-semibold text-slate-700">
          Password
        </label>
        <input
          id="signin-password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {submitting ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}