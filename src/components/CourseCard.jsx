import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  return (
    <div className="border rounded p-4 hover:shadow">
      <h3 className="text-lg font-bold mb-2">{course.title}</h3>
      <p className="mb-2">{course.description}</p>
      <Link to={`/courses/${course.id}`} className="text-blue-600 hover:underline">
        View Course
      </Link>
    </div>
  );
}