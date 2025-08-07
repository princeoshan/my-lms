import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import GroupSidebar from '../components/GroupSidebar';
import NavBar from '../components/NavBar';
import { getGroupById } from '../utils/storage';

// Layout wrapper for group-specific pages. Provides sidebar and passes group data via Outlet context.
export default function GroupLayout() {
  const { groupId } = useParams();
  const group = getGroupById(groupId);
  if (!group) {
    return <p className="p-4">Group not found.</p>;
  }
  return (
    <div className="flex h-screen">
      <GroupSidebar />
      <div className="flex flex-col flex-1">
        {/* Reuse NavBar for top navigation */}
        <NavBar />
        <main className="p-4 overflow-auto">
          {/* Pass group object as context to nested routes */}
          <Outlet context={{ group }} />
        </main>
      </div>
    </div>
  );
}