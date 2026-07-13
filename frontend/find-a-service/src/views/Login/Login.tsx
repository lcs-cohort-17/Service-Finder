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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Login attempt:', { email, password });
      await new Promise(resolve => setTimeout(resolve, 600));

      // check demo users stored in localStorage
      const raw = localStorage.getItem('demoUsers');
      const users = raw ? JSON.parse(raw) : [];
      const match = users.find((u: any) => u.email === email && u.password === password);

      if (match) {
        setNotification({ message: 'Logged in successfully', type: 'success' });
        setIsLoading(false);
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
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            disabled={isLoading}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="**********"
            required
            disabled={isLoading}
            showPasswordToggle
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
