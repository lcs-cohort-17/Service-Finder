import { useState, type FormEvent } from 'react'

type LoginPayload = {
  email: string
  password: string
}

type LoginProps = {
  onLogin: (payload: LoginPayload) => Promise<void> | void
}

const DEMO_EMAIL = 'tester@example.com'
const DEMO_PASSWORD = 'password123'

export default function Login({ onLogin }: LoginProps) {
  // Form fields stay empty until the user chooses to fill the demo data.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function fillDemoDetails() {
    // This helper only pre-fills the mock credentials for QA testing.
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)

    try {
      await onLogin({ email, password })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="login-card" onSubmit={handleSubmit}>
      <div className="login-header">
        <h2>Mock login</h2>
        <p>Use this to test whether auth state survives a browser refresh.</p>
      </div>

      {/* Email input used by the mock login flow. */}
      <label className="field">
        <span>Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          placeholder="you@example.com"
        />
      </label>

      {/* Password input used by the mock login flow. */}
      <label className="field">
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          placeholder="Enter password"
        />
      </label>

      {/* Submit button creates the mock session in the auth store. */}
      <button type="submit" className="primary-button" disabled={submitting}>
        {submitting ? 'Creating session...' : 'Create mock session'}
      </button>

      {/* Helper button that fills the demo credentials on demand. */}
      <button type="button" className="secondary-button" onClick={fillDemoDetails}>
        Fill login details
      </button>

      <p className="note">
        This is only a placeholder. It does not validate the password or call a backend yet.
      </p>
    </form>
  )
}
