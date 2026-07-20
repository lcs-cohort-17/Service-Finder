// src/components/AdminLogin.tsx

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useAuth } from '../hooks/useAuth';

interface AdminLoginProps {
  onSuccess: () => void;
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const { login } = useAuth();
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Enter your email and password.');
      return;
    }

    setSubmitting(true);
    try {
      const loggedInUser = await login(email, password);

      if (loggedInUser.role !== 'admin') {
        setError('Access Denied: This account is missing Admin roles.');
        return;
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit} noValidate>
        <h1 style={styles.title}>Admin sign in</h1>
        <p style={styles.subtitle}>Review and manage pending map locations.</p>

        <label style={styles.label} htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          placeholder="admin@servicefinder.com"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          style={styles.input}
          disabled={submitting}
        />

        <label style={styles.label} htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          style={styles.input}
          disabled={submitting}
        />

        {error && (
          <div role="alert" style={styles.error}>
            <strong>Error:</strong> {error}
          </div>
        )}

        <button type="submit" style={styles.button} disabled={submitting}>
          {submitting ? 'Authenticating Securely…' : 'Sign In to Dashboard'}
        </button>
        
        <div style={styles.tip}>
          💡 <strong>Demo tip:</strong> Use an email containing <code>admin</code> (e.g., <code>admin@maps.com</code>) to unlock admin access.
        </div>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' },
  card: { width: '100%', maxWidth: 380, background: '#fff', borderRadius: 8, padding: '36px 32px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' },
  title: { margin: 0, fontSize: 24, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.5px' },
  subtitle: { margin: '6px 0 24px', fontSize: 14, color: '#666', lineHeight: '1.4' },
  label: { fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 },
  input: { padding: '11px 14px', marginBottom: 18, fontSize: 14, border: '1px solid #cbd5e1', borderRadius: 6, outline: 'none' },
  error: { background: '#fef2f2', color: '#b91c1c', fontSize: 13, padding: '10px 14px', borderRadius: 6, marginBottom: 18, border: '1px solid #fee2e2' },
  button: { padding: '12px', fontSize: 14, fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', borderRadius: 6, cursor: 'pointer', transition: 'background 0.2s' },
  tip: { marginTop: 20, padding: 12, background: '#f8fafc', borderRadius: 6, fontSize: 12, color: '#475569', border: '1px solid #f1f5f9', lineHeight: '1.5' }
};