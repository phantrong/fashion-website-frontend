import React, { useState } from 'react';
import { WrapperSwiper } from './style';
// Core modules imports are same as usual
import { Navigation, Thumbs, FreeMode } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react';

// Styles must use direct files imports
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss';
import { IRoomMediaResponse } from 'types';
import { Image } from 'antd';
import { SpaceStyle } from 'styles/styled';

interface ISwiperProps {
  medias: IRoomMediaResponse[];
}
const SwiperCustom: React.FC<ISwiperProps> = ({ medias }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <WrapperSwiper className="demo">
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {medias?.map((item: IRoomMediaResponse) => (
          <SwiperSlide key={item?.id}>
            <Image preview src={item?.link} alt={'img' + item?.id} />
          </SwiperSlide>
        ))}
      </Swiper>

      <SpaceStyle padding="5px" />
      <Swiper
        onSwiper={(swiper: any) => {
          setThumbsSwiper(swiper);
        }}
        spaceBetween={20}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {medias?.map((item: IRoomMediaResponse) => (
          <SwiperSlide key={item?.id}>
            <Image preview={false} src={item?.link} alt={'img' + item?.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </WrapperSwiper>
  );
};

export default SwiperCustom;
