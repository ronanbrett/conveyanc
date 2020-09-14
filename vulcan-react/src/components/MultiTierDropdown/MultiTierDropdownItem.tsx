import { IconButton } from "@components";
import { getByIndex, mapChildren } from "@core/utils/mapChildren.util";
import { isArray } from "lodash-es";
import React, {
  KeyboardEvent,
  ReactElement,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import MultiTierDropdownOption from "./MultiTierDropdownOption";
import { motion } from "framer-motion";
import Keyboard from "components/Keyboard";

const ITEM_WIDTH = 130;

type MultiTierDropdownItemProps = {
  value: string;
  label?: string;
  modelValue?: string;
  groupValue?: string;
  groupIndex?: number;
  activeGroupIndex?: number;
  activeItem?: string;
  activeItemIndex?: number;
  containerWidth?: number;
  children?: any;
  onItemChange?: (value?: string, index?: number) => void;
  onGroupChange?: (index: number) => void;
  onComplete?: (force?: boolean) => void;
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
  onComplete,
  children,
}: MultiTierDropdownItemProps) => {
  const [isActive, setIsActive] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const containerRef = useRef<HTMLElement>();
  const innerContainerRef = useRef<HTMLElement>();

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
    if (evt.key === "Escape") {
      return onComplete(true);
    }

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
        scrollIntoView(prevIndex);
        onItemChange(value, prevIndex);
      }
    }
    if (evt.key === "ArrowRight") {
      const nextIndex = activeItemIndex + 1;
      const child = getByIndex(children, nextIndex);
      if (child && onItemChange) {
        const { value } = child.props;
        scrollIntoView(nextIndex);
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

    scrollIntoView(childIndex);
  };

  const onChildComplete = () => {
    onComplete();
  };

  const checkWidthOfContainer = () => {
    const widthOfContainer = containerRef.current.scrollWidth;
    setContainerWidth(widthOfContainer);

    return ITEM_WIDTH * children.length > widthOfContainer;
  };

  const [position, setPosition] = useState({ x: 0 });
  const moveItemsLeft = () => {
    if (
      Math.abs(position.x) <
      ITEM_WIDTH * children.length - containerWidth / 2
    ) {
      setPosition({ x: position.x - 140 });
    }
  };

  const moveItemsRight = () => {
    if (position.x < 0) {
      setPosition({ x: position.x + 140 });
    }
  };

  const scrollIntoView = (index: number) => {
    if (checkWidthOfContainer()) {
      console.log(isScrolling);
      const containerWidth = containerRef.current.offsetWidth;
      const centerPosition = containerWidth / 2 - ITEM_WIDTH;
      setPosition({ x: position.x = -ITEM_WIDTH * index + centerPosition });
    }
  };

  useEffect(() => {
    const enableScrolling = checkWidthOfContainer();
    setIsScrolling(enableScrolling);
  }, [isActive]);

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

      <Keyboard onKeyDown={handleOnKeyDown}>
        <div
          ref={containerRef as any}
          className={`multi-dd__scrolling ${isScrolling ? "scrolling" : ""} ${
            isActive ? "" : "hidden"
          }`}
        >
          {isScrolling && (
            <IconButton
              tabIndex={isActive ? 0 : -1}
              onClick={moveItemsRight}
              icon="keyboard_arrow_left"
            ></IconButton>
          )}
          <div className="multi-dd__scrolling-container">
            <motion.ul
              ref={innerContainerRef as any}
              tabIndex={isActive ? 0 : -1}
              animate={position}
              role="listbox"
              aria-activedescendant={activeItem}
              className={`multi-dd__option-content`}
            >
              {mapChildren(
                children as typeof MultiTierDropdownOption[],
                (child, itemIndex) => {
                  return React.cloneElement(child as any, {
                    onItemChange: onChildItemChange,
                    onComplete: onChildComplete,
                    activeItem,
                    itemIndex,
                    modelValue,
                  });
                }
              )}
            </motion.ul>
          </div>

          {isScrolling && (
            <IconButton
              tabIndex={isActive ? 0 : -1}
              onClick={moveItemsLeft}
              icon="keyboard_arrow_right"
            ></IconButton>
          )}
        </div>
      </Keyboard>
    </div>
  );
};

export default MultiTierDropdownItem;
