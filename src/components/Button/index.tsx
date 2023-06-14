import { IButtonCustomProps } from 'types';
import { WrapperButton } from './style';
import React from 'react';

const ButtonCustom: React.FC<IButtonCustomProps> = ({ children, ...props }) => {
  return (
    <WrapperButton className={['button-custom-component', props?.className].join(' ')} {...props}>
      {children}
    </WrapperButton>
  );
};

export default ButtonCustom;
