// src/App.tsx

import React, { useState } from 'react';
import { AuthProvider } from '../src/features/auth/context/AuthContext';
import AdminLogin from '../src/features/auth/components/LoginForm';
import Routes from '../src/routes/routes';
import AdminDashboard from '../src/features/admin/pages/AdminDashboard';
import { useAuth } from "../src/features/auth/hooks/useAuth";

type ViewState = 'home' | 'login' | 'dashboard';

function MainAppLayout() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const { isAuthenticated, isAdmin, user } = useAuth();

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      {/* Top Navigation Bar */}
      <nav style={{ background: '#1e293b', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }} onClick={() => setCurrentView('home')}>
          📍 Public Service Finder Map
        </span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={() => setCurrentView('home')} style={navBtnStyle(currentView === 'home')}>Public App View</button>
          
          {isAuthenticated && isAdmin ? (
            <button onClick={() => setCurrentView('dashboard')} style={navBtnStyle(currentView === 'dashboard')}>Admin Dashboard</button>
          ) : (
            <button onClick={() => setCurrentView('login')} style={navBtnStyle(currentView === 'login')}>Admin Portal</button>
          )}
        </div>
      </nav>

      {/* State-Machine Router Implementation */}
      {currentView === 'home' && (
        <div style={{ padding: 40, maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ color: '#0f172a', marginBottom: '8px' }}>Interactive Services View</h1>
          <p style={{ color: '#475569', fontSize: '16px', marginBottom: '24px' }}>
            Phase 1 Maps component container workspace landing platform.
          </p>
          
          <div style={{ background: '#e2e8f0', borderRadius: '12px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #cbd5e1', color: '#64748b', fontWeight: '500', marginBottom: '24px' }}>
            🗺️ Interactive Maps Integration Placeholder (Google Maps Engine Canvas API)
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#1e293b' }}>Active Security Profile context:</h3>
            {isAuthenticated ? (
              <p style={{ margin: 0, color: '#059669' }}>
                🟢 Confirmed Session: <strong>{user?.email}</strong> (Privileges: <code>{user?.role}</code>)
              </p>
            ) : (
              <p style={{ margin: 0, color: '#dc2626' }}>
                🔴 No logged-in session detected. Access restricted to public layers.
              </p>
            )}
          </div>
        </div>
      )}

      {currentView === 'login' && (
        <AdminLogin onSuccess={() => setCurrentView('dashboard')} />
      )}

      {currentView === 'dashboard' && (
        <Routes>
          <AdminDashboard />
        </Routes>
      )}
    </div>
  );
}

// Inline styling helper for structural clarity
function navBtnStyle(isActive: boolean): React.CSSProperties {
  return {
    background: isActive ? '#3b82f6' : 'transparent',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'background 0.2s'
  };
}


export default function App() {
  return (
    <AuthProvider>
      <MainAppLayout />
    </AuthProvider>
  );
}
