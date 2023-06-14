import React from 'react';
import Loading from 'components/Loading';
import styles from './styles.module.scss';

const LoadingPage = () => {
  return (
    <div className={styles.loadingPage}>
      <Loading />
    </div>
  );
};

export default LoadingPage;
