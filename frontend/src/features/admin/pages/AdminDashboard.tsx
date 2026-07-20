// src/pages/AdminDashboard.tsx
//Service-Finder\frontend\src\features\auth\hooks\useAuth.ts
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import * as authService from '../../auth/hooks/authService';

export default function AdminDashboard() {
  const { user, logout } = useAuth() ;
  const [suggestions, setSuggestions] = useState<authService.ServiceSuggestion[]>([]);

  useEffect(() => {
    setSuggestions(authService.getSuggestions());
  }, []);

  function handleAction(id: string, action: 'approved' | 'rejected') {
    const updated = authService.updateSuggestionStatus(id, action);
    setSuggestions(updated);
  }

  return (
    <div style={{ padding: '32px', fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Panel */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', color: '#0f172a', fontWeight: 700 }}>Admin Workspace</h1>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>Logged in as: <strong>{user?.email}</strong></p>
        </div>
        <button 
          onClick={logout} 
          style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
        >
          Secure Terminate Session
        </button>
      </div>

      {/* KPI Highlight metrics */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <div style={{ flex: 1, padding: '20px', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
          <span style={{ fontSize: '13px', color: '#1e40af', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Total Suggestions Received</span>
          <strong style={{ fontSize: '24px', color: '#1d4ed8' }}>{suggestions.length} Locations</strong>
        </div>
        <div style={{ flex: 1, padding: '20px', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
          <span style={{ fontSize: '13px', color: '#92400e', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Pending Evaluation</span>
          <strong style={{ fontSize: '24px', color: '#d97706' }}>{suggestions.filter(s => s.status === 'pending').length} Actions Required</strong>
        </div>
      </div>

      {/* Main Table Interface */}
      <h2 style={{ fontSize: '20px', color: '#1e293b', marginBottom: '16px' }}>Public Service Placement Pipeline</h2>
      <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '14px 16px' }}>Service Name</th>
              <th style={{ padding: '14px 16px' }}>Category</th>
              <th style={{ padding: '14px 16px' }}>Address Specification</th>
              <th style={{ padding: '14px 16px' }}>User Attribution</th>
              <th style={{ padding: '14px 16px' }}>Status</th>
              <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions Evaluation</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#334155' }}>
                <td style={{ padding: '16px', fontWeight: 600, color: '#0f172a' }}>{item.name}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', background: '#f1f5f9', textTransform: 'uppercase' }}>
                    {item.type}
                  </span>
                </td>
                <td style={{ padding: '16px', color: '#64748b' }}>{item.address}</td>
                <td style={{ padding: '16px', fontSize: '13px' }}>{item.submittedBy}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600',
                    background: item.status === 'approved' ? '#dcfce7' : item.status === 'rejected' ? '#fee2e2' : '#fef3c7',
                    color: item.status === 'approved' ? '#15803d' : item.status === 'rejected' ? '#b91c1c' : '#b45309'
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  {item.status === 'pending' ? (
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleAction(item.id, 'approved')}
                        style={{ padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleAction(item.id, 'rejected')}
                        style={{ padding: '6px 12px', background: '#64748b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>Archived</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}