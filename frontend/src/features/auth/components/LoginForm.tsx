/** @addsuggestions-006-author Onke Mbingeleli
 * TEMPORARY MOCK LOGIN — AUTH-005/AUTH-007 own the real login/signup UI
 * and Firebase Authentication wiring. This exists only so ADD
 * SUGGESTION-006's "redirect unauthenticated users to the login page"
 * requirement has somewhere real to go, and can be tested end-to-end
 * right now. It calls the same mock useAuthStore.login() the rest of the
 * mock auth already uses (no password — just an email, matching the
 * store's current shape). Replace this file once real Firebase
 * Authentication UI exists — useAuthStore's public shape isn't changing,
 * so nothing else needs to be touched.
 */
import { useState, type FormEvent, type ReactElement } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';

export interface LoginFormProps {
  onSuccess: () => void;
  onCancel?: () => void;
}

export function LoginForm({ onSuccess, onCancel }: LoginFormProps): ReactElement {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      login(email);
      setError('');
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not log in.');
    }
  }

  return (
    <div className="modal-overlay show">
      <div className="modal-card" style={{ width: 'min(380px, 92vw)' }}>
        {onCancel && (
          <button type="button" className="modal-close" onClick={onCancel} aria-label="Close">
            ✕
          </button>
        )}
        <h3>👋 Log in</h3>
        <div className="sub">
          Temporary mock login (email only, no password) while real
          authentication (AUTH-007) is being built.
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="loginEmail">
              Email
            </label>
            <input
              id="loginEmail"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={`form-error ${error ? 'show' : ''}`}>{error}</div>
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
