import { styled } from 'styled-components';

const WrapperSaveRoom = styled.div`
  border-radius: 5px;
  min-width: 400px;
`;

const WrapperTitle = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #f2f2f2;
  font-size: 16px !important;
  line-height: 24px !important;
  text-align: center;
  font-weight: bold;
`;

const WrapperContent = styled.div``;

const WrapperRoomSaveItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f2f2f2;
  &:hover {
    background: #f2f2f2;
  }
  img {
    border-radius: 5px;
  }
  .ant-image:nth-child(2) {
    margin-left: auto;
  }
`;

const WrapperInfo = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 5;
  flex: 1;
  p {
    display: block;
    display: -webkit-box;
    max-width: 100%;
    font-size: 14px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    word-break: break-all;
    margin-bottom: 0;
    color: #2c2c2c;
    font-weight: bold;
  }
`;

const WrapperFooter = styled.div`
  color: #e03c31;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  padding: 10px 0;
  border-top: 1px solid #f2f2f2;
  &:hover {
    color: #ff837a;
    cursor: pointer;
  }
`;

export { WrapperSaveRoom, WrapperTitle, WrapperContent, WrapperRoomSaveItem, WrapperInfo, WrapperFooter };
