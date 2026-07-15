import React, { useEffect } from 'react';
import styles from './Notification.module.css';

type NotificationProps = {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onClose?: () => void;
};

const Notification: React.FC<NotificationProps> = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const id = setTimeout(() => {
      onClose && onClose();
    }, duration);

    return () => clearTimeout(id);
  }, [message, duration, onClose]);

  return (
    <div className={`${styles.container} ${type === 'success' ? styles.success : styles.error}`} role="status">
      {message}
    </div>
  );
};

export default Notification;
