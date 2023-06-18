import React from 'react';

import styles from './styles.module.scss';
import logoHeader from 'assets/images/logo-header.svg';
import hotlineIcon from 'assets/images/hotline.svg';
import emailContactIcon from 'assets/images/contact-email.svg';
import facebookIcon from 'assets/images/facebook.svg';
import zaloIcon from 'assets/images/zalo.svg';

import { Layout, Row, Col, Typography, Modal, Form, Input } from 'antd';
import usePageFooter, { COMMENT_TYPE, COOPERATION_CONTACT_TYPE } from './usePageFooter';
import { REGEX_EMAIL } from 'helper/regex';
import TextArea from 'antd/lib/input/TextArea';
import images from 'assets';

const { Footer } = Layout;
const { Title, Text } = Typography;

const PageFooter = () => {
  const {
    form,
    defaultContactValues,
    modalVisiable,
    modalType,
    onOpenModal,
    onCancel,
    onFinishForm,
    isLoadingSendContact,
    featureNotSupport,
    accessNumber,
  } = usePageFooter();

  return (
    <Footer className={styles.footerWrapper}>
      <Row justify="space-between" align="top">
        <Col xs={24} sm={24} md={6}>
          <div className={styles.padding24px}>
            <img src={logoHeader} className={styles.logo} alt="Logo" />
            <Title level={4}>ThuePhongTro TTH</Title>
            <Text>
              ThuePhongTro TTH nơi các bạn có thể tìm được những phòng trọ/chung cư mini đẹp và phù hợp với bạn nhất.
            </Text>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <div className={styles.padding24px}>
            <div className={styles.infoContact}>
              <img src={hotlineIcon} className={styles.iconContact} alt="hotline" />
              <div className={styles.info}>
                <Text className={styles.label}>Hotline:</Text>
                <Text strong>0968 724 069</Text>
              </div>
            </div>
            <br />
            <br />
            <div className={styles.infoContact}>
              <img src={emailContactIcon} className={styles.iconContact} alt="email-contact" />
              <div className={styles.info}>
                <Text className={styles.label}>Email liên hệ:</Text>
                <Text strong>thuephongtrotth@gmail.com</Text>
              </div>
            </div>
            <Text></Text>
            <br />
            <br />
            <div className={styles.infoContact}>
              <a
                href="https://www.facebook.com/profile.php?id=100092991185896"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebookIcon} className={styles.iconContact} alt="facebook" />
              </a>
              <a href="https://zalo.me/0968724069" target="_blank" rel="noopener noreferrer">
                <img src={zaloIcon} className={styles.iconContact} alt="zalo" />
              </a>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <div className={styles.links}>
            <Text strong>LIÊN HỆ:</Text>
            <div className={styles.link} onClick={() => onOpenModal(COMMENT_TYPE)}>
              Đóng góp ý kiến
            </div>
            <div className={styles.link} onClick={() => onOpenModal(COOPERATION_CONTACT_TYPE)}>
              Liên hệ hợp tác
            </div>
            <br />
            <Text strong>Lượt truy cập:</Text>
            <div className={styles.accessView}>
              <img width={20} height={20} src={images.icons.EyesImage} alt="view" />
              <Text strong>{accessNumber}</Text>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <div className={styles.links}>
            <Text strong>HƯỚNG DẪN:</Text>
            <div className={styles.link} onClick={featureNotSupport}>
              Hướng dẫn sử dụng
            </div>
            <div className={styles.link} onClick={featureNotSupport}>
              Câu hỏi thường gặp
            </div>
            <div className={styles.link} onClick={featureNotSupport}>
              Thông báo
            </div>
            <div className={styles.link} onClick={featureNotSupport}>
              Sitemap
            </div>
          </div>
        </Col>
      </Row>
      <div className={styles.copyRight}>&copy; ThuePhongTro TTH, 2023. All rights reserved.</div>
      <Modal
        title={modalType === COMMENT_TYPE ? 'Đóng góp ý kiến' : 'Liên hệ hợp tác'}
        visible={modalVisiable}
        okText={'Gửi'}
        cancelText={'Hủy'}
        onOk={form.submit}
        onCancel={onCancel}
        closable={false}
        confirmLoading={isLoadingSendContact}
      >
        <Form form={form} requiredMark={true} initialValues={defaultContactValues} onFinish={onFinishForm}>
          <Form.Item
            labelCol={{ span: 24 }}
            colon={false}
            label={'Họ và Tên'}
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
          >
            <Input name="name" placeholder={'Họ và Tên'} maxLength={255} />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            colon={false}
            label={'Email'}
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              {
                pattern: REGEX_EMAIL,
                message: 'Vui lòng nhập email chính xác',
              },
            ]}
          >
            <Input name="email" placeholder={'Email'} maxLength={255} />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            colon={false}
            label={'Nội dung'}
            name="content"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
          >
            <TextArea
              className={styles.textArea}
              name="content"
              placeholder={'Nội dung'}
              maxLength={1000}
              rows={5}
              // showCount={true}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Footer>
  );
};

export default PageFooter;
