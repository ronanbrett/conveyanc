import { on } from "process";
import React, { FC, useContext } from "react";
import { MultiTierDropdownState } from "./MultiTierDropdown";

interface MultiTierDropdownOptionProps {
  activeItem?: string;
  value: string;
  children?: any;
  onChange?: (value: string, subValue?: string) => void;
}

const MultiTierDropdownOption = ({
  onChange,
  activeItem,
  value,
  children,
}: MultiTierDropdownOptionProps) => {
  const setValue = () => {
    if (!onChange) {
      return;
    }
    onChange(value);
  };

  return (
    <li
      className={`multi-dd__option-list-item  ${
        value === activeItem ? "selected" : ""
      } `}
      onClick={setValue}
    >
      {children}
    </li>
  );
};

export default MultiTierDropdownOption;
