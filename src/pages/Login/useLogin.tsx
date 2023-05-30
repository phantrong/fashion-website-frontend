import { message } from 'antd';
import { login, loginWithGoogle } from 'api/authentication';
import { handleErrorMessage } from 'helper';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const useLogin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateToSignUp = () => navigate('/sign-up');
  const handleSubmit = async (payload: any) => {
    const params = {
      username: payload.username,
      password: payload.password,
    };
    try {
      const data = await login(params);
      const { token, refreshToken } = data.data;
      Cookies.set('token', token, {
        expires: payload.rememberMe ? 999999 : undefined,
      });
      Cookies.set('refreshToken', refreshToken, {
        expires: payload.rememberMe ? 999999 : undefined,
      });
      navigate('/');
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const responseMessage = async (response: any) => {
    if (response?.credential) {
      const dataUser = jwt_decode(response.credential);
      console.log(dataUser);

      if (dataUser) {
        try {
          const data = await loginWithGoogle(dataUser);
          console.log(data);

          const { token } = data.data;
          Cookies.set('token', token, undefined);
          navigate('/');
        } catch (error) {
          handleErrorMessage(error);
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
    handleSubmit,
    responseMessage,
    errorMessage,
  };
};

export default useLogin;
