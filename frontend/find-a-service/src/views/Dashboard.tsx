// src/views/Dashboard.tsx
import React from 'react';
import Sidebar from '../components/sidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <h1>Welcome, Admin</h1>
        <p>This is your dashboard. You can manage services, users, etc.</p>
        {/* Add your dashboard widgets here */}
      </main>
    </div>
  );
};

export default Dashboard;