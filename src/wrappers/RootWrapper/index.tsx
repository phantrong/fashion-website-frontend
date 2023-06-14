import VerifyEmail from 'pages/VerifyEmail';
import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthWrapper from 'wrappers/AuthWrapper';
import CommonWrapper from 'wrappers/CommonWrapper';

const Login = lazy(() => import('pages/Login'));
const SignUp = lazy(() => import('pages/SignUp'));
const HomePage = lazy(() => import('pages/HomePage'));
const SearchRoom = lazy(() => import('pages/SearchRoom'));
const RoomDetail = lazy(() => import('pages/RoomDetail'));
const UserProfile = lazy(() => import('pages/UserProfile'));
const UserHistoryView = lazy(() => import('pages/UserHistoryView'));

export default function AppWrapper() {
  return (
    <div className="root-wrapper">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/" element={<CommonWrapper />}>
          {/* Child route declaration */}
          <Route path="/" element={<HomePage />} />
          <Route path="/room/search" element={<SearchRoom />} />
          <Route path="/room/detail/:id" element={<RoomDetail />} />
        </Route>
        <Route path="/user" element={<AuthWrapper />}>
          {/* Child route declaration */}
          <Route path="profile" element={<UserProfile />} />
          <Route path="history-view" element={<UserHistoryView />} />
        </Route>
      </Routes>
    </div>
  );
}
