import React, { useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { updateGroupById } from '../utils/storage';

// Page for creating a new module within a course.
export default function GroupModuleCreate() {
  const { group } = useOutletContext();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Module name is required');
      return;
    }
    updateGroupById(group.id, (g) => {
      const updatedCourses = g.courses.map((course) => {
        if (String(course.id) === String(courseId)) {
          return {
            ...course,
            modules: [...(course.modules || []), { name: name.trim(), contents: [] }],
          };
        }
        return course;
      });
      return { ...g, courses: updatedCourses };
    });
    navigate(`/groups/${group.id}/classroom/course/${courseId}`);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Module</h2>
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
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save
        </button>
      </form>
    </div>
  );
}