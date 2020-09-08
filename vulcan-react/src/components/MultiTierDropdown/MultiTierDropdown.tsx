import { IconButton } from "@components";
import { addFieldValidationClasses } from "@core/utils/field.utils";
import { mapChildren } from "@core/utils/mapChildren.util";
import { FieldConfig, useField } from "formik";
import React, { useEffect, useState } from "react";
import "./MultiTierDropdown.scss";

export interface MultiTierDropdownState {
  value?: string;
  groupValue?: string;
  activeGroupIndex?: number;
  isOpen: boolean;
}

interface MultiTierDropdownProps {
  placeholder?: string;
  value?: string;
  children?: any;
  getDisplayValue?: (activeItem: string) => string;
}

const MultiTierDropdown = <T extends any>({
  placeholder,
  children,
  getDisplayValue,
  value,
  ...props
}: MultiTierDropdownProps & FieldConfig) => {
  const [field, meta, helpers] = useField(props);

  const [isOpen, setIsOpen] = useState(false);
  const [modelValue, setModelValue] = useState<string>();
  const [activeGroupIndex, setActiveGroupIndex] = useState(-1);
  const [activeItem, setActiveItem] = useState<string>();
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

  let displayValue = activeItem ? activeItem : placeholder;
  if (getDisplayValue) {
    displayValue = activeItem ? getDisplayValue(activeItem) : placeholder;
  }

  const swapIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const onGroupChange = (index: number) => {
    setActiveGroupIndex(index);
  };

  const onItemChange = (value: string, index: number) => {
    setActiveItemIndex(index);
    setActiveItem(value);
    helpers.setValue(value);
  };

  const reset = () => {
    setActiveItem("");
    setActiveItemIndex(-1);
    setActiveGroupIndex(-1);
  };

  useEffect(() => {
    setModelValue(field.value);

    if (field.value === "") {
      console.log("reset!");
      setIsOpen(false);
      reset();
    }
  }, [field.value]);

  return (
    <div className={`multi-dd ${addFieldValidationClasses(meta)}`}>
      <header onClick={swapIsOpen} className="multi-dd__trigger">
        <div className="multi-dd__trigger-content">{displayValue}</div>
        <IconButton
          classes="mulit-dd__trigger-btn"
          icon="keyboard_arrow_down"
        ></IconButton>
      </header>

      <div className={`multi-dd__content ${isOpen ? "" : "hidden"}`}>
        {mapChildren(children, (child, index) =>
          React.cloneElement(child as any, {
            groupIndex: index,
            onGroupChange,
            onItemChange,
            modelValue,
            activeItem,
            activeItemIndex,
            activeGroupIndex,
          })
        )}
      </div>
    </div>
  );
};

export default MultiTierDropdown;
