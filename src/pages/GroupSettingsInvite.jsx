import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

// Settings page: Invite users to group. Allows inviting via email or CSV.
export default function GroupSettingsInvite() {
  const { group } = useOutletContext();
  const [email, setEmail] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setMessage(`Invitation sent to ${email}!`);
      setEmail('');
      setCsvFile(null);
    } else if (csvFile) {
      setMessage('Invitations sent to contacts in CSV file!');
      setCsvFile(null);
    } else {
      setMessage('Please enter an email or choose a CSV file.');
    }
  };
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Invite Users</h3>
      {message && <p className="text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white shadow max-w-lg">
        <p className="text-sm text-gray-600">
          Choose one invitation method: use either the email field for single invitations OR upload a CSV file for bulk
          invitations.
        </p>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter email address"
          />
        </div>
        <div className="flex items-center justify-center mb-2">
          <span className="text-sm font-semibold mx-2">OR</span>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Invite members from CSV file</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setCsvFile(e.target.files[0])}
            className="w-full"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Send Invite
        </button>
      </form>
    </div>
  );
}