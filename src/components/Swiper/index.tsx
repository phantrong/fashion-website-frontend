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
            <img src={item?.link} alt={'img' + item?.id} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={(swiper: any) => {
          setThumbsSwiper(swiper);
        }}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {medias?.map((item: IRoomMediaResponse) => (
          <SwiperSlide key={item?.id}>
            <img src={item?.link} alt={'img' + item?.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </WrapperSwiper>
  );
};

export default SwiperCustom;
