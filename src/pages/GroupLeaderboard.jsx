import React from 'react';
import { useOutletContext } from 'react-router-dom';

// Leaderboard page for a group. Displays simple progress and level distribution.
export default function GroupLeaderboard() {
  const { group } = useOutletContext();
  // In a real app, this would derive from activity data. Here we show static placeholders.
  const levels = [
    { level: 1, name: 'Noob', count: 99 },
    { level: 2, name: 'Contributor', count: 0 },
    { level: 3, name: 'Builder', count: 0 },
    { level: 4, name: 'Craftsperson', count: 0 },
    { level: 5, name: 'Architect', count: 0 },
    { level: 6, name: 'Grandmaster', count: 0 },
    { level: 7, name: 'Goat', count: 0 },
    { level: 8, name: 'Wizard', count: 0 },
    { level: 9, name: 'God', count: 0 },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Leaderboard</h2>
      <div className="p-4 border rounded bg-white shadow">
        <h3 className="text-lg font-bold mb-2">Progress to Next Level</h3>
        <p className="text-sm text-gray-600 mb-4">No activity yet. Earn points by engaging with your group.</p>
      </div>
      <div className="p-4 border rounded bg-white shadow">
        <h3 className="text-lg font-bold mb-4">Level Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {levels.map((lvl) => (
            <div key={lvl.level} className="border rounded p-3 text-center bg-gray-50">
              <span className="text-xl font-bold block mb-1">{lvl.level}</span>
              <span className="text-sm text-gray-600 block mb-1">Level {lvl.level} - {lvl.name}</span>
              <span className="text-xs text-gray-500">{lvl.count}% of members</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}