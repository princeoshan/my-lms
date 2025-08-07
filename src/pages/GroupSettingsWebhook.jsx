import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { updateGroupById } from '../utils/storage';

// Settings page: Webhook configuration. Allows setting webhook URL and shows group ID.
export default function GroupSettingsWebhook() {
  const { group } = useOutletContext();
  const initialUrl = group.settings?.webhookUrl || '';
  const [webhookUrl, setWebhookUrl] = useState(initialUrl);
  const [message, setMessage] = useState('');
  const handleSave = () => {
    updateGroupById(group.id, (g) => {
      return { ...g, settings: { ...(g.settings || {}), webhookUrl } };
    });
    setMessage('Webhook updated successfully');
  };
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setMessage('Copied to clipboard');
    });
  };
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Webhook Configuration</h3>
      {message && <p className="text-green-600">{message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded bg-white shadow">
          <label className="block mb-1 font-semibold">Webhook URL</label>
          <div className="flex space-x-2 items-center">
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={() => handleCopy(webhookUrl)}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Copy
            </button>
          </div>
          <button
            onClick={handleSave}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
        <div className="p-4 border rounded bg-white shadow">
          <label className="block mb-1 font-semibold">Group ID</label>
          <div className="flex space-x-2 items-center">
            <input
              type="text"
              value={group.id}
              readOnly
              className="flex-1 p-2 border rounded bg-gray-100"
            />
            <button
              onClick={() => handleCopy(String(group.id))}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}