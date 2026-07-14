import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import DemoNotice from '../../components/DemoNotice';
import Notification from '../../components/Notification';
import styles from './Login.module.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState<null | { message: string; type: 'success' | 'error' }>(null);
// lutfeeya - Auth-002
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

// lutfeeya - Auth-002 
const validateForm = () => {
  let isValid = true;
  setEmailError(''); 
  setPasswordError('');

  if (!email.trim()) {
    setEmailError('Email is required');
    isValid = false;
  }

  if (!password.trim()) {
    setPasswordError('Password is required');
    isValid = false;
  }

  return isValid;
};
// lutfeeya - Auth-002


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setNotification(null);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      console.log('Login attempt:', { email, password });
      await new Promise(resolve => setTimeout(resolve, 600));

      const raw = localStorage.getItem('demoUsers');
      const users = raw ? JSON.parse(raw) : [];
      const match = users.find((u: any) => u.email === email && u.password === password);

      if (match) {
        setNotification({ message: 'Logged in successfully', type: 'success' });
        setTimeout(() => navigate('/'), 900);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      const msg = 'Invalid email or password. Please try again.';
      setError(msg);
      setNotification({ message: msg, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Sign in" subtitle="Save routes, track your reports, and personalize ConnectWithUs.">
        {error && <div className={styles.errorMessage}>{error}</div>}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            placeholder="you@example.com"
            required
            disabled={isLoading}
            error={emailError}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }}
            placeholder="**********"
            required
            disabled={isLoading}
            showPasswordToggle
            error={passwordError}
          />

          <Button
            type="submit"
            variant="primary"
            size="medium"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
            Sign in
          </Button>
        </form>

        <p className={styles.signupLink}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

        <DemoNotice />
      </Card>
    </div>
  );
};

export default Login;
