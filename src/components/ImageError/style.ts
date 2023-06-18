import { styled } from 'styled-components';

const WrapperImageError = styled.div`
  height: 100%;
  width: 100%;
  .ant-skeleton {
    width: 100%;
    height: 100%;
    .ant-skeleton-input {
      width: 100%;
      height: 100%;
    }
  }
  .ant-image {
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      width: 100%;
    }
  }
`;

export { WrapperImageError };
