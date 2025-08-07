import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

// Sidebar navigation for a specific group. Provides links to group sections.
export default function GroupSidebar() {
  const { groupId } = useParams();
  // Helper for active styles
  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded mb-2 ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`;
  return (
    <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
      <nav className="space-y-2">
        <NavLink to={`/groups/${groupId}/community`} className={linkClasses} end>
          Community
        </NavLink>
        <NavLink to={`/groups/${groupId}/classroom`} className={linkClasses}>
          Classroom
        </NavLink>
        <NavLink to={`/groups/${groupId}/leaderboard`} className={linkClasses}>
          Leaderboards
        </NavLink>
        <NavLink to={`/groups/${groupId}/calendar`} className={linkClasses}>
          Calendar
        </NavLink>
        <NavLink to={`/groups/${groupId}/board`} className={linkClasses}>
          Board
        </NavLink>
        {/* Support section dropdown
        We could implement nested route for support. For now, direct link to contact. */}
        <NavLink to={`/groups/${groupId}/support/contact`} className={linkClasses}>
          Contact Us
        </NavLink>
        <NavLink to={`/groups/${groupId}/settings/general`} className={linkClasses}>
          Settings
        </NavLink>
        <NavLink to={`/groups/${groupId}/upgrade`} className={linkClasses}>
          Upgrade
        </NavLink>
      </nav>
    </aside>
  );
}