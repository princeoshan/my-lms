import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../utils/storage';

export default function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };
  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">My LMS</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
      >
        Logout
      </button>
    </nav>
  );
}