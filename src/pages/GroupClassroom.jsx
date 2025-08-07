import React from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { getUser, PLAN_LIMITS } from '../utils/storage';

// Classroom page for a group. Lists courses and allows creating new ones.
export default function GroupClassroom() {
  const { group } = useOutletContext();
  const user = getUser();
  const navigate = useNavigate();
  const courses = group.courses || [];
  const plan = user?.plan || 'free';
  const maxCourses = PLAN_LIMITS[plan]?.coursesPerGroup ?? 0;
  const canCreate = group.ownerEmail === (user ? user.email : '') && (maxCourses === Infinity || courses.length < maxCourses);
  const handleCreate = () => {
    if (!canCreate) {
      alert('You have reached the maximum number of courses allowed in this group for your plan. Please upgrade.');
      return;
    }
    navigate(`/groups/${group.id}/classroom/new`);
  };
  return (
    <div>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <h2 className="text-2xl font-bold">Courses</h2>
        {canCreate && (
          <button
            onClick={handleCreate}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Create Course
          </button>
        )}
      </div>
      {courses.length === 0 ? (
        <div className="p-4 border rounded bg-white shadow text-center">
          <p className="mb-4">No courses available.</p>
          {canCreate && (
            <button
              onClick={handleCreate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Create Your First Course
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="border rounded bg-white shadow overflow-hidden">
              {course.mainImage && (
                <img src={course.mainImage} alt={course.name} className="w-full h-40 object-cover" />
              )}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold">{course.name}</h3>
                  {course.level && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      Level {course.level}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">Course Progress {course.progress || 0}%</p>
                <Link
                  to={`/groups/${group.id}/classroom/course/${course.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}