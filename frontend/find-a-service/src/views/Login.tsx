// src/views/Login.tsx  (or components/Login.tsx)
import { useState } from 'react';
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('🔍 auth object:', auth); // 👈 see if auth is defined
      await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login successful');
    } catch (err: any) {
      console.log(' ERROR CODE:', err.code);
      console.log(' ERROR MESSAGE:', err.message);
      console.log(' FULL ERROR:', err);

      let msg = err.message;
      if (err.code === 'auth/user-not-found') msg = 'No account found with this email.';
      else if (err.code === 'auth/wrong-password') msg = 'Incorrect password.';
      else if (err.code === 'auth/invalid-email') msg = 'Invalid email address.';
      else if (err.code === 'auth/too-many-requests') msg = 'Too many attempts. Try again later.';
      else if (err.code === 'auth/network-request-failed') msg = 'Network error – check your internet.';
      else if (err.code === 'auth/api-key-not-valid') msg = 'Firebase API key is invalid.';
      else if (err.code === 'auth/argument-error') msg = 'Missing email or password.';
      else msg = `Error: ${err.message}`;

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <div className="field">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="**********"
          required
        />
      </div>
      {error && <div className="auth-error">{error}</div>}
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? <span className="spinner">⏳ Loading...</span> : 'Sign in'}
      </button>
    </form>
  );
};

export default Login;