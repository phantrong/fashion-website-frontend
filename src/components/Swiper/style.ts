import { styled } from 'styled-components';

const WrapperSwiper = styled.div`
  width: 100%;
  .mySwiper2 {
    .swiper-slide {
      height: 464px;
    }
  }
  .mySwiper {
    .swiper-slide {
      height: 106px;
    }
  }
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

export { WrapperSwiper };
