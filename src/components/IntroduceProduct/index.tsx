import React from 'react';
import { LocationText, NewText, WrapperIntroduceProduct } from './style';

interface IIntroduceProductProps {
  location: string;
  text: string;
  url: string;
  onClick?: () => void;
}

const IntroduceProduct: React.FC<IIntroduceProductProps> = ({ location, text, url, onClick }) => {
  return (
    <WrapperIntroduceProduct url={url} onClick={onClick}>
      <LocationText>{location}</LocationText>
      <NewText>{text}</NewText>
    </WrapperIntroduceProduct>
  );
};

export default IntroduceProduct;
