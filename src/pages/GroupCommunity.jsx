import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getUser, updateGroupById } from '../utils/storage';

// Community page inside a group. Displays posts and allows creating new posts.
export default function GroupCommunity() {
  const { group } = useOutletContext();
  const user = getUser();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handlePost = async (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) {
      setError('Please enter a title or content.');
      return;
    }
    let imageData = null;
    if (imageFile) {
      imageData = await fileToDataUrl(imageFile);
    }
    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      image: imageData,
      authorEmail: user ? user.email : 'Anonymous',
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };
    updateGroupById(group.id, (g) => {
      return { ...g, posts: [newPost, ...(g.posts || [])] };
    });
    // Clear form
    setTitle('');
    setContent('');
    setImageFile(null);
    setError('');
  };

  const posts = group.posts || [];

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      {/* Main feed */}
      <div className="flex-1">
        {/* Post creation form */}
        <form onSubmit={handlePost} className="mb-6 p-4 border rounded bg-white shadow space-y-3">
          <h3 className="text-lg font-bold">Create Post</h3>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Post
          </button>
        </form>
        {/* Posts list */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p>No posts yet. Start the conversation!</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="p-4 border rounded bg-white shadow">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-gray-300 mr-2" />
                  <div>
                    <p className="text-sm font-semibold">{post.authorEmail}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                {post.title && <h4 className="text-lg font-bold mb-1">{post.title}</h4>}
                {post.content && <p className="mb-2 whitespace-pre-wrap">{post.content}</p>}
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full max-h-80 object-cover rounded mb-2"
                  />
                )}
                {/* Like & comment placeholder */}
                <div className="text-xs text-gray-500">❤️ {post.likes} • 💬 {post.comments.length}</div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Sidebar info */}
      <div className="w-full md:w-64 space-y-4">
        <div className="p-4 border rounded bg-white shadow">
          <h4 className="text-lg font-bold mb-2">{group.name}</h4>
          <p className="text-sm mb-2">{group.description || 'No description provided'}</p>
          {/* Show owner and members info */}
          <p className="text-xs text-gray-500 mb-1">Owner: {group.ownerEmail}</p>
          <p className="text-xs text-gray-500">Members: {group.members ? group.members.length : 1}</p>
        </div>
        {/* Placeholder for top leaders */}
        <div className="p-4 border rounded bg-white shadow">
          <h4 className="text-lg font-bold mb-2">Top Leaders (7 days)</h4>
          <p className="text-sm text-gray-500">No activity yet</p>
        </div>
      </div>
    </div>
  );
}