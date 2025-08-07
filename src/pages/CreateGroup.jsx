import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGroups, setGroups, getUser, PLAN_LIMITS } from '../utils/storage';

// Page for creating a new group.
export default function CreateGroup() {
  const navigate = useNavigate();
  const user = getUser();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [iconFile, setIconFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [error, setError] = useState('');

  // Convert file to base64 string
  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Group name is required');
      return;
    }
    const groups = getGroups();
    const userGroups = groups.filter((g) => g.ownerEmail === (user ? user.email : ''));
    const plan = user?.plan || 'free';
    const maxGroups = PLAN_LIMITS[plan]?.groups ?? 0;
    if (maxGroups && userGroups.length >= maxGroups) {
      setError('You have reached the maximum number of groups allowed in your plan. Please upgrade.');
      return;
    }
    let iconData = null;
    let coverData = null;
    if (iconFile) {
      iconData = await fileToDataUrl(iconFile);
    }
    if (coverFile) {
      coverData = await fileToDataUrl(coverFile);
    }
    const newGroup = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      icon: iconData,
      cover: coverData,
      ownerEmail: user ? user.email : '',
      courses: [],
      posts: [],
      members: [user ? user.email : ''],
      settings: {},
    };
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    navigate(`/groups/${newGroup.id}/community`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create Group</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600">{error}</p>}
        <div>
          <label className="block mb-1 font-semibold">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1 mb-4 md:mb-0">
            <label className="block mb-1 font-semibold">Icon image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setIconFile(e.target.files[0])}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Cover image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files[0])}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}