// LoginValidation.tsx
import React, { useState } from 'react';

// ============================================
// COMPONENT: LoginValidation
// ============================================
// This component provides login form validation with:
// - Email field: cannot be empty, must be valid format
// - Password field: cannot be empty
// - Error messages for each validation failure
// - Prevents form submission until all fields are valid
// ============================================
//
// CONNECTION GUIDE:
// ============================================
// 1. Import into your login page:
//    import useLoginValidation from './LoginValidation';
//
// 2. Use the hook:
//    const { email, setEmail, password, setPassword, 
//            emailError, passwordError, handleSubmit } = useLoginValidation();
//
// 3. Connect to your form:
//    <form onSubmit={handleSubmit(yourLoginFunction)}>
//      <input value={email} onChange={(e) => setEmail(e.target.value)} />
//      <input value={password} onChange={(e) => setPassword(e.target.value)} />
//      {emailError && <div className="text-red-500">{emailError}</div>}
//      {passwordError && <div className="text-red-500">{passwordError}</div>}
//      <button type="submit">Login</button>
//    </form>
// ============================================

const useLoginValidation = () => {
  // Form field states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Validate email format using regex
  const isValidEmail = (email: string): boolean => {
    // Only allow specific email providers
    const allowedDomainsRegex =
      /^[^\s@]+@(gmail\.com|outlook\.com|icloud\.com|yahoo\.com)$/;
    return allowedDomainsRegex.test(email);
  };

  // Validate form - returns true if valid, false if invalid
  const validateForm = (): boolean => {
    let isValid = true;
    
    // Clear previous errors
    setEmailError('');
    setPasswordError('');

    // Check if email is empty
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } 
    // Check if email format is valid
    else if (!isValidEmail(email)) {
      setEmailError(
        'Invalid email. Only Gmail, Outlook, iCloud, or Yahoo are accepted.'
      );
      isValid = false;
    }

    // Check if password is empty
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    }

    return isValid;
  };

  // Handle form submission - prevents submission if validation fails
  const handleSubmit = (loginFunction?: () => void | Promise<void>) => {
    return async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Run validation
      const isValid = validateForm();

      // Only proceed with login if validation passes
      if (isValid && loginFunction) {
        await loginFunction();
      }
    };
  };

  return {
    // State
    email,
    password,
    emailError,
    passwordError,
    
    // Setters
    setEmail: (value: string) => {
      setEmail(value);
      // Clear error when user types
      if (emailError) setEmailError('');
    },
    setPassword: (value: string) => {
      setPassword(value);
      // Clear error when user types
      if (passwordError) setPasswordError('');
    },
    
    // Functions
    handleSubmit,
    validateForm,
  };
};

export default useLoginValidation;