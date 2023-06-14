import { ButtonProps } from 'antd/lib/button';

export interface ICommonButtonStyle {
  background?: string;
  border?: string;
  borderRadius?: string;
  color?: string;
  padding?: string;
}

export interface IHoverStatusButton extends ICommonButtonStyle {
  lint?: boolean;
}
export interface IButtonCustomProps extends ButtonProps {
  hover?: IHoverStatusButton;
  children?: React.ReactNode;
  style?: ICommonButtonStyle;
  className?: string;
}
