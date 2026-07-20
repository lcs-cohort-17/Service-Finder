import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
        <p className="mt-2 text-sm text-gray-600">Sign in to continue to Service Finder.</p>
        <Link to="/" className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700">
          Back to map
        </Link>
      </div>
    </main>
  );
};

export default Login;