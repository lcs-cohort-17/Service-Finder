import React, { useState } from 'react';
import styles from './Input.module.css';

interface InputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  showPasswordToggle?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  error,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderPasswordToggle = () => {
    if (!showPasswordToggle || type !== 'password') return null;

    return (
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className={styles.togglePassword}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        disabled={disabled}
      >
        {showPassword ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    );
  };

  return (
    <div className={`${styles.field} ${className}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <div className={styles.inputWrapper}>
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
        />
        {renderPasswordToggle()}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;
