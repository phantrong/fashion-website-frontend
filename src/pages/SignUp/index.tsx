import React from 'react';
import styles from './style.module.scss';
import { Card, Input, Button, Form, Row, Col, DatePicker } from 'antd';
import useSignUp from './useSignUp';
import LoadingPage from 'components/LoadingPage';
import { RuleObject } from 'antd/lib/form';
import { PASSWORD_MIN_LENGTH, USER_AGE_MIN } from 'constants/validate';
import dayjs from 'dayjs';

export default function SignUp() {
  const { t, navigateToLogIn, handleSubmit, isLoadingSubmit } = useSignUp();

  return (
    <div className={styles.signUpContainer}>
      <Card bordered className={styles.signUpForm}>
        <Form onFinish={handleSubmit}>
          <Row justify="center">
            <h1>ThuePhongTro TTH</h1>
          </Row>
          <Row justify="center">
            <h2>Đăng ký</h2>
          </Row>
          <Row>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Họ"
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập họ',
                  },
                ]}
                labelAlign="left"
                labelCol={{ xl: 22, lg: 22, md: 22, sm: 24, xs: 24 }}
                wrapperCol={{ xl: 22, lg: 22, md: 22, sm: 24, xs: 24 }}
              >
                <Input maxLength={255} />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Tên"
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên',
                  },
                ]}
                labelAlign="left"
                labelCol={{ xl: 22, lg: 22, md: 22, sm: 24, xs: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input maxLength={255} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Ngày sinh"
            name="birthday"
            rules={[
              () => ({
                validator(_: RuleObject, value: string) {
                  const date: Date = new Date(value);

                  const dateNow: Date = new Date(dayjs().subtract(USER_AGE_MIN, 'year').format('YYYY/MM/DD'));

                  if (!value || date.getTime() < dateNow.getTime()) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('Số tuổi của bạn phải lớn hơn 10 tuổi'));
                },
              }),
            ]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <DatePicker placeholder="Ngày sinh" className={styles.datePicker} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email',
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input maxLength={255} />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: t('validate.passwordRequired') }]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password maxLength={255} />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="password_confirm"
            rules={[
              { required: true, message: t('validate.passwordRequired') },
              ({ getFieldValue }) => ({
                validator(_: RuleObject, value: string) {
                  if (
                    ((value && getFieldValue('password')) || !getFieldValue('password')) &&
                    getFieldValue('password') !== value
                  ) {
                    return Promise.reject(new Error('Mật khẩu xác nhận không hợp lệ'));
                  }

                  return Promise.resolve();
                },
              }),

              ({ getFieldValue }) => ({
                validator(_: RuleObject, value: string) {
                  if (
                    value &&
                    getFieldValue('password') === value &&
                    (value.length > 255 || value.length < PASSWORD_MIN_LENGTH)
                  ) {
                    return Promise.reject(new Error('Độ dài của mật khẩu lớn hơn 8 và nhỏ hơn 255 kí tự'));
                  }

                  return Promise.resolve();
                },
              }),
            ]}
            dependencies={['password']}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password maxLength={255} />
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="dashed" htmlType="button" onClick={navigateToLogIn}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {isLoadingSubmit && <LoadingPage />}
    </div>
  );
}
