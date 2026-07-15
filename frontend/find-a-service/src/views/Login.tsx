// if log in page required, could be done here
import { useState, type CSSProperties, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type LoginStyles = {
  page: CSSProperties;
  card: CSSProperties;
  title: CSSProperties;
  subtitle: CSSProperties;
  label: CSSProperties;
  input: CSSProperties;
  button: (disabled: boolean) => CSSProperties;
  error: CSSProperties;
};

const styles: LoginStyles = {
  page: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  title: {
    margin: "0 0 4px",
  },
  subtitle: {
    margin: "0 0 16px",
    color: "var(--muted)",
    fontSize: "0.9rem",
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: 600,
    marginTop: 8,
  },
  input: {
    padding: "10px 12px",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius)",
    fontSize: "1rem",
  },
  button: (disabled) => ({
    marginTop: 20,
    padding: 12,
    border: "none",
    borderRadius: "var(--radius)",
    background: "var(--teal)",
    color: "#fff",
    fontWeight: 600,
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.6 : 1,
  }),
  error: {
    color: "var(--coral)",
    fontSize: "0.85rem",
    margin: "4px 0 0",
  },
};

function Login(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Sign in</h1>
        <p style={styles.subtitle}>
          Access your saved routes and reports.
        </p>

        <label htmlFor="email" style={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" style={styles.label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={styles.error}>{error}</p>}

        <button
          type="submit"
          style={styles.button(submitting)}
          disabled={submitting}
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </section>
  );
}

export default Login;
