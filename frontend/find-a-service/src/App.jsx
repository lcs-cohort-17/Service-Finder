import { useEffect, useState } from 'react'
import useAuthStore from './store/useAuthStore.tsx'
import Login from './views/Login.tsx'
import './App.css'

function isPageReload() {
  if (typeof window === 'undefined') return false

  const navigationEntry = window.performance.getEntriesByType('navigation')[0]
  return navigationEntry?.type === 'reload'
}

function App() {
  const { isAuthenticated, login, logout, token, user } = useAuthStore()
  const [booting, setBooting] = useState(() => isPageReload())
  const [sessionEnded, setSessionEnded] = useState(false)

  useEffect(() => {
    if (!booting) return undefined

    const timer = window.setTimeout(() => {
      setBooting(false)
    }, 2000)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!sessionEnded) return undefined

    const timer = window.setTimeout(() => {
      setSessionEnded(false)
    }, 2000)

    return () => window.clearTimeout(timer)
  }, [sessionEnded])

  async function handleLogout() {
    await logout()
    setSessionEnded(true)
  }

  if (booting) {
    return (
      <main className="app-shell refresh-shell" aria-live="polite">
        <section className="refresh-card">
          <div className="refresh-spinner" aria-hidden="true" />
          <p className="eyebrow">Refreshing</p>
          <h1>Restoring your session</h1>
          <p className="lede">Give us a moment while the page reloads and checks your login state.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="app-shell">
      {sessionEnded ? (
        <div className="session-toast" role="status" aria-live="polite">
          Session ended
        </div>
      ) : null}
      <section className="auth-card">
        <div className="hero-copy">
          <p className="eyebrow">AUTH-004 placeholder</p>
          <h1>Keep the user logged in after refresh</h1>
          <p className="lede">
            This mock page helps you verify that a saved session is restored when the app reloads
            and cleared when the user logs out.
          </p>
        </div>

        {isAuthenticated ? (
          <section className="session-panel" aria-label="Active session">
            <p className="status success">Session active</p>
            <dl className="session-grid">
              <div>
                <dt>Status</dt>
                <dd>Logged in</dd>
              </div>
              <div>
                <dt>User</dt>
                <dd>{user?.email ?? 'Mock user'}</dd>
              </div>
              <div className="token-row">
                <dt>Token</dt>
                <dd>{token ?? 'No token found'}</dd>
              </div>
            </dl>

            <div className="button-row">
              <button type="button" className="primary-button" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </section>
        ) : (
          <Login onLogin={login} />
        )}
      </section>
    </main>
  )
}

export default App
