import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = '',
  hoverable = false,
}) => {
  return (
    <div className={`${styles.card} ${hoverable ? styles.hoverable : ''} ${className}`}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {children}
    </div>
  );
};

export default Card;