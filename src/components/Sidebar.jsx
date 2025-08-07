import React from 'react';
import { Link } from 'react-router-dom';

// Main sidebar navigation for the application outside of group context.
export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <ul className="space-y-2">
        <li>
          <Link to="/" className="block p-2 hover:bg-gray-200 rounded">
            Home
          </Link>
        </li>
        <li>
          <Link to="/groups" className="block p-2 hover:bg-gray-200 rounded">
            Groups
          </Link>
        </li>
      </ul>
    </aside>
  );
}