// src/components/Sidebar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../useAuthStore';

const Sidebar: React.FC = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // redirect to login after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Services</li>
          <li>Users</li>
          {/* other menu items */}
        </ul>
      </nav>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;