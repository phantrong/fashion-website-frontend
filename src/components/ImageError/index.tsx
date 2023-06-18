import { IImageErrorProps } from 'types';
import { WrapperImageError } from './style';
import React, { useState, useEffect } from 'react';
import { Image, Skeleton } from 'antd';
import images from 'assets';

const ImageError: React.FC<IImageErrorProps> = ({ isLoading, src, ...props }) => {
  const [link, setLink] = useState<string | undefined>(src);

  useEffect(() => {
    setLink(src || images.icons.DefaultImage);
  }, [src]);

  return (
    <WrapperImageError className="image-error-component">
      {isLoading ? (
        <Skeleton.Input active={isLoading} />
      ) : (
        <Image onError={() => setLink(images.icons.DefaultImage)} src={link} {...props} />
      )}
    </WrapperImageError>
  );
};

export default ImageError;
