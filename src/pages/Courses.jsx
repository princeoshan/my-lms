import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import {
  getCourses,
  setCourses,
  getUser,
} from '../utils/storage';

const defaultCourses = [
  {
    id: 1,
    title: 'React Basics',
    description: 'Learn the fundamentals of React.',
    content: ['Introduction', 'Components', 'Props and State'],
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'Deep dive into JS features.',
    content: ['Closures', 'Asynchronous JS', 'ES6+'],
  },
];

export default function Courses() {
  const [courses, setCourseState] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const user = getUser();
  useEffect(() => {
    // Load courses from localStorage or use default
    const stored = getCourses();
    if (stored && stored.length > 0) {
      setCourseState(stored);
    } else {
      setCourseState(defaultCourses);
      setCourses(defaultCourses);
    }
  }, []);
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const topics = content
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const newCourse = {
      id: Date.now(),
      title,
      description,
      content: topics,
    };
    const updated = [...courses, newCourse];
    setCourseState(updated);
    setCourses(updated);
    setTitle('');
    setDescription('');
    setContent('');
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Courses</h2>
      {user && (user.role === 'instructor' || user.role === 'admin') && (
        <div className="mb-6 p-4 border rounded">
          <h3 className="text-lg font-bold mb-2">Add New Course</h3>
          <form onSubmit={handleAddCourse} className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
            <input
              type="text"
              placeholder="Content (comma separated topics)"
              className="w-full p-2 border rounded"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              Add Course
            </button>
          </form>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}