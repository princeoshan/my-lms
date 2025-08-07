import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { getProgress, setProgress } from '../utils/storage';

// Page to view a single content item within a module. Shows video and description, and allows marking as done.
export default function GroupContentView() {
  const { group, course, progress, setProgressState } = useOutletContext();
  const { moduleIndex, contentIndex, courseId } = useParams();
  const moduleIdx = Number(moduleIndex);
  const contentIdx = Number(contentIndex);
  const mod = course.modules[moduleIdx];
  const contentItem = mod.contents[contentIdx];
  // Compute global index within progress array for this content
  let globalIndex = 0;
  for (let i = 0; i < course.modules.length; i++) {
    if (i < moduleIdx) globalIndex += course.modules[i].contents.length;
  }
  globalIndex += contentIdx;
  const [done, setDone] = useState(progress[globalIndex] || false);
  useEffect(() => {
    setDone(progress[globalIndex] || false);
  }, [progress, globalIndex]);
  const handleToggle = () => {
    const updated = [...progress];
    updated[globalIndex] = !done;
    setProgressState(updated);
    const allProgress = getProgress();
    allProgress[courseId] = updated;
    setProgress(allProgress);
    setDone(!done);
  };
  // Convert YouTube URL to embed URL if needed
  const parseEmbedUrl = (url) => {
    try {
      const u = new URL(url);
      if (u.hostname.includes('youtube.com') && u.searchParams.get('v')) {
        const id = u.searchParams.get('v');
        return `https://www.youtube.com/embed/${id}`;
      }
      if (u.hostname === 'youtu.be') {
        const id = u.pathname.substring(1);
        return `https://www.youtube.com/embed/${id}`;
      }
      return url;
    } catch (e) {
      return url;
    }
  };
  const embedUrl = parseEmbedUrl(contentItem.url);
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">{contentItem.title}</h3>
      <div className="aspect-w-16 aspect-h-9 max-h-96">
        {/* Video iframe */}
        <iframe
          title={contentItem.title}
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-60 md:h-80"
        ></iframe>
      </div>
      {contentItem.description && (
        <p className="whitespace-pre-wrap text-sm text-gray-700">{contentItem.description}</p>
      )}
      <label className="inline-flex items-center space-x-2 text-sm">
        <input type="checkbox" checked={done} onChange={handleToggle} />
        <span>Mark as done</span>
      </label>
    </div>
  );
}