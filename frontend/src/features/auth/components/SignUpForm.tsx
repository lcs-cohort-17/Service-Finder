// src/components/auth/SignUpForm.tsx
import { useState, FormEvent } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

type SignUpFormProps = {
  onSuccess: () => void;
};

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const register = useAuthStore((s) => s.register);
  const login = useAuthStore((s) => s.login);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
    const success = await register({
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phone,
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
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required
        className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" />
      <input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required
        className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
        className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" />
      <input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required
        className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" />
      <input type="password" placeholder="Min. 6 characters" value={password} minLength={6}
        onChange={(e) => setPassword(e.target.value)} required
        className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" />
      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
      <button type="submit" disabled={submitting}
        className="mt-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50">
        {submitting ? "Creating account…" : "Sign Up"}
      </button>
    </form>
  );
}