import SelectCustom from 'components/Select';
import styled from 'styled-components';

const WrapperBannerStyle = styled.div`
  background-image: url('https://mogi.vn/content/images/home/home-bg-d.jpg');
  background-size: cover;
  height: 400px;
  font-size: 14px;
`;

const WrapperSearch = styled.div`
  margin: auto;

  h2 {
    text-align: center;
    font-size: 2em;
    font-weight: bold;
    color: #fff;
    margin-bottom: 20px;
  }
`;

const WrapperOverLay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 12px 24px 16px 24px;
  border-radius: 12px;
  width: 800px;
  margin: auto;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  .ant-input-group-addon:nth-child(1) {
    border-radius: 7px 0 0 7px !important;
  }
  .ant-select {
    width: 120px;
  }
  button {
    background: #e03c31;
    border-color: transparent;
    &:hover {
      background: #ff837a !important;
      border-color: transparent;
    }
  }
  input {
    border-color: transparent !important;
    outline: unset;
    &:focus {
      box-shadow: unset;
    }
  }
`;

const WrapperSelect = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const WrapperItem = styled.div<{ maxWidth?: string }>`
  flex: 1;
  max-width: ${(props) => props?.maxWidth || 'unset'};
  .ant-select {
    width: 100%;
    .ant-select-selector {
      border-radius: 4px;
      background: transparent;
      color: white;
      height: 30px;

      .ant-select-selection-item {
        color: white;
      }
    }
    .ant-select-arrow {
      color: white;
    }
  }
`;

const WrapperFooterSelect = styled.div`
  padding: 8px 10px;
  border-top: 1px solid #f2f2f2;
  justify-content: space-between;
  display: flex;
  align-items: center;
  button {
    font-weight: bold;
  }
`;
const WrapperSync = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  span {
    color: #2c2c2c;
    font-weight: bold;
  }
`;

const WrapperAddressSelect = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 10px;
  padding: 8px;
  .ant-select {
    width: 100%;
    .ant-select-selector {
      border-radius: 4px;
      height: 40px;
      /* background: transparent; */
      .ant-select-selection-item {
        color: #2c2c2c;
        margin: auto;
      }
      input {
        height: 100% !important;
        color: #2c2c2c;
      }
      .ant-select-selection-placeholder {
        display: flex;
        color: #2c2c2c;
        align-items: center;
      }
    }
    .ant-select-arrow {
      color: #999;
    }
  }
`;

const IconSync = styled.div`
  padding: 0 10px;
  .ant-image {
    cursor: pointer;
  }
`;

const SelectAddress = styled(SelectCustom)`
  .ant-select-selection-item {
    margin: unset !important;
    background: transparent;
    border: none;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .ant-select-selector {
    max-height: 30px !important;
    span:nth-child(1) {
      display: block;
      display: -webkit-box;
      max-width: 100%;
      font-size: 14px;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
export {
  WrapperBannerStyle,
  WrapperSearch,
  WrapperOverLay,
  WrapperSelect,
  WrapperItem,
  WrapperFooterSelect,
  WrapperSync,
  WrapperAddressSelect,
  IconSync,
  SelectAddress,
};
