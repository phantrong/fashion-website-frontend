import { Button } from 'antd';
import { MIN_WIDTH } from 'constants/common';
import { styled } from 'styled-components';

const WrapperRoomDetail = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 30px;
  min-width: ${MIN_WIDTH};
  width: ${MIN_WIDTH};
  margin: auto;
  margin-top: 20px;
  padding-bottom: 20px;
`;

const WrapperDetailSwiper = styled.div`
  width: 100%;
`;

const WrapperBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const WrapperSideBar = styled.div`
  width: 210px;
  top: 0;
  position: sticky;
`;

const TitleStyle = styled.h1`
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.2px;
  color: #2c2c2c;
`;
const AddressText = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500 !important;
  color: #2c2c2c;
  display: block;
  margin-top: 8px;
`;

const WrapperInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0px;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
  padding: 15px 0px;
  box-sizing: border-box;

  img {
    cursor: pointer;
  }
`;

const WrapperRoomInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const WrapperRoomInfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  span:nth-child(1) {
    font-size: 14px;
    line-height: 20px;
    font-weight: 450 !important;
    color: #999;
    display: block;
  }
  span:nth-child(2) {
    font-size: 18px;
    line-height: 28px;
    font-weight: 550 !important;
    color: #2c2c2c;
    margin-top: 4px;
    display: block;
  }
`;

const WrapperDescription = styled.div``;

const DescriptionTitle = styled.span`
  font-size: 18px;
  line-height: 28px;
  font-weight: 550 !important;
  letter-spacing: -0.2px;
  color: #2c2c2c;
  display: block;
  margin-bottom: 16px;
`;

const WrapperHouseWareInfo = styled.div``;
const WrapperHouseWare = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const TitleHouseWare = styled.h2`
  font-size: 18px;
  line-height: 28px;
  font-weight: 550 !important;
  letter-spacing: -0.2px;
  color: #2c2c2c;
  display: block;
`;

const HouseWareItem = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  background: #f2f2f2;
  color: #2c2c2c;
  margin-top: 8px;
  border-radius: 40px;
  font-weight: 550 !important;
  &:hover {
    background: #f2f2f2;
    color: #999;
  }
`;

const WrapperInfoUser = styled.div`
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .ant-avatar-string {
    color: #74150f !important;
    font-weight: bold;
  }
`;

const NameStyle = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 550 !important;
  letter-spacing: -0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  color: #2c2c2c;
  margin-top: 8px;
`;

const ButtonPhone = styled.div`
  color: #fff;
  background: #009ba1;
  border: 1px solid #009ba1;
  font-family: 'Lexend Medium', Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  letter-spacing: -0.2px;
  padding: 13px 15px;
  border-radius: 8px;
  margin-top: 24px;
  width: 100%;
  text-align: center;
  cursor: pointer;
`;

const ButtonEmail = styled(Button)`
  margin-top: 8px;
  width: 100%;
  display: inline-block;
  color: #2c2c2c;
  position: relative;
  background: #fff;
  border: solid 1px #ccc;
  font-family: 'Lexend Medium', Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  letter-spacing: -0.2px;
  padding: 13px 15px;
  border-radius: 8px;
  height: auto !important;
`;

const CreateBy = styled.div`
  font-size: 12px;
  line-height: 16px;
  font-weight: normal !important;
  color: #999;
  display: block;
  margin-top: 8px;
  margin-bottom: -4px;
`;

const TitleCity = styled.div``;

const WrapperCity = styled.div`
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 16px;
  background-color: #f2f2f2;
`;

const ProductSuggestDetail = styled.div`
  margin-top: 20px;
`;
export {
  WrapperRoomDetail,
  WrapperBody,
  WrapperSideBar,
  TitleStyle,
  AddressText,
  WrapperInfo,
  WrapperRoomInfo,
  WrapperRoomInfoItem,
  WrapperDescription,
  DescriptionTitle,
  WrapperHouseWare,
  HouseWareItem,
  WrapperHouseWareInfo,
  TitleHouseWare,
  WrapperInfoUser,
  CreateBy,
  NameStyle,
  ButtonPhone,
  ButtonEmail,
  WrapperCity,
  TitleCity,
  WrapperDetailSwiper,
  ProductSuggestDetail,
};
