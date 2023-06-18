import { Skeleton } from 'antd';
import { WrapperLoadingStyle } from './style';
import React from 'react';

interface IWrapperLoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
}
const WrapperLoading: React.FC<IWrapperLoadingProps> = ({ isLoading, children }) => {
  return (
    <WrapperLoadingStyle>
      <Skeleton active={isLoading} loading={isLoading}>
        {children}
      </Skeleton>
    </WrapperLoadingStyle>
  );
};

export default WrapperLoading;
