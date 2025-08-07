import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { updateGroupById } from '../utils/storage';

// Settings page: General group settings. Allows editing name, description, icon and cover images.
export default function GroupSettingsGeneral() {
  const { group } = useOutletContext();
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description || '');
  const [iconFile, setIconFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [message, setMessage] = useState('');
  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updates = { name: name.trim(), description: description.trim() };
    if (iconFile) {
      updates.icon = await fileToDataUrl(iconFile);
    }
    if (coverFile) {
      updates.cover = await fileToDataUrl(coverFile);
    }
    updateGroupById(group.id, (g) => ({ ...g, ...updates }));
    setMessage('Group updated successfully');
  };
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">General Settings</h3>
      {message && <p className="text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white shadow max-w-lg">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Icon image</label>
          {group.icon && (
            <img src={group.icon} alt="icon" className="w-16 h-16 mb-2 object-cover rounded" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setIconFile(e.target.files[0])}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Cover image</label>
          {group.cover && (
            <img src={group.cover} alt="cover" className="w-full h-32 mb-2 object-cover rounded" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files[0])}
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Update Group
        </button>
      </form>
    </div>
  );
}