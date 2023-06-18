import { styled, keyframes } from 'styled-components';

const WrapperSearchProductItem = styled.div`
  box-shadow: 0px 4px 6px 0px rgba(44, 44, 44, 0.04);
  border: 1px solid #f2f2f2;
  border-radius: 4px;
  &:hover {
    box-shadow: 0px 4px 16px 0px rgba(44, 44, 44, 0.08);
  }
`;

const WrapperImages = styled.div`
  height: 233px;
  display: flex;
  align-items: flex-start;
  margin-left: -4px;
  margin-right: -4px;
`;

const MainImage = styled.div`
  width: 70%;
  height: 100%;
  border-radius: 5px 0 0 0;
  padding: 0 4px;
`;

const WrapperSubImages = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-left: -4px;
  margin-right: -4px;
  padding: 0 0 0 4px;
  height: 100%;
  row-gap: 2px;
  gap: 2px;
`;

const WrapperFirstSubImage = styled.div`
  height: 50%;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 0 5px 0 0;
    object-fit: cover;
  }
`;

const WrapperSecondSubImage = styled.div`
  height: 50%;
  margin-left: -1px;
  margin-right: -1px;
`;
const SubImage = styled.div<{ width?: string; borderRadius?: string }>`
  width: ${(props) => props?.width || '100%'};
  height: 100%;
  padding: 0 1px;
  object-fit: cover;
  border-radius: ${(props) => props?.borderRadius || '0 5px 0 0'};
`;

// content

const WrapperContent = styled.div`
  padding: 10px 15px;
`;

const WrapperMoney = styled.div`
  display: flex;
  gap: 20px;
  align-items: end;
`;

const TextMoney = styled.div`
  font-size: 16px;
  font-weight: 550 !important;
  color: #e03c31;
  line-height: 26px;
  font-weight: bold;
`;
const TitleContent = styled.div`
  color: #2c2c2c;
  font-size: 14px;
  line-height: 20px;
  font-weight: bold !important;
  cursor: pointer;
`;

const WrapperIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const AddressText = styled.div`
  color: #505050;
`;

const DescriptionText = styled.div`
  color: #505050;
  display: block;
  display: -webkit-box;
  max-width: 100%;
  margin: 0 auto;
  font-size: 14px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const WrapperFooter = styled.div`
  border-top: 1px solid #f2f2f2;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  gap: 10px;
  align-items: center;
  .contact-btn {
    background: #009ba1;
    border-radius: 7px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 8px;
    cursor: pointer;
  }
  span {
    color: white;
  }
`;

const WrapperEmail = styled.div`
  position: sticky;
  top: 0;
  padding: 15px;
  background: #fff8e7;
  border: 1px solid #fad48d !important;
  border-radius: 8px !important;
  display: flex;
  align-items: center;
  gap: 6px;
  span {
    font-size: 14px;
    line-height: 20px;
    font-weight: 550 !important;
    color: #2c2c2c;
    margin-bottom: 0px;
  }
`;

const animationLayer = keyframes`
  0% {
    transform: rotate(0deg);
}
8% {
    transform: rotate(0deg);
}
12% {
    transform: rotate(42deg);
}
16% {
    transform: rotate(-35deg);
}
20% {
    transform: rotate(0deg);
}
23% {
    transform: rotate(28deg);
}
26% {
    transform: rotate(-20deg);
}
29% {
    transform: rotate(0deg);
}
31% {
    transform: rotate(16deg);
}
33% {
    transform: rotate(-12deg);
}
35% {
    transform: rotate(0deg);
}
37% {
    transform: rotate(-6deg);
}
39% {
    transform: rotate(0deg);
}
40% {
    transform: rotate(6deg);
}
44% {
    transform: rotate(-3deg);
}
49% {
    transform: rotate(2deg);
}
55% {
    transform: rotate(0deg);
}
62% {
    transform: rotate(1deg);
}
70% {
    transform: rotate(0deg);
}
`;

const WrapperBell = styled.div`
  padding: 6px;
  background-color: #fcb40a;
  border-radius: 25px;
  img {
    animation: ${animationLayer} 5000ms infinite;
  }
`;

// filter

const WrapperFilter = styled.div`
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  padding: 15px;
`;

const TitleFilter = styled.div`
  color: #2c2c2c;
  margin-bottom: 16px;
  font-weight: 550;
  font-size: 14px;
  line-height: 20px;
`;
const TextValueFilter = styled.div`
  color: #2c2c2c;
  margin-bottom: 12px;
  cursor: pointer;
  font-weight: 450;
  &:hover {
    color: #999;
  }
`;

const WrapperUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .ant-avatar-string {
    color: #74150f !important;
    font-weight: bold;
  }
`;

const WrapperUserInfo = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 5px;
  p {
    color: #2c2c2c;
    font-size: 12px;
    line-height: 16px;
    font-weight: bold;
    white-space: nowrap;
    margin: 0;
  }
  span {
    font-size: 12px;
    line-height: 16px;
    font-weight: 500 !important;
    display: block;
    color: #999;
  }
`;

export {
  WrapperSearchProductItem,
  WrapperImages,
  MainImage,
  WrapperSubImages,
  SubImage,
  WrapperFirstSubImage,
  WrapperSecondSubImage,
  WrapperContent,
  TitleContent,
  WrapperMoney,
  TextMoney,
  WrapperIcon,
  AddressText,
  DescriptionText,
  WrapperFooter,
  WrapperEmail,
  WrapperBell,
  WrapperFilter,
  TitleFilter,
  TextValueFilter,
  WrapperUser,
  WrapperUserInfo,
};
