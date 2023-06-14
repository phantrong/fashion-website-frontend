import Search from 'antd/lib/input/Search';
import { PLACEHOLDER_COLOR } from 'constants/common';
import { styled } from 'styled-components';

interface ISelectStyleProps {
  height?: string;
}
const WrapperSearch = styled(Search)<ISelectStyleProps>`
  input {
    border-radius: 7px 0 0 7px;
    height: ${(props) => props?.height || '44px'};
    &::placeholder {
      color: ${PLACEHOLDER_COLOR};
    }
  }
  .ant-input-group-addon {
    border-radius: 0 7px 7px 0;
    height: 44px;
    button {
      border-radius: 0 7px 7px 0 !important;
      height: ${(props) => props?.height || '44px'};
      .anticon-search {
        width: 20px;
        height: 25px;
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;

export { WrapperSearch };
