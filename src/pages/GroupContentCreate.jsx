import React, { useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { updateGroupById } from '../utils/storage';

// Page for adding content (e.g., video) to a module within a course.
export default function GroupContentCreate() {
  const { group } = useOutletContext();
  const { courseId, moduleIndex } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      setError('Title and YouTube URL are required');
      return;
    }
    updateGroupById(group.id, (g) => {
      const updatedCourses = g.courses.map((course) => {
        if (String(course.id) === String(courseId)) {
          const modules = course.modules || [];
          const idx = Number(moduleIndex);
          if (!modules[idx]) return course;
          const updatedModule = {
            ...modules[idx],
            contents: [
              ...modules[idx].contents,
              {
                title: title.trim(),
                url: url.trim(),
                description: description.trim(),
                type: 'video',
              },
            ],
          };
          const newModules = modules.map((m, i) => (i === idx ? updatedModule : m));
          return { ...course, modules: newModules };
        }
        return course;
      });
      return { ...g, courses: updatedCourses };
    });
    navigate(`/groups/${group.id}/classroom/course/${courseId}`);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Content</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600">{error}</p>}
        <div>
          <label className="block mb-1 font-semibold">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">YouTube Video URL:</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save
        </button>
      </form>
    </div>
  );
}