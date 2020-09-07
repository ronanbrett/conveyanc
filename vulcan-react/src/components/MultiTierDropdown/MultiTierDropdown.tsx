import { IconButton } from "@components";
import React, { createContext, FC, useState } from "react";
import { mapChildren } from "@core/utils/mapChildren.util";
import "./MultiTierDropdown.scss";
import {
  useObservable,
  useObservableState,
  useSubscription,
} from "observable-hooks";
import { empty, Observable, Subject } from "rxjs";

export interface MultiTierDropdownState {
  value?: string;
  groupValue?: string;
  activeGroupIndex?: number;
  isOpen: boolean;
}

interface MultiTierDropdownProps {
  triggerLabel?: string;
  value?: string;
  children?: any;
}

const MultiTierDropdown = ({
  triggerLabel,
  children,
  value,
}: MultiTierDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeItem, setActiveItem] = useState<String>();

  const swapIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const onGroupChange = (index: number) => {
    setActiveGroup(index);
  };

  const onChange = (name: string) => {
    setActiveItem(name);
    console.log(name);
  };

  return (
    <div className="multi-dd">
      <header onClick={swapIsOpen} className="multi-dd__trigger">
        <div className="multi-dd__trigger-content">{triggerLabel}</div>
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
            onChange,
            activeItem,
            activeGroupIndex: activeGroup,
          })
        )}
      </div>
    </div>
  );
};

export default MultiTierDropdown;
