import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../utils/storage';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const handleLogin = (e) => {
    e.preventDefault();
    // For demo purposes, navigate to dashboard without auth.
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    setUser({ email, role });
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white p-8 rounded shadow w-80" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input name="email" className="w-full p-2 border rounded" type="email" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input name="password" className="w-full p-2 border rounded" type="password" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Role</label>
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}