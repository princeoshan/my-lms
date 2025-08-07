import React from 'react';
import { useOutletContext } from 'react-router-dom';

// Board page for a group. Displays announcements or tasks.
export default function GroupBoard() {
  const { group } = useOutletContext();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Board</h2>
      <div className="p-4 border rounded bg-white shadow">
        <h3 className="text-lg font-bold mb-2">Announcement</h3>
        <p>Coming soon new updates</p>
      </div>
    </div>
  );
}