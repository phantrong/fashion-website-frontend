import React from 'react';
import { WrapperHome } from './style';
import BannerHome from './Banner';
import MainContentHome from './MainContent';

const HomePage = () => {
  return (
    <WrapperHome>
      <BannerHome />

      <MainContentHome />
    </WrapperHome>
  );
};

export default HomePage;
