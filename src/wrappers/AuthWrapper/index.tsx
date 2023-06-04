import React, { Suspense } from 'react';
import Cookies from 'js-cookie';
import PageHeader from 'components/PageHeader';
// import SideNav from 'components/SideNav';
import { Outlet, Navigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { useQuery } from 'react-query';
import { getProfile } from 'api/profile';
import { USER_PROFILE } from 'constants/queryKey';

export default function AuthWrapper() {
  const isAuthenticated = !!Cookies.get('token');
  const { data: profile } = useQuery(USER_PROFILE, getProfile, { enabled: isAuthenticated });

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!profile) return null;
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainWrapper}>
        <PageHeader />
        <div className={styles.pageContent}>
          {/* <SideNav /> */}
          <Suspense fallback={null}>
            {/* Outlet is display as child route */}
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
