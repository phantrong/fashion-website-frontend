import React from 'react';
import { SelectStyle } from './style';
import { ISelectComponentProps } from 'types/components/select';

const SelectCustom: React.FC<ISelectComponentProps> = ({ placeholder, onSelect, ...props }) => {
  return (
    <SelectStyle
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      placeholder={placeholder}
      options={props?.options}
      onChange={props?.onChange as any}
      dropdownRender={props?.dropdownRender}
      allowClear={props?.allowClear}
      onFocus={props?.onFocus}
      onClear={props?.onClear}
      tagRender={props?.tagRender}
      mode={props?.mode}
      value={props?.value}
      open={props?.open}
      className={props?.className}
    />
  );
};

export default SelectCustom;
