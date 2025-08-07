import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

// Contact support page for a group. Allows sending a message to support.
export default function GroupContact() {
  const { group } = useOutletContext();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    // Simulate sending message
    setSubmitted(true);
    setSubject('');
    setMessage('');
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contact Us</h2>
      {submitted && <p className="text-green-600">Your message has been sent! We'll get back to you soon.</p>}
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white shadow">
            <h3 className="text-lg font-bold mb-2">Send us a Message</h3>
            <div>
              <label className="block mb-1 font-semibold">Subject *</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Message *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded"
                rows={5}
                required
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Send Message
            </button>
          </form>
        </div>
        <div className="md:w-64 mt-6 md:mt-0 space-y-4">
          <div className="p-4 border rounded bg-white shadow">
            <h4 className="text-lg font-bold mb-2">Get in Touch</h4>
            <p className="text-sm mb-1"><strong>Response Time:</strong> Usually within 24 hours</p>
            <p className="text-sm mb-1"><strong>Support Hours:</strong> Monday - Friday 9:00 AM - 6:00 PM</p>
            <p className="text-sm mb-1"><strong>Languages:</strong> English, Hindi</p>
          </div>
          <div className="p-4 border rounded bg-white shadow">
            <h4 className="text-lg font-bold mb-2">Common Topics</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Account Issues</li>
              <li>Billing Questions</li>
              <li>Technical Issues</li>
              <li>Course Content</li>
              <li>Feature Requests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}