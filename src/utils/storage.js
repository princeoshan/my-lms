// Utility functions for interacting with localStorage.

const STORAGE_KEYS = {
  courses: 'lms_courses',
  progress: 'lms_progress',
  comments: 'lms_comments',
  user: 'lms_user',
  groups: 'lms_groups',
};

export function getCourses() {
  const data = localStorage.getItem(STORAGE_KEYS.courses);
  return data ? JSON.parse(data) : null;
}

export function setCourses(courses) {
  localStorage.setItem(STORAGE_KEYS.courses, JSON.stringify(courses));
}

export function getProgress() {
  const data = localStorage.getItem(STORAGE_KEYS.progress);
  return data ? JSON.parse(data) : {};
}

export function setProgress(progress) {
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));
}

export function getComments() {
  const data = localStorage.getItem(STORAGE_KEYS.comments);
  return data ? JSON.parse(data) : {};
}

export function setComments(comments) {
  localStorage.setItem(STORAGE_KEYS.comments, JSON.stringify(comments));
}

export function getUser() {
  const data = localStorage.getItem(STORAGE_KEYS.user);
  return data ? JSON.parse(data) : null;
}

export function setUser(user) {
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
}

// Group storage functions

export function getGroups() {
  const data = localStorage.getItem(STORAGE_KEYS.groups);
  return data ? JSON.parse(data) : [];
}

export function setGroups(groups) {
  localStorage.setItem(STORAGE_KEYS.groups, JSON.stringify(groups));
}

// Retrieve a single group by id
export function getGroupById(id) {
  const groups = getGroups();
  return groups.find((g) => String(g.id) === String(id));
}

// Update a single group by id. Accepts a callback that receives the current group and returns the updated group.
export function updateGroupById(id, updateFn) {
  const groups = getGroups();
  const index = groups.findIndex((g) => String(g.id) === String(id));
  if (index === -1) return;
  const updated = updateFn(groups[index]);
  groups[index] = updated;
  setGroups(groups);
}

// Plan limits definition. These values control maximum resources allowed per plan.
export const PLAN_LIMITS = {
  free: {
    groups: 2,
    coursesPerGroup: 1,
    modulesPerCourse: Infinity,
    videosPerCourse: 20,
  },
  premiumMonthly: {
    groups: Infinity,
    coursesPerGroup: Infinity,
    modulesPerCourse: Infinity,
    videosPerCourse: Infinity,
  },
  premiumYearly: {
    groups: Infinity,
    coursesPerGroup: Infinity,
    modulesPerCourse: Infinity,
    videosPerCourse: Infinity,
  },
};