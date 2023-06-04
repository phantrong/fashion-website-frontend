import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface ILoadingProps {
  size?: 'small' | 'default' | 'large';
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin rev="default" />;

const Loading = ({ size }: ILoadingProps) => {
  return <Spin indicator={antIcon} size={size} />;
};

export default Loading;
