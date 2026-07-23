import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
      <h1 className="text-3xl font-bold text-gray-800">
        Sign in
      </h1>

      <p className="mt-2 text-gray-500">
        Save routes, track your reports, and personalize Service Finder.
      </p>

      <form className="mt-8 space-y-5">

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-600"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-600"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-teal-700 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-teal-700 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
import { FormEvent, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

type LoginFormProps = {
  onSuccess?: () => void;
};

function LoginForm({ onSuccess }: LoginFormProps) {
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Enter an email and password.");
      return;
    }

    setSubmitting(true);

    const user = await login(email, password);

    setSubmitting(false);

    if (!user) {
      setError(
        useAuthStore.getState().error || "Incorrect email or password."
      );
      return;
    }

    onSuccess?.();
  };

  return (
    <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
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
        </div>
      </div>

      {error && (
        <p className="text-sm font-medium text-red-600">{error}</p>
      )}

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