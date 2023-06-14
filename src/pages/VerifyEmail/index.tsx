import React from 'react';
import styles from './style.module.scss';
import { Button, Card, Row } from 'antd';
import useVerifyEmail from './useVerifyEmail';
import Loading from 'components/Loading';

export default function VerifyEmail() {
  const { t, verified, navigateToLogIn, isLoadingVerify } = useVerifyEmail();

  return (
    <div className={styles.verifyEmailContainer}>
      <Card bordered className={styles.verifyEmailForm}>
        <Row justify="center">
          <h1>ThuePhongTro TTH</h1>
        </Row>
        <Row className={styles.content}>
          <h2>
            {isLoadingVerify
              ? 'Đang xác thực Email'
              : verified
              ? 'Xác thực Email thành công'
              : 'Xác thực Email thất bại'}
          </h2>
          <br />
          <div>{isLoadingVerify && <Loading />}</div>
        </Row>
        {!isLoadingVerify && (
          <Button block type="primary" htmlType="button" onClick={navigateToLogIn}>
            {t('common.login').toUpperCase()}
          </Button>
        )}
      </Card>
    </div>
  );
}
