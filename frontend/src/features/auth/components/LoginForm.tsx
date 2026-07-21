import { FormEvent, useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Connect this form to the authentication flow when it is available.
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

      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
      >
        Sign in
      </button>

      <p className="text-center text-base text-slate-500">
        Don't have an account?{" "}
        <a
          href="/register"
          className="font-bold text-teal-700 underline-offset-4 hover:underline"
        >
          Sign up
        </a>
      </p>
    </form>
  );
}

export default LoginForm;
