import { MIN_WIDTH } from 'constants/common';
import { styled } from 'styled-components';

const WrapperSavedRoom = styled.div``;

const WrapperMainContent = styled.div`
  min-width: ${MIN_WIDTH};
  width: ${MIN_WIDTH};
  display: flex;
  align-self: start;
  flex-direction: column;
  margin: auto;
  gap: 20px;
`;

const WrapperBody = styled.div`
  width: calc(100% - 210px);
  display: flex;
  justify-content: right;
  flex-direction: column;
  align-items: flex-start;
`;

const TitleStyle = styled.h2`
  padding: 15px 0;
  font-size: 25px;
`;

const WrapperSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  margin-bottom: 15px;
  .ant-select {
    width: 200px;
    border-radius: 5px;
    .ant-select-selector {
      border-radius: 5px;
    }
  }
`;

export { WrapperSavedRoom, WrapperMainContent, WrapperBody, TitleStyle, WrapperSearch };
