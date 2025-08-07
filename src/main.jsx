import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import Login from './pages/Login';
import Groups from './pages/Groups';
import CreateGroup from './pages/CreateGroup';
import GroupLayout from './pages/GroupLayout';
import GroupCommunity from './pages/GroupCommunity';
import GroupClassroom from './pages/GroupClassroom';
import GroupCourseCreate from './pages/GroupCourseCreate';
import GroupCourse from './pages/GroupCourse';
import GroupModuleCreate from './pages/GroupModuleCreate';
import GroupContentCreate from './pages/GroupContentCreate';
import GroupContentView from './pages/GroupContentView';
import GroupLeaderboard from './pages/GroupLeaderboard';
import GroupCalendar from './pages/GroupCalendar';
import GroupBoard from './pages/GroupBoard';
import GroupContact from './pages/GroupContact';
import GroupSettingsLayout from './pages/GroupSettingsLayout';
import GroupSettingsInvite from './pages/GroupSettingsInvite';
import GroupSettingsGeneral from './pages/GroupSettingsGeneral';
import GroupSettingsMembers from './pages/GroupSettingsMembers';
import GroupSettingsWebhook from './pages/GroupSettingsWebhook';
import GroupUpgrade from './pages/GroupUpgrade';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />}>
          {/* Default landing page lists groups */}
          <Route index element={<Groups />} />
          <Route path="groups" element={<Groups />} />
          <Route path="groups/new" element={<CreateGroup />} />
          <Route path="groups/:groupId" element={<GroupLayout />}>
            <Route index element={<GroupCommunity />} />
            <Route path="community" element={<GroupCommunity />} />
            <Route path="classroom" element={<GroupClassroom />} />
            {/* Create course */}
            <Route path="classroom/new" element={<GroupCourseCreate />} />
            {/* Course details and nested routes */}
            <Route path="classroom/course/:courseId" element={<GroupCourse />}>
              <Route path="" element={<p>Select a module to start learning.</p>} />
              {/* Add module */}
              <Route path="module/new" element={<GroupModuleCreate />} />
              {/* Add content to module */}
              <Route path="module/:moduleIndex/content/new" element={<GroupContentCreate />} />
              {/* View content */}
              <Route path="module/:moduleIndex/content/:contentIndex" element={<GroupContentView />} />
            </Route>
            <Route path="leaderboard" element={<GroupLeaderboard />} />
            <Route path="calendar" element={<GroupCalendar />} />
            <Route path="board" element={<GroupBoard />} />
            <Route path="support/contact" element={<GroupContact />} />
            <Route path="settings" element={<GroupSettingsLayout />}>
              <Route path="invite" element={<GroupSettingsInvite />} />
              <Route path="general" element={<GroupSettingsGeneral />} />
              <Route path="members" element={<GroupSettingsMembers />} />
              <Route path="webhook" element={<GroupSettingsWebhook />} />
              <Route index element={<GroupSettingsGeneral />} />
            </Route>
            <Route path="upgrade" element={<GroupUpgrade />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);