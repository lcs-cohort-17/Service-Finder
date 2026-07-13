// src/components/SignUp.jsx
import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [home, setHome] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: name || 'User' });
      if (home) localStorage.setItem('cw_homeArea', home);
    } catch (err) {
      let msg = err.message;
      if (err.code === 'auth/email-already-in-use') msg = 'Email already registered.';
      else if (err.code === 'auth/weak-password') msg = 'Password must be at least 6 characters.';
      else if (err.code === 'auth/invalid-email') msg = 'Invalid email address.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="auth-form">
      <div className="field">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Thandi Mokoena"
        />
      </div>
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
      <div className="field">
        <label>Home area (optional)</label>
        <input
          type="text"
          value={home}
          onChange={(e) => setHome(e.target.value)}
          placeholder="e.g. Khayelitsha"
        />
      </div>
      {error && <div className="auth-error">{error}</div>}
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? <span className="spinner">⏳ Loading...</span> : 'Create account'}
      </button>
    </form>
  );
};

export default SignUp;