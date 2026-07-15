// src/components/AdminLayout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet /> {/* This is where dashboard or other pages render */}
      </main>
    </div>
  );
};

export default AdminLayout;