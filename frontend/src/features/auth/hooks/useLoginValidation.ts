/** @addsuggestions-005-author Onke Mbingeleli */
import { useState } from "react";

/**
 * Hook that validates login form fields (email + password) before submission.
 *
 * Connection guide:
 *   const { email, setEmail, password, setPassword,
 *           emailError, passwordError, handleSubmit, validateForm } = useLoginValidation();
 *
 *   <form onSubmit={handleSubmit(yourLoginFn)}>
 *     <input value={email} onChange={(e) => setEmail(e.target.value)} />
 *     {emailError && <p>{emailError}</p>}
 *     <input value={password} onChange={(e) => setPassword(e.target.value)} />
 *     {passwordError && <p>{passwordError}</p>}
 *     <button type="submit">Login</button>
 *   </form>
 */
export function useLoginValidation() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isValidEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validateForm = (): boolean => {
    let isValid = true;

    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit =
    (loginFunction?: () => void | Promise<void>) =>
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validateForm() && loginFunction) {
        await loginFunction();
      }
    };

  return {
    email,
    password,
    emailError,
    passwordError,
    setEmail: (value: string) => {
      setEmail(value);
      if (emailError) setEmailError("");
    },
    setPassword: (value: string) => {
      setPassword(value);
      if (passwordError) setPasswordError("");
    },
    handleSubmit,
    validateForm,
  };
}

export default useLoginValidation;