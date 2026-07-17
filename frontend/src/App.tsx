import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './views/Login';
import SignUp from './views/SignUp';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
// @ts-ignore: allow importing CSS without type declarations
import './App.css';

function App() {
  const { user } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="app">
      <div className="auth-card">
        <div className="card-header">
          <i className="fas fa-map-pin"></i>
          <span>ConnectWithUs</span>
        </div>

        {user ? (
          // Logged in – show user info & logout
          <div className="user-badge">
            <div className="avatar">{user.displayName?.[0] || user.email?.[0] || 'U'}</div>
            <div className="user-info">
              <div className="name">{user.displayName || user.email}</div>
              <div className="email">{user.email}</div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        ) : (
          // Not logged in – show login/signup forms
          <>
            <div className="auth-title">
              {showSignUp ? 'Create your account' : 'Sign in'}
            </div>
            {showSignUp ? (
              <>
                <SignUp />
                <div className="auth-toggle">
                  Already have an account?{' '}
                  <a onClick={() => setShowSignUp(false)}>Sign in</a>
                </div>
              </>
            ) : (
              <>
                <Login />
                <div className="auth-toggle">
                  Don't have an account?{' '}
                  <a onClick={() => setShowSignUp(true)}>Sign up</a>
                </div>
              </>
            )}
            <div className="auth-demo-note">
              <i className="fas fa-info-circle"></i> Demo account only — stored in browser, not sent anywhere.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;