import { styled } from 'styled-components';

const WrapperProductDetail = styled.div`
  box-shadow: 0px 4px 6px 0px rgba(44, 44, 44, 0.04);
  border-radius: 5px;
  &:hover {
    box-shadow: 0px 4px 16px 0px rgba(44, 44, 44, 0.08);
  }
`;

const WrapperImage = styled.div`
  position: relative;
  border-radius: 5px 5px 0 0;
  height: 127px;
  cursor: pointer;
  .image-error-component {
    height: 100%;
    width: 100%;
    img {
      height: 100%;
      border-radius: 5px 5px 0 0;
    }
  }
`;

const WrapperContent = styled.div`
  padding: 10px 10px 15px 10px;
  line-height: 20px;
  font-size: 14px;
  border-radius: 0 0 5px 5px;
`;

const TittleStyle = styled.h3`
  color: #2c2c2c;
  display: block;
  display: -webkit-box;
  max-width: 100%;
  font-size: 13px;
  font-weight: 550;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 40px;
  cursor: pointer;
`;

const WrapperInfo = styled.div`
  gap: 20px;
  cursor: auto;
`;

const InfoText = styled.div`
  font-size: 16px;
  font-weight: 550;
  color: #e03c31;
  line-height: 26px;
`;

const WrapperLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TextAddress = styled.div`
  color: #505050;

  display: block;
  display: -webkit-box;
  max-width: 100%;
  font-size: 14px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WrapperTime = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
`;

const TimeText = styled.div`
  font-size: 12px;
  line-height: 16px;
  font-weight: normal !important;
  display: block;
  color: #999;
  float: left;
`;

export {
  WrapperProductDetail,
  WrapperImage,
  WrapperContent,
  TittleStyle,
  WrapperInfo,
  InfoText,
  WrapperLocation,
  TextAddress,
  WrapperTime,
  TimeText,
};
