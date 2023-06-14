import { Button } from 'antd';
import { styled } from 'styled-components';
import { ICommonButtonStyle, IHoverStatusButton } from 'types';

interface IButtonStyleProps extends ICommonButtonStyle {
  hover?: IHoverStatusButton;
}

const WrapperButton = styled(Button)<IButtonStyleProps>`
  background: ${(props) => props?.background || '#FAFAFA'};
  color: ${(props) => props?.color || '#2C2C2C'};
  border-radius: ${(props) => props?.borderRadius || '7px'};
  border: ${(props) => props?.border || '1px solid #ccc'};
  box-sizing: border-box;
  height: unset;
  &:hover {
    background: ${(props) => props?.hover?.background || '#FAFAFA'} !important;
    color: ${(props) => props?.hover?.color || '#2C2C2C'} !important;
    border-radius: ${(props) => props?.hover?.borderRadius || '7px'} !important;
    border: ${(props) => props?.hover?.border || '1px solid #ccc'} !important;
  }
`;

export { WrapperButton };
