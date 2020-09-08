import React, { SyntheticEvent, useEffect } from "react";

interface MultiTierDropdownOptionProps {
  activeItem?: string;
  itemIndex?: number;
  value: string;

  modelValue?: string;
  children?: any;
  onItemChange?: (value: string, index?: number) => void;
}

const MultiTierDropdownOption = ({
  onItemChange,
  activeItem,
  itemIndex,
  value,
  modelValue,
  children,
}: MultiTierDropdownOptionProps) => {
  const isSelected = value === activeItem;

  const setValue = () => {
    if (!onItemChange) {
      return;
    }
    onItemChange(value, itemIndex);
  };

  useEffect(() => {
    if (modelValue === value) {
      setValue();
    }
  }, [modelValue, value]);

  return (
    <li
      role="option"
      aria-selected={isSelected}
      className={`multi-dd__option-list-item ${isSelected ? "selected" : ""} `}
      onClick={setValue}
    >
      {children}
    </li>
  );
};

export default MultiTierDropdownOption;
