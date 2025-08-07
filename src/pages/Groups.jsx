import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getGroups, setGroups, getUser, PLAN_LIMITS } from '../utils/storage';

// Page that lists all groups belonging to the logged in user. Also allows creating new groups.
export default function Groups() {
  const navigate = useNavigate();
  const [groups, setGroupState] = useState([]);
  const [planLimit, setPlanLimit] = useState(0);
  const [planName, setPlanName] = useState('free');
  useEffect(() => {
    const user = getUser();
    const allGroups = getGroups();
    setGroupState(allGroups.filter((g) => g.ownerEmail === (user ? user.email : '')));
    const plan = user?.plan || 'free';
    setPlanName(plan);
    setPlanLimit(PLAN_LIMITS[plan]?.groups ?? 0);
  }, []);
  const handleCreateGroup = () => {
    if (planLimit && groups.length >= planLimit) {
      // Show limit reached message
      alert('You have reached the maximum number of groups allowed in your plan. Please upgrade to create more.');
      return;
    }
    navigate('/groups/new');
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Groups</h2>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex-1 p-4 border rounded bg-white shadow">
          <p className="font-semibold">Plan: {planName.charAt(0).toUpperCase() + planName.slice(1)}</p>
          <p className="text-sm text-gray-600">Groups created: {groups.length}{planLimit && planLimit !== Infinity ? ` / ${planLimit}` : ''}</p>
        </div>
        <button
          onClick={handleCreateGroup}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
        >
          Create Group
        </button>
      </div>
      {groups.length === 0 ? (
        <p>No groups found. Click "Create Group" to start.</p>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="border rounded p-4 bg-white shadow flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="text-lg font-bold mb-1">{group.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {group.description ? group.description.substring(0, 100) + (group.description.length > 100 ? '…' : '') : 'No description'}
                </p>
                <p className="text-xs text-gray-500">Owner: {group.ownerEmail}</p>
              </div>
              <div className="mt-2 md:mt-0 flex space-x-2">
                <Link
                  to={`/groups/${group.id}/community`}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Enter
                </Link>
                <Link
                  to={`/groups/${group.id}/settings/general`}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}