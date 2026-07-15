// src/components/LogoutButton.tsx
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      // Optional: show error toast
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
    >
      <span>🚪</span>
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;