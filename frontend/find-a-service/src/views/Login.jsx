import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import useAuthStore from "../store/useAuthStore";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    login,
    isAuthenticated,
    loading,
    error,
    clearError,
  } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If redirected from a protected page,
  // go back there after login.
  const redirectTo = location.state?.from || "/home";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  useEffect(() => {
    clearError();

    return () => clearError();
  }, [clearError]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await login(email, password);
  };

  return (
    <main
      style={{
        maxWidth: "450px",
        margin: "60px auto",
        padding: "24px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h1>Login</h1>

      <p>
        Sign in to access protected features like
        <strong> Suggest Service</strong>.
      </p>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "16px" }}>
          <label>Email</label>

          <input
            type="email"
            value={email}
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Password</label>

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
            }}
            required
          />
        </div>

        {error && (
          <p
            style={{
              color: "red",
              marginBottom: "15px",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Signing In..." : "Login"}
        </button>

      </form>

      <hr style={{ margin: "25px 0" }} />

      <Link to="/home">
        ← Back to Home
      </Link>
    </main>
  );
}

export default Login;