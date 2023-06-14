import { styled } from 'styled-components';
interface ISpaceStyleProps {
  padding?: string;
  height?: string;
  width?: string;
}
const SpaceStyle = styled.div<ISpaceStyleProps>`
  padding: ${(props) => props?.padding || 'unset'};
  height: ${(props) => props?.height || 'unset'};
  width: ${(props) => props?.width || 'unset'};
`;

export { SpaceStyle };
