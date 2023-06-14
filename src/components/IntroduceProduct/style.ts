import { styled } from 'styled-components';

const WrapperIntroduceProduct = styled.div<{ url: string }>`
  border-radius: 5px;
  padding-top: 16px;
  padding-left: 16px;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${(props) => `url(${props?.url})`};
  &:hover {
    div {
      text-decoration: underline;
    }
  }
  width: 100%;
  height: 100%;
`;

const LocationText = styled.div`
  font-size: 18px;
  line-height: 28px;
  color: white;
  font-weight: bold;
`;

const NewText = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: white;
  font-weight: bold;
`;

export { WrapperIntroduceProduct, LocationText, NewText };
