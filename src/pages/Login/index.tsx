import React from 'react';
import styles from './style.module.scss';
import { Card, Input, Button, Form, Row, Checkbox } from 'antd';
import { GoogleLogin } from '@react-oauth/google';
import useLogin from './useLogin';

export default function Login() {
  const { t, navigateToSignUp, handleSubmit, responseMessage, errorMessage } = useLogin();

  return (
    <div className={styles.loginContainer}>
      <Card bordered className={styles.loginForm}>
        <Form onFinish={handleSubmit}>
          <Row justify="center">
            <h2>{t('common.login')}</h2>
          </Row>
          <Form.Item
            label={t('common.username')}
            name="username"
            rules={[
              {
                required: true,
                message: t('validate.usernameRequired'),
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
          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox> {t('common.rememberMe')}</Checkbox>
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
          <div>
            <p>Account: admin / 123456</p>
          </div>
        </Form>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </Card>
    </div>
  );
}
