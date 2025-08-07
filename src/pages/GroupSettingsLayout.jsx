import React from 'react';
import { NavLink, Outlet, useParams, useOutletContext } from 'react-router-dom';

// Layout for group settings, provides tab navigation.
export default function GroupSettingsLayout() {
  const { group } = useOutletContext();
  const { groupId } = useParams();
  const linkClasses = ({ isActive }) =>
    `px-4 py-2 border-b-2 ${isActive ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-600 hover:text-blue-600'}`;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Group Settings</h2>
      <div className="flex space-x-4 mb-4 border-b">
        <NavLink to={`/groups/${groupId}/settings/invite`} className={linkClasses} end>
          Invite
        </NavLink>
        <NavLink to={`/groups/${groupId}/settings/general`} className={linkClasses}>
          General
        </NavLink>
        <NavLink to={`/groups/${groupId}/settings/members`} className={linkClasses}>
          Members
        </NavLink>
        <NavLink to={`/groups/${groupId}/settings/webhook`} className={linkClasses}>
          Webhook
        </NavLink>
      </div>
      <Outlet context={{ group }} />
    </div>
  );
}