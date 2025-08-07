import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getUser, PLAN_LIMITS, updateGroupById } from '../utils/storage';

// Page for creating a new course within a group.
export default function GroupCourseCreate() {
  const { group } = useOutletContext();
  const navigate = useNavigate();
  const user = getUser();
  const [name, setName] = useState('');
  const [level, setLevel] = useState('1');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');

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
      setError('Course name is required');
      return;
    }
    // Check plan limit again
    const plan = user?.plan || 'free';
    const maxCourses = PLAN_LIMITS[plan]?.coursesPerGroup ?? 0;
    const currentCount = group.courses ? group.courses.length : 0;
    if (maxCourses && currentCount >= maxCourses) {
      setError('You have reached the maximum number of courses allowed in this group for your plan. Please upgrade.');
      return;
    }
    let imageData = null;
    if (imageFile) {
      imageData = await fileToDataUrl(imageFile);
    }
    const newCourse = {
      id: Date.now(),
      name: name.trim(),
      level: Number(level),
      description: description.trim(),
      mainImage: imageData,
      modules: [],
      progress: 0,
    };
    updateGroupById(group.id, (g) => {
      return { ...g, courses: [...(g.courses || []), newCourse] };
    });
    navigate(`/groups/${group.id}/classroom`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create Course</h2>
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
          <label className="block mb-1 font-semibold">Course Level (1-9):</label>
          <input
            type="number"
            min="1"
            max="9"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-2 border rounded"
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
        <div>
          <label className="block mb-1 font-semibold">Main image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save
        </button>
      </form>
    </div>
  );
}