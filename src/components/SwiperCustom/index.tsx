import React, { FunctionComponent, useState } from 'react';
import SwiperCustomWrapper, { HeaderSwiperStyle, SwiperPrevNextStyle } from './style';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { Avatar, Col, Row } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

SwiperCore.use([Navigation]);

interface PropsIconAction {
  backgroundColor?: string;
  color?: string;
  colorFocus?: string;
  focusOn?: 'prev' | 'next' | '';
}
interface Props {
  list?: any[];
  className?: string;
  slidesPerView?: number | 'auto';
  title?: string;
  titleAvatar?: string;
  showSwiperAction?: boolean;
  loop?: boolean;
  spaceBetween?: number | undefined;
  sizeIconTitle?: number;
  iconAction?: PropsIconAction;
  slidesOffsetAfter?: number;
}
const SwiperCustom: FunctionComponent<Props> = ({
  titleAvatar,
  list,
  className,
  slidesPerView = 5,
  title,
  showSwiperAction = true,
  loop = true,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [, setFocusOn] = useState<'prev' | 'next' | ''>(props?.iconAction?.focusOn || '');
  return (
    <SwiperCustomWrapper className={className || ''}>
      <Row>
        <HeaderSwiperStyle span={24} className="swiper-header">
          {showSwiperAction && (
            <SwiperPrevNextStyle
              activeIndex={activeIndex}
              lengthList={(list || []).length - 2}
              className="swiper-action"
            >
              <Avatar
                ref={navigationPrevRef}
                size={25}
                shape="circle"
                icon={<LeftOutlined rev={false} onClick={() => setFocusOn('prev')} className="prev" />}
              />
              <Avatar
                ref={navigationNextRef}
                size={25}
                shape="circle"
                icon={<RightOutlined rev={false} onClick={() => setFocusOn('next')} className="next" />}
              />
            </SwiperPrevNextStyle>
          )}
        </HeaderSwiperStyle>

        <Col span={24}>
          <Swiper
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
            }}
            slidesPerView={slidesPerView}
            spaceBetween={props.spaceBetween || 0}
            slidesPerGroup={1}
            freeMode={true}
            loop={loop}
            // loopFillGroupWithBlank={true}
            slidesOffsetAfter={props?.slidesOffsetAfter || 300}
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: '.prev',
              nextEl: '.next',
            }}
            className="mySwiper"
          >
            {list?.map((item: any, index: number) => {
              return (
                <SwiperSlide style={{ width: '300px' }} key={index}>
                  {item}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Col>
      </Row>
    </SwiperCustomWrapper>
  );
};

export default SwiperCustom;
