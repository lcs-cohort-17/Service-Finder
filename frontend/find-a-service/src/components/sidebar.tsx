// src/components/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton'; // your existing logout component

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/users', label: 'Users', icon: '👥' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
    // add more as needed
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 shadow-lg">
      {/* Logo / Brand */}
      <div className="text-2xl font-bold mb-8 text-center border-b border-gray-700 pb-4">
        Admin Panel
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button at the bottom */}
      <div className="border-t border-gray-700 pt-4 mt-auto">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;