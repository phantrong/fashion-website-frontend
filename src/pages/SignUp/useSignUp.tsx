import { message } from 'antd';
import { signUp } from 'api/authentication';
import { handleErrorMessage } from 'helper';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RESPONSE_STATUS_CODE } from 'constants/response';

const useSignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateToLogIn = () => navigate('/login');

  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const handleSubmit = async (payload: any) => {
    setIsLoadingSubmit(true);
    const params = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      birthday: payload?.birthday?.format('YYYY-mm-dd'),
      email: payload.email,
      password: payload.password,
      password_confirm: payload.password_confirm,
    };
    try {
      const response = await signUp(params);
      if (response?.success) {
        message.success('Đăng kí thành công! Hãy kiểm tra email của bạn để xác thực.');
        navigateToLogIn();
      }
    } catch (error: any) {
      if (error?.response?.status === RESPONSE_STATUS_CODE.HTTP_UNAUTHORIZED) {
        message.error('Tài khoản mật khẩu không chính xác');
      } else if (error?.response?.status === RESPONSE_STATUS_CODE.HTTP_UNPROCESSABLE_ENTITY) {
        if (error?.response?.data?.message?.email?.Unique) {
          message.error('Email đã được sử dụng');
        }
        if (error?.response?.data?.message?.email?.email) {
          message.error('Email không hợp lệ');
        }
      } else {
        handleErrorMessage(error);
      }
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  const isAuthenticated = !!Cookies.get('token');
  if (isAuthenticated) navigate('/');

  return {
    t,
    navigateToLogIn,
    handleSubmit,
    isLoadingSubmit,
  };
};

export default useSignUp;
