import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

function SignUpForm() {
  const register = useAuthStore((s) => s.register);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [homeArea, setHomeArea] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Enter an email and password.");
      return;
    }

    const [firstName, ...rest] = name.trim().split(" ");
    const lastName = rest.join(" ") || "";

    setSubmitting(true);
    const success = await register({
      first_name: firstName || name,
      last_name: lastName,
      email,
      home_area: homeArea,
      role: "user",
      password,
    });

    if (!success) {
      setError(useAuthStore.getState().error || "Registration failed.");
      setSubmitting(false);
      return;
    }

    await login(email, password);
    setSubmitting(false);
    navigate("/");
  };

  return (
    <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-3">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-600">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10"
            placeholder="e.g. Thandi Mokoena"
          />
        </div>

        <div>
          <label htmlFor="register-email" className="block text-sm font-semibold text-slate-600">
            Email
          </label>
          <input
            id="register-email"
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
          <label htmlFor="register-password" className="block text-sm font-semibold text-slate-600">
            Password
          </label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <label htmlFor="home-area" className="block text-sm font-semibold text-slate-600">
            Home area <span className="font-normal">(optional)</span>
          </label>
          <input
            id="home-area"
            name="homeArea"
            type="text"
            autoComplete="address-level2"
            value={homeArea}
            onChange={(event) => setHomeArea(event.target.value)}
            className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10"
            placeholder="e.g. Khayelitsha"
          />
        </div>
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 disabled:opacity-50"
      >
        {submitting ? "Creating account…" : "Create account"}
      </button>

      <p className="text-center text-base text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-teal-700 underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default SignUpForm;