import React from 'react';
import styles from './style.module.scss';
import { Card, Input, Button, Form, Row } from 'antd';
import { GoogleLogin } from '@react-oauth/google';
import useLogin from './useLogin';
import LoadingPage from 'components/LoadingPage';

import logoHeader from 'assets/images/logo-header.svg';

export default function Login() {
  const { t, navigateToSignUp, navigateToHome, handleSubmit, responseMessage, errorMessage, isLoadingSubmit } =
    useLogin();

  return (
    <div className={styles.loginContainer}>
      <Card bordered className={styles.loginForm}>
        <Form onFinish={handleSubmit}>
          <Row justify="center" className={styles.titlePage} onClick={navigateToHome}>
            <img src={logoHeader} alt="logo" />
            <h1>ThuePhongTro TTH</h1>
          </Row>
          <Row justify="center">
            <h2>{t('common.login')}</h2>
          </Row>
          <Form.Item
            label={t('common.email')}
            name="email"
            rules={[
              {
                required: true,
                message: t('validate.emailRequired'),
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('common.password')}
            name="password"
            rules={[{ required: true, message: t('validate.passwordRequired') }]}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              {t('common.login').toUpperCase()}
            </Button>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="dashed" htmlType="button" onClick={navigateToSignUp}>
              {t('common.signUp').toUpperCase()}
            </Button>
          </Form.Item>
        </Form>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </Card>
      {isLoadingSubmit && <LoadingPage />}
    </div>
  );
}
