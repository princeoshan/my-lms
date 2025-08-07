import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getUser, setUser } from '../utils/storage';

// Upgrade page to choose subscription plan. Displays plan options and allows upgrading.
export default function GroupUpgrade() {
  const { group } = useOutletContext();
  const user = getUser();
  const [message, setMessage] = useState('');
  const handleUpgrade = (plan) => {
    if (user.plan === plan) return;
    // Simulate payment success and upgrade
    setUser({ ...user, plan });
    setMessage(`Upgraded to ${plan === 'premiumMonthly' ? 'Monthly Premium' : 'Yearly Premium'} plan successfully!`);
  };
  const FeatureRow = ({ feature, free, monthly, yearly }) => (
    <tr className="border-t">
      <td className="px-4 py-2 text-sm">{feature}</td>
      <td className="px-4 py-2 text-sm text-center">{free ? '✔️' : '—'}</td>
      <td className="px-4 py-2 text-sm text-center">{monthly ? '✔️' : '—'}</td>
      <td className="px-4 py-2 text-sm text-center">{yearly ? '✔️' : '—'}</td>
    </tr>
  );
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Choose Your Perfect Plan</h2>
      {message && <p className="text-green-600">{message}</p>}
      <p className="text-sm text-gray-600">Unlock unlimited learning potential with our premium features</p>
      <div className="text-sm mb-4">
        Your Current Plan: <span className="font-semibold capitalize">{user.plan}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Free Plan */}
        <div className="border rounded bg-white shadow p-4 flex flex-col">
          <h3 className="text-lg font-bold mb-1 text-center">Free Plan</h3>
          <p className="text-center text-2xl font-extrabold mb-2">FREE</p>
          <p className="text-sm text-center mb-4">Forever</p>
          <ul className="text-sm flex-1 space-y-1 mb-4">
            <li>Up to 2 Groups</li>
            <li>1 Course per Group</li>
            <li>20 Videos per Course</li>
            <li>50 Invitations</li>
            <li>Calendar Events Access</li>
            <li>Boards & Listings</li>
          </ul>
          <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded" disabled>
            Current Plan
          </button>
        </div>
        {/* Monthly Premium */}
        <div className="border rounded bg-white shadow p-4 flex flex-col">
          <h3 className="text-lg font-bold mb-1 text-center">Monthly Premium</h3>
          <p className="text-center text-2xl font-extrabold mb-2">₹299</p>
          <p className="text-sm text-center mb-4">+18% GST per month</p>
          <ul className="text-sm flex-1 space-y-1 mb-4">
            <li>Unlimited Groups</li>
            <li>Unlimited Courses per Group</li>
            <li>Unlimited Video Uploads</li>
            <li>Unlimited Invitations</li>
            <li>Calendar Events Access</li>
            <li>Boards & Listings</li>
            <li>Priority Support</li>
          </ul>
          <button
            onClick={() => handleUpgrade('premiumMonthly')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {user.plan === 'premiumMonthly' ? 'Current Plan' : 'Choose Monthly'}
          </button>
        </div>
        {/* Yearly Premium */}
        <div className="border rounded bg-white shadow p-4 flex flex-col relative">
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Recommended</div>
          <h3 className="text-lg font-bold mb-1 text-center">Yearly Premium</h3>
          <p className="text-center text-2xl font-extrabold mb-2">₹2999</p>
          <p className="text-sm text-center mb-4">+18% GST per year</p>
          <ul className="text-sm flex-1 space-y-1 mb-4">
            <li>Unlimited Groups</li>
            <li>Unlimited Courses per Group</li>
            <li>Unlimited Video Uploads</li>
            <li>Unlimited Invitations</li>
            <li>Calendar Events Access</li>
            <li>Boards & Listings</li>
            <li>Priority Support</li>
          </ul>
          <button
            onClick={() => handleUpgrade('premiumYearly')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {user.plan === 'premiumYearly' ? 'Current Plan' : 'Choose Yearly'}
          </button>
        </div>
      </div>
      {/* Feature comparison table */}
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Features</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Free Plan</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Monthly Premium</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Yearly Premium</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <FeatureRow feature="Groups" free="2" monthly="Unlimited" yearly="Unlimited" />
            <FeatureRow feature="Courses per Group" free="1" monthly="Unlimited" yearly="Unlimited" />
            <FeatureRow feature="Video Uploads" free="20" monthly="Unlimited" yearly="Unlimited" />
            <FeatureRow feature="Invitations" free="50" monthly="Unlimited" yearly="Unlimited" />
            <FeatureRow feature="Calendar Access" free={true} monthly={true} yearly={true} />
            <FeatureRow feature="Boards & Listings" free={true} monthly={true} yearly={true} />
            <FeatureRow feature="Priority Support" free={false} monthly={true} yearly={true} />
          </tbody>
        </table>
      </div>
    </div>
  );
}