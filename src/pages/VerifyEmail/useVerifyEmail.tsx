import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { verifySignUp } from 'api/authentication';
import { message } from 'antd';

const useVerifyEmail = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const navigateToLogIn = () => navigate('/login');

  const [verified, setVerified] = useState<boolean>(false);
  const [isLoadingVerify, setIsLoadingVerify] = useState<boolean>(false);

  const verifyEmail = useCallback(async () => {
    if (query.get('code')) {
      setIsLoadingVerify(true);
      try {
        const response = await verifySignUp({ code: query.get('code') });
        if (response?.success) {
          setVerified(true);
          message.success('Xác thực Email thành công. Hãy đăng nhập để sử dụng.');
          navigateToLogIn();
        }
      } catch (error) {
        setVerified(false);
        message.error('Xác thực thất bại do đường liên kết không hợp lệ.');
      } finally {
        setIsLoadingVerify(false);
      }
    }
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    verifyEmail();
    // eslint-disable-next-line
  }, []);

  return {
    t,
    navigateToLogIn,
    isLoadingVerify,
    verified,
  };
};

export default useVerifyEmail;
