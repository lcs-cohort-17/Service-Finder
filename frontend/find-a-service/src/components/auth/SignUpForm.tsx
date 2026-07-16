// src/components/auth/SignUpForm.tsx
// src/components/auth/SignUpForm.tsx
import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.ts";
import { getAuthErrorMessage } from "../../firebase/authErrors";

type SignUpFormProps = {
  onSuccess: () => void;
};

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [name, setName] = useState("");
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
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      onSuccess();
    } catch (err: any) {
      setError(getAuthErrorMessage(err.code));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="signup-name" className="text-sm font-semibold text-slate-700">
          Name
        </label>
        <input
          id="signup-name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="signup-email" className="text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="signup-password" className="text-sm font-semibold text-slate-700">
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          placeholder="Min. 6 characters"
          value={password}
          minLength={6}
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
        {submitting ? "Creating account…" : "Sign Up"}
      </button>
    </form>
  );
}