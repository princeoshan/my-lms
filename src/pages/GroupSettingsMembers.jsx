import React from 'react';
import { useOutletContext } from 'react-router-dom';

// Settings page: Members list. Displays group members.
export default function GroupSettingsMembers() {
  const { group } = useOutletContext();
  const members = group.members || [];
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Group Members</h3>
      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Email</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {members.map((m, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 text-sm text-gray-700">{m}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {m === group.ownerEmail ? 'Owner' : 'Member'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}