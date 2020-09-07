import { IconButton } from "@components";
import React, { FC, ReactChild, useEffect, useState } from "react";
import { mapChildren } from "@core/utils/mapChildren.util";
import { MultiTierDropdownState } from "./MultiTierDropdown";
import MultiTierDropdownOption from "./MultiTierDropdownOption";
import { isArray } from "lodash-es";
import { group } from "console";

type MultiTierDropdownItemProps = {
  value: string;
  triggerLabel?: string;
  groupValue?: string;
  groupIndex?: number;
  activeGroupIndex?: number;
  activeItem?: string;
  children?: any;
  onChange?: (value?: string, subValue?: string) => void;
  onGroupChange?: (index: number) => void;
};

const MultiTierDropdownItem = ({
  activeGroupIndex,
  groupIndex,
  activeItem,
  triggerLabel,
  onChange,
  onGroupChange,
  children,
}: MultiTierDropdownItemProps) => {
  const isActive = groupIndex === activeGroupIndex;

  if (!onGroupChange || groupIndex === undefined) {
    throw new Error("Missing Something");
  }

  const triggerGroupChange = () => {
    onGroupChange(groupIndex);
    if (children && onChange) {
      const firstChild = isArray(children) ? children[0] : children;
      onChange(firstChild?.props?.value);
    }
  };

  useEffect(() => {
    if (groupIndex === 0) {
      triggerGroupChange();
    }
  }, []);

  return (
    <div className="multi-dd__item">
      <header onClick={triggerGroupChange} className="multi-dd__item-trigger">
        <h1 className="multi-dd__item-trigger-content">{triggerLabel}</h1>
        <IconButton
          size="mini"
          classes="multi-dd__trigger-btn"
          icon="keyboard_arrow_down"
        ></IconButton>
      </header>

      <ul className={`multi-dd__option-content ${isActive ? "" : "hidden"}`}>
        {mapChildren(children as typeof MultiTierDropdownOption[], (child) => {
          return React.cloneElement(child as any, {
            onChange,
            activeItem,
          });
        })}
      </ul>
    </div>
  );
};

export default MultiTierDropdownItem;
