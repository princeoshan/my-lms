import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getCourses,
  getProgress,
  setProgress,
  getComments,
  setComments,
  getUser,
} from '../utils/storage';

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgressState] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [comments, setCommentsState] = useState([]);
  const user = getUser();
  useEffect(() => {
    // Load course from localStorage
    const courses = getCourses() || [];
    const found = courses.find((c) => String(c.id) === String(id));
    if (found) {
      setCourse(found);
      // Load progress for this course
      const prog = getProgress();
      setProgressState(prog[id] || new Array(found.content.length).fill(false));
      // Load comments
      const comm = getComments();
      setCommentsState(comm[id] || []);
    }
  }, [id]);
  if (!course) {
    return <p>Course not found.</p>;
  }
  const handleCheckboxChange = (index) => {
    const updated = [...progress];
    updated[index] = !updated[index];
    setProgressState(updated);
    const allProgress = getProgress();
    allProgress[id] = updated;
    setProgress(allProgress);
  };
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      user: user ? user.email : 'Anonymous',
      text: commentText.trim(),
      timestamp: new Date().toISOString(),
    };
    const updated = [...comments, newComment];
    setCommentsState(updated);
    const allComments = getComments();
    allComments[id] = updated;
    setComments(allComments);
    setCommentText('');
  };
  const progressPercentage =
    course.content.length > 0
      ? Math.round(
          (progress.filter((p) => p).length / course.content.length) * 100,
        )
      : 0;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">{course.title}</h2>
        <p className="mb-4">{course.description}</p>
        <p className="mb-2">Progress: {progressPercentage}%</p>
        <ul className="pl-6 space-y-2">
          {course.content.map((topic, index) => (
            <li key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={progress[index] || false}
                onChange={() => handleCheckboxChange(index)}
              />
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Comments</h3>
        <form onSubmit={handleAddComment} className="mb-4 space-y-2">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={2}
          />
          <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
            Post
          </button>
        </form>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul className="space-y-2">
            {comments.map((comment, idx) => (
              <li key={idx} className="border p-2 rounded">
                <p className="text-sm text-gray-600">
                  {comment.user} • {new Date(comment.timestamp).toLocaleString()}
                </p>
                  <p>{comment.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}