import { IconButton } from "@components";
import { getByIndex, mapChildren } from "@core/utils/mapChildren.util";
import { isArray } from "lodash-es";
import React, { KeyboardEvent, ReactElement, useEffect, useState } from "react";
import MultiTierDropdownOption from "./MultiTierDropdownOption";

type MultiTierDropdownItemProps = {
  value: string;
  label?: string;
  modelValue?: string;
  groupValue?: string;
  groupIndex?: number;
  activeGroupIndex?: number;
  activeItem?: string;
  activeItemIndex?: number;
  children?: any;
  onItemChange?: (value?: string, index?: number) => void;
  onGroupChange?: (index: number) => void;
};

const MultiTierDropdownItem = ({
  activeGroupIndex,
  modelValue,
  groupIndex,
  activeItem,
  activeItemIndex,
  label,
  onItemChange,
  onGroupChange,
  children,
}: MultiTierDropdownItemProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(groupIndex === activeGroupIndex);
  }, [groupIndex, activeGroupIndex]);

  if (
    !onGroupChange ||
    !onItemChange ||
    activeItemIndex === undefined ||
    activeGroupIndex === undefined ||
    groupIndex === undefined ||
    label === undefined
  ) {
    throw new Error("Did you forget to wrap this in a MultiTierDropdown");
  }

  const handleOnKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === "ArrowUp") {
      const prevIndex = activeItemIndex - 1;
      const child = getByIndex(children, prevIndex);
      if (child && onItemChange) {
        const { value } = child.props;
        onItemChange(value, prevIndex);
      }
    }
    if (evt.key === "ArrowLeft") {
      const prevIndex = activeItemIndex - 1;
      const child = getByIndex(children, prevIndex);
      if (child && onItemChange) {
        const { value } = child.props;
        onItemChange(value, prevIndex);
      }
    }
    if (evt.key === "ArrowRight") {
      const nextIndex = activeItemIndex + 1;
      const child = getByIndex(children, nextIndex);
      if (child && onItemChange) {
        const { value } = child.props;
        onItemChange(value, nextIndex);
      }
    }
  };

  const handleTriggerClick = () => {
    if (groupIndex === activeGroupIndex) {
      return;
    }

    onGroupChange(groupIndex);
    if (children && onItemChange) {
      const firstChild = getByIndex(children, 0);
      onItemChange(firstChild?.props?.value, 0);
    }
  };

  const onChildItemChange = (childValue: string, childIndex: number) => {
    onGroupChange(groupIndex);
    onItemChange(childValue, childIndex);
  };

  return (
    <div className="multi-dd__item">
      <header onClick={handleTriggerClick} className="multi-dd__item-trigger">
        <h1 className="multi-dd__item-trigger-content">{label}</h1>
        <IconButton
          size="mini"
          classes="multi-dd__trigger-btn"
          icon="keyboard_arrow_down"
        ></IconButton>
      </header>

      <ul
        tabIndex={isActive ? 0 : -1}
        role="listbox"
        onKeyDown={handleOnKeyDown}
        aria-activedescendant={activeItem}
        className={`multi-dd__option-content ${isActive ? "" : "hidden"}`}
      >
        {mapChildren(
          children as typeof MultiTierDropdownOption[],
          (child, itemIndex) => {
            return React.cloneElement(child as any, {
              onItemChange: onChildItemChange,
              activeItem,
              itemIndex,
              modelValue,
            });
          }
        )}
      </ul>
    </div>
  );
};

export default MultiTierDropdownItem;
