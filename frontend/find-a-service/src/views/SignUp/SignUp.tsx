import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import DemoNotice from '../../components/DemoNotice';
import Notification from '../../components/Notification';
import styles from './SignUp.module.css';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [homeArea, setHomeArea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState<null | { message: string; type: 'success' | 'error' }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Sign up attempt:', { name, email, password, homeArea });
      await new Promise(resolve => setTimeout(resolve, 800));

      // store demo user(s) in localStorage
      const existing = localStorage.getItem('demoUsers');
      const users = existing ? JSON.parse(existing) : [];
      users.push({ name, email, password, homeArea });
      localStorage.setItem('demoUsers', JSON.stringify(users));

      setNotification({ message: 'Demo account created — stored locally in this browser', type: 'success' });
      setIsLoading(false);
      setTimeout(() => navigate('/login'), 900);
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card 
        title="Create your account" 
        subtitle="Save routes, track your reports, and personalize ConnectWithUs."
      >
        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Thandi Mokoena"
            required
            disabled={isLoading}
          />

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
            placeholder="********"
            required
            disabled={isLoading}
            showPasswordToggle
          />

          <Input
            id="homeArea"
            label="Home area (optional)"
            type="text"
            value={homeArea}
            onChange={(e) => setHomeArea(e.target.value)}
            placeholder="e.g. Khayelitsha"
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="primary"
            size="medium"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
            Create account
          </Button>
        </form>

        <p className={styles.signinLink}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        <DemoNotice />
      </Card>
    </div>
  );
};

export default SignUp;