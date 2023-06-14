import { ISearchComponentProps } from 'types';
import { WrapperSearch } from './style';
import React from 'react';
const SearchCustom: React.FC<ISearchComponentProps> = ({ placeholder, ...props }) => {
  return <WrapperSearch placeholder={placeholder} {...props} />;
};

export default SearchCustom;
