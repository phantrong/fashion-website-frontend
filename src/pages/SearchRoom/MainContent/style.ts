import { MIN_WIDTH } from 'constants/common';
import { styled } from 'styled-components';

const WrapperMainContentSearchRoom = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 30px;
  min-width: ${MIN_WIDTH};
  width: ${MIN_WIDTH};
  margin: auto;
  margin-top: 20px;
`;

const WrapperBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const WrapperSideBar = styled.div`
  width: 210px;
  top: 0;
  position: sticky;
`;

// search
const WrapperSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ant-select {
    width: 200px;
    border-radius: 5px;
    .ant-select-selector {
      border-radius: 5px;
    }
  }
`;
const TextCountResult = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 550 !important;
  color: #2c2c2c;
  display: inline-block;
`;

const WrapperSeeMore = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 20px;
  justify-content: center;
  button {
    margin: auto;
    padding: 10px 20px;
  }
`;

export { WrapperSeeMore, WrapperMainContentSearchRoom, WrapperBody, WrapperSideBar, WrapperSearch, TextCountResult };
