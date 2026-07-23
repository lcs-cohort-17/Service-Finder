/** @addsuggestions-005-author Onke Mbingeleli */
import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useLoginValidation } from "../hooks/useLoginValidation";

type LoginFormProps = {
  onSuccess?: () => void;
};

function LoginForm({ onSuccess }: LoginFormProps) {
  const login = useAuthStore((s) => s.login);

  const {
    email,
    password,
    emailError,
    passwordError,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLoginValidation();

  const [submitting, setSubmitting] = useState(false);

  const doLogin = async () => {
    setSubmitting(true);
    const user = await login(email, password);
    setSubmitting(false);

    if (!user) {
      // The hook doesn't know about backend errors, so we rely on the store
      return;
    }

    onSuccess?.();
  };

  return (
    <form className="mt-4 space-y-4" onSubmit={handleSubmit(doLogin)}>
      <div className="space-y-3">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-600"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10"
            placeholder="you@example.com"
          />
          {emailError && (
            <p className="mt-1 text-sm font-medium text-red-600">{emailError}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-slate-600"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10"
            placeholder="Enter your password"
          />
          {passwordError && (
            <p className="mt-1 text-sm font-medium text-red-600">{passwordError}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 disabled:opacity-50"
      >
        {submitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default LoginForm;