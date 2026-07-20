//if log in page required, could be done here
// src/pages/Login.tsx

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuthErrorMessage } from '../utils/authErrors';
import { auth } from '../api/firebase/config';
// If you use React Router for navigation, uncomment the next line:
// import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for error and loading
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If you use React Router, uncomment the next line:
  // const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous error
    setError(null);
    setLoading(true);

    try {
      // Attempt to sign in
      await signInWithEmailAndPassword(auth, email, password);

      // SUCCESS: error is already cleared (setError(null) above)
      console.log('Login successful!');

      // Redirect to dashboard or home page
      // Uncomment ONE of the following lines based on your setup:
      // navigate('/dashboard');          // if using React Router
      // window.location.href = '/dashboard'; // if not using React Router

    } catch (error: any) {
      // FAILURE: translate Firebase error code to a friendly message
      const errorCode = error?.code || '';
      const errorMessage = error?.message || '';
      const mappedMessage = getAuthErrorMessage(errorCode, errorMessage);
      const userMessage = mappedMessage || errorMessage || 'Login failed. Please try again later.';
      console.warn('Login error:', { errorCode, errorMessage, error });
      setError(userMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>

      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Error Message Display */}
        {error && (
          <div
            role="alert"
            style={{
              color: '#d32f2f',
              marginBottom: '15px',
              padding: '10px',
              border: '1px solid #d32f2f',
              borderRadius: '4px',
              backgroundColor: '#ffebee',
            }}
          >
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#aaaaaa' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s',
          }}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default Login;