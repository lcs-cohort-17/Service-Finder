import { Link } from "react-router-dom";
import LoginForm from "../features/auth/components/LoginForm";

function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 text-slate-900">
      <section className="w-full max-w-[475px] rounded-[18px] bg-white px-6 py-7 shadow-2xl sm:px-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              Sign in
            </h1>
            <p className="mt-1 text-base leading-5 text-slate-500">
              Save routes, track your reports, and personalize ConnectWithUs.
            </p>
          </div>
          <Link
            to="/"
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-2xl leading-none text-slate-900 hover:bg-slate-200"
          >
            x
          </Link>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}

export default Login;