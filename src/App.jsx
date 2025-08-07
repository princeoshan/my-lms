import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import { getUser } from './utils/storage';

export default function App() {
  const user = getUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <NavBar />
        <main className="p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}