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
