import React from 'react';
import { LocationText, NewText, WrapperIntroduceProduct } from './style';

interface IIntroduceProductProps {
  location: string;
  text: string;
  url: string;
}

const IntroduceProduct: React.FC<IIntroduceProductProps> = ({ location, text, url }) => {
  return (
    <WrapperIntroduceProduct url={url}>
      <LocationText>{location}</LocationText>
      <NewText>{text}</NewText>
    </WrapperIntroduceProduct>
  );
};

export default IntroduceProduct;
