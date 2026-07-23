import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from "../features/auth/components/LoginForm";

// const Login = () => {
//   return (
//     <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-100 px-4 py-8">
//       <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
//         <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
//         <p className="mt-2 text-sm text-gray-600">Sign in to continue to Service Finder.</p>
//         <Link to="/" className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700">
//           Back to map
//         </Link>
//       </div>
//     </main>
//   );
// };



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
          <a
            href="/"
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-2xl leading-none text-slate-900 hover:bg-slate-200"
          >
            x
          </a>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}

export default Login;
