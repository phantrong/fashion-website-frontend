import React, { Suspense } from 'react';
import PageHeader from 'components/PageHeader';
import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';
import PageFooter from 'components/PageFooter';

export default function CommonWrapper() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainWrapper}>
        <PageHeader />
        <div className={styles.pageContent}>
          <Suspense fallback={null}>
            {/* Outlet is display as child route */}
            <Outlet />
          </Suspense>
        </div>
        <PageFooter />
      </div>
    </div>
  );
}
