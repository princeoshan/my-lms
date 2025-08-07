import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams, Link, Outlet } from 'react-router-dom';
import { getUser, getProgress, setProgress, PLAN_LIMITS, updateGroupById } from '../utils/storage';

// Page to view and manage a course within a group. Shows modules, progress, and allows adding modules/contents.
export default function GroupCourse() {
  const { group } = useOutletContext();
  const { courseId } = useParams();
  const user = getUser();
  const navigate = useNavigate();
  const course = (group.courses || []).find((c) => String(c.id) === String(courseId));
  const [progress, setProgressState] = useState([]);
  useEffect(() => {
    if (course) {
      const progMap = getProgress();
      setProgressState(progMap[courseId] || []);
    }
  }, [courseId, course]);
  if (!course) {
    return <p>Course not found.</p>;
  }
  // Compute progress percentage: count total number of contents across modules
  const totalContents = course.modules?.reduce((acc, m) => acc + (m.contents?.length || 0), 0) || 0;
  const completed = progress.filter((p) => p).length;
  const percentage = totalContents > 0 ? Math.round((completed / totalContents) * 100) : 0;
  const canAddModule = group.ownerEmail === (user ? user.email : '');
  const handleAddModule = () => {
    const maxModules = PLAN_LIMITS[user?.plan || 'free']?.modulesPerCourse ?? Infinity;
    if (maxModules !== Infinity && course.modules && course.modules.length >= maxModules) {
      alert('Module limit reached for this course in your plan.');
      return;
    }
    navigate(`/groups/${group.id}/classroom/course/${course.id}/module/new`);
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold mb-2 md:mb-0">{course.name}</h2>
        <div className="text-sm text-gray-600">{percentage}% Complete</div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Modules list */}
        <div className="md:w-64 mb-4 md:mb-0">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-bold">Modules</h3>
            {canAddModule && (
              <button
                onClick={handleAddModule}
                className="text-blue-600 text-sm hover:underline"
              >
                + Add Module
              </button>
            )}
          </div>
          {(!course.modules || course.modules.length === 0) && <p className="text-sm text-gray-500">No modules yet.</p>}
          <ul className="space-y-2">
            {course.modules &&
              course.modules.map((module, mIndex) => (
                <li key={mIndex} className="border rounded p-2 bg-white shadow">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{module.name}</div>
                    {group.ownerEmail === (user ? user.email : '') && (
                      <Link
                        to={`/groups/${group.id}/classroom/course/${course.id}/module/${mIndex}/content/new`}
                        className="text-blue-600 text-xs hover:underline"
                      >
                        + Add Content
                      </Link>
                    )}
                  </div>
                  {module.contents && module.contents.length > 0 && (
                    <ul className="mt-2 ml-4 space-y-1">
                      {module.contents.map((content, cIndex) => (
                        <li key={cIndex}>
                          <Link
                            to={`/groups/${group.id}/classroom/course/${course.id}/module/${mIndex}/content/${cIndex}`}
                            className="text-blue-600 hover:underline text-sm"
                          >
                            {content.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        </div>
        {/* Course description / content display will be handled by nested routes */}
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">Course Description</h3>
          <p className="mb-4 text-sm text-gray-600">
            {course.description || 'No description provided.'}
          </p>
          <Outlet context={{ group, course, progress, setProgressState }} />
        </div>
      </div>
    </div>
  );
}