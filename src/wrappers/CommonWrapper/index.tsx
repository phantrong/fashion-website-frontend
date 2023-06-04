import React, { Suspense } from 'react';
import PageHeader from 'components/PageHeader';
import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

export default function CommonWrapper() {
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
