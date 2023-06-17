import { Col } from 'antd';
import styled from 'styled-components';

const SwiperCustomWrapper = styled.div``;

export const HeaderSwiperStyle = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: 20px;
  .text-avatar {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: #223354;
  }
`;

export const SwiperPrevNextStyle = styled.div<{ activeIndex: number; lengthList: number }>`
  display: flex;
  align-items: center;
  .ant-avatar {
    border: 1px solid #ccc;
    border-radius: 5px;
    color: ${(props) => props?.color || '#8d8d8d'};
    background: transparent;
    .anticon {
      padding: 5px;
    }
  }
  .ant-avatar:nth-child(1) {
    margin-right: 5px;
  }
  .prev {
    color: ${(props) => (props?.activeIndex > 0 ? '#2C2C2C' : '#999')};
    pointer-events: ${(props) => (props?.activeIndex > 0 ? 'auto' : 'none')};
  }
  .next {
    color: ${(props) => (props?.activeIndex < props.lengthList ? '#2C2C2C' : '#999')};
    pointer-events: ${(props) => (props?.activeIndex < props.lengthList ? 'auto' : 'none')};
  }
`;

export default SwiperCustomWrapper;
