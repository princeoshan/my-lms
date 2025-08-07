import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses, getProgress, getUser } from '../utils/storage';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [user, setUser] = useState(null);
  useEffect(() => {
    setCourses(getCourses() || []);
    setProgressMap(getProgress() || {});
    setUser(getUser());
  }, []);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Welcome to your dashboard!</h2>
      {user && <p className="mb-4">Logged in as {user.email} ({user.role})</p>}
      {courses.length === 0 ? (
        <p>No courses available. {user && user.role !== 'student' && 'Add some in the Courses page.'}</p>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => {
            const progress = progressMap[course.id] || [];
            const percent =
              course.content && course.content.length > 0
                ? Math.round((progress.filter((p) => p).length / course.content.length) * 100)
                : 0;
            return (
              <div key={course.id} className="border p-4 rounded flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <p className="text-sm text-gray-600">{percent}% complete</p>
                </div>
                <Link to={`/courses/${course.id}`} className="text-blue-600 hover:underline">
                  View
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}