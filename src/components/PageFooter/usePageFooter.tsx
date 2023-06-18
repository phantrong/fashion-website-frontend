import { useState, useCallback, useEffect } from 'react';
import { Form, message } from 'antd';
import { sendContact } from 'api/contact';
import { FormInstance } from 'antd/lib/form';
import { getAccessNumber } from 'api';

export const COMMENT_TYPE = 1;
export const COOPERATION_CONTACT_TYPE = 2;

export interface IContact {
  name: string;
  email: string;
  content: string;
  type?: number;
}

const defaultContactValues: IContact = {
  name: '',
  email: '',
  content: '',
};

const usePageFooter = () => {
  const [form]: FormInstance<any>[] = Form.useForm<IContact>();
  const [modalVisiable, setModalVisiable] = useState<boolean>(false);
  const [modalType, setModalType] = useState<number>(COMMENT_TYPE);
  const [isLoadingSendContact, setIsLoadingSendContact] = useState<boolean>(false);
  const [accessNumber, setAccessNumber] = useState<number>(0);

  const onOpenModal = (type: number) => {
    setModalType(type);
    setModalVisiable(true);
  };

  const onCancel = useCallback(() => {
    setModalVisiable(false);
    form.resetFields();
  }, [form]);

  const featureNotSupport = () => {
    message.info('Tính năng đang phát triển! Vui lòng thử lại sau.');
  };

  const showMessageError = (type: number) => {
    if (type === COMMENT_TYPE) message.error('Gửi ý kiến đóng góp thất bại. Vui lòng gửi lại sau!');
    if (type === COOPERATION_CONTACT_TYPE) message.error('Gửi liên hệ hợp tác thất bại. Vui lòng gửi lại sau!');
  };

  const countAccessNumber = async () => {
    try {
      const response = await getAccessNumber();
      setAccessNumber(Number(response?.data?.total || 0));
    } catch (error) {
      //
    }
  };

  const onFinishForm = useCallback(
    async (values: IContact) => {
      setIsLoadingSendContact(true);
      try {
        const response = await sendContact({
          name: values.name.trim(),
          email: values.email.trim(),
          content: values.content.trim(),
          type: modalType,
        });
        if (response?.success) {
          if (modalType === COMMENT_TYPE) message.success('Cảm ơn bạn đã gửi ý kiến đóng góp cho chúng tôi!');
          if (modalType === COOPERATION_CONTACT_TYPE)
            message.success('Gửi liên hệ hợp tác thành công. Vui lòng đợi chúng tôi phản hồi!');
        } else {
          showMessageError(modalType);
        }
      } catch (error) {
        showMessageError(modalType);
      } finally {
        setIsLoadingSendContact(false);
        onCancel();
      }
    },
    [modalType, onCancel]
  );

  useEffect(() => {
    countAccessNumber();
    // eslint-disable-next-line
  }, []);

  return {
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
  };
};

export default usePageFooter;
