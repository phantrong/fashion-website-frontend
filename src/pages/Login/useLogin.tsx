import { message } from 'antd';
import { login, loginWithGoogle } from 'api/authentication';
import { handleErrorMessage } from 'helper';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useQueryClient } from 'react-query';
import { USER_PROFILE } from 'constants/queryKey';
import { useState } from 'react';
import { RESPONSE_STATUS_CODE } from 'constants/response';

const useLogin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const navigateToSignUp = () => navigate('/sign-up');
  const navigateToHome = () => navigate('/');

  const handleSubmit = async (payload: any) => {
    setIsLoadingSubmit(true);
    const params = {
      email: payload.email,
      password: payload.password,
    };
    try {
      const data = await login(params);
      const { token, user } = data.data;
      Cookies.set('token', token, undefined);
      queryClient.setQueryData(USER_PROFILE, { data: user });
      navigate('/');
    } catch (error: any) {
      if (error?.response?.status === RESPONSE_STATUS_CODE.HTTP_UNAUTHORIZED) {
        message.error('Tài khoản mật khẩu không chính xác');
      } else {
        handleErrorMessage(error);
      }
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  const responseMessage = async (response: any) => {
    if (response?.credential) {
      const dataUser = jwt_decode(response.credential);
      if (dataUser) {
        setIsLoadingSubmit(true);
        try {
          const data = await loginWithGoogle(dataUser);
          const { token, user } = data.data;
          Cookies.set('token', token, undefined);
          queryClient.setQueryData(USER_PROFILE, { data: user });
          navigate('/');
        } catch (error) {
          handleErrorMessage(error);
        } finally {
          setIsLoadingSubmit(false);
        }
      }
    }
  };

  const errorMessage = () => {
    message.error('Lỗi kết nối đến Gmail Google!');
  };

  const isAuthenticated = !!Cookies.get('token');
  if (isAuthenticated) navigate('/');

  return {
    t,
    navigateToSignUp,
    navigateToHome,
    handleSubmit,
    responseMessage,
    errorMessage,
    isLoadingSubmit,
  };
};

export default useLogin;
