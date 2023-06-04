import { message } from 'antd';
import { login, loginWithGoogle } from 'api/authentication';
import { handleErrorMessage } from 'helper';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useQueryClient } from 'react-query';
import { USER_PROFILE } from 'constants/queryKey';

const useLogin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const navigateToSignUp = () => navigate('/sign-up');

  const handleSubmit = async (payload: any) => {
    const params = {
      username: payload.username,
      password: payload.password,
    };
    try {
      const data = await login(params);
      const { token, user } = data.data;
      Cookies.set('token', token, undefined);
      queryClient.setQueryData(USER_PROFILE, { data: user });
      navigate('/');
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const responseMessage = async (response: any) => {
    if (response?.credential) {
      const dataUser = jwt_decode(response.credential);
      if (dataUser) {
        try {
          const data = await loginWithGoogle(dataUser);
          const { token, user } = data.data;
          Cookies.set('token', token, undefined);
          queryClient.setQueryData(USER_PROFILE, { data: user });
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
