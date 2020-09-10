import { InfiniteScroll, Keyboard, Button } from "@components";
import { setFocusWithoutScroll } from "@core/utils/dom.utils";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { applyKey } from "./select.utils";
import { SelectProps } from "./Select";
import { isArray, isFunction, isObject } from "lodash-es";
import { TextInput, IconButton } from "@components";

type SelectContainerProps = {
  children: any;
  disabled?: boolean;
  disabledKey?: string;
  dropHeight: number;
  emptySearchMessage: string;
  id: string;
  labelKey?: string;
  name?: string;
  multiple: boolean;
  onChange?: (event: any, options: any) => void;
  onKeyDown?: () => void;
  onMore?: () => void;
  onSearch?: () => void;
  optionIndexesInValue: any[];
  options: any[];
  searchPlaceholder?: string;
  selected: string;
  value: string;
  valueKey: any;
  replace: boolean;
};

const SelectContainer = forwardRef(
  (
    {
      children = null,
      disabled,
      disabledKey,
      dropHeight,
      emptySearchMessage = "No matches found",
      id,
      labelKey,
      multiple,
      onChange,
      onKeyDown,
      onMore,
      onSearch,
      optionIndexesInValue,
      options,
      searchPlaceholder,
      selected,
      value = "",
      valueKey,
      replace = true,
    }: Partial<SelectProps>,
    ref
  ) => {
    const [search, setSearch] = useState();
    const [activeIndex, setActiveIndex] = useState(-1);
    const [keyboardNavigation, setKeyboardNavigation] = useState<boolean>();
    const searchRef = useRef<HTMLElement>();
    const optionsRef = useRef<HTMLElement>();

    useEffect(() => {
      if (activeIndex === -1 && search && optionIndexesInValue.length) {
        setActiveIndex(optionIndexesInValue[0]);
      }
    }, [activeIndex, optionIndexesInValue, search]);

    useEffect(() => {
      // need to wait for Drop to be ready
      const timer = setTimeout(() => {
        const optionsNode = optionsRef.current;
        if (onSearch) {
          const searchInput = searchRef.current;
          if (searchInput && searchInput.focus) {
            setFocusWithoutScroll(searchInput);
          }
        } else if (optionsNode) {
          setFocusWithoutScroll(optionsNode);
        }
      }, 100);
      return () => clearTimeout(timer);
    }, [onSearch]);

    useEffect(() => {
      if (keyboardNavigation) {
        // 100ms was empirically determined
        const timer = setTimeout(() => setKeyboardNavigation(false), 100);
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [keyboardNavigation]);

    const optionLabel = useCallback(
      (index) => applyKey(options[index], labelKey),
      [labelKey, options]
    );

    const optionValue = useCallback(
      (index) => applyKey(options[index], valueKey),
      [options, valueKey]
    );

    const getValueKeyArr = (value: any, key: any) => {
      return value[key];
    };

    const isDisabled = useCallback(
      (index) => {
        const option = options[index];
        let result;
        if (disabledKey) {
          result = applyKey(option, disabledKey);
        } else if (Array.isArray(disabled)) {
          if (typeof disabled[0] === "number") {
            result = disabled.indexOf(index) !== -1;
          } else {
            const optionVal = optionValue(index);
            result = disabled.indexOf(optionVal) !== -1;
          }
        }
        return result;
      },
      [disabled, disabledKey, options, optionValue]
    );

    const isSelected = useCallback(
      (index) => {
        let result;
        if (selected && isArray(selected)) {
          // deprecated in favor of value
          result = selected.indexOf(index) !== -1;
        } else {
          const optionVal = optionValue(index);
          if (Array.isArray(value)) {
            if (value.length === 0) {
              result = false;
            } else if (typeof value[0] !== "object") {
              result = value.indexOf(optionVal) !== -1;
            } else if (valueKey) {
              result = value.some((valueItem: any) => {
                const valueValue = isFunction(valueKey)
                  ? valueKey(valueItem)
                  : valueItem[valueKey as any];

                return valueValue === optionVal;
              });
            }
          } else if (valueKey && typeof value === "object") {
            let valueValue;
            if (isFunction(valueKey)) {
              valueValue = valueKey(value);
            } else {
              valueValue = getValueKeyArr(value, valueKey);
            }

            result = valueValue === optionVal;
          } else {
            result = value === optionVal;
          }
        }
        return result;
      },
      [optionValue, selected, value, valueKey]
    );
    const selectOption = useCallback(
      (index) => (event: any) => {
        if (onChange) {
          let nextValue;
          let nextSelected;
          if (multiple) {
            const nextOptionIndexesInValue = optionIndexesInValue.slice(0);
            const valueIndex = optionIndexesInValue.indexOf(index);
            if (valueIndex === -1) {
              nextOptionIndexesInValue.push(index);
            } else {
              nextOptionIndexesInValue.splice(valueIndex, 1);
            }
            nextValue = nextOptionIndexesInValue.map((i) =>
              valueKey && isObject(valueKey)
                ? applyKey(options[i], valueKey)
                : options[i]
            );
            nextSelected = nextOptionIndexesInValue;
          } else {
            nextValue =
              valueKey && isObject(valueKey)
                ? applyKey(options[index], valueKey)
                : options[index];
            nextSelected = index;
          }
          onChange(event, {
            option: options[index],
            value: nextValue,
            selected: nextSelected,
          });
        }
      },
      [multiple, onChange, optionIndexesInValue, options, valueKey]
    );

    const onNextOption = useCallback(
      (event) => {
        event.preventDefault();
        let nextActiveIndex = activeIndex + 1;
        while (
          nextActiveIndex < options.length &&
          isDisabled(nextActiveIndex)
        ) {
          nextActiveIndex += 1;
        }
        if (nextActiveIndex !== options.length) {
          setActiveIndex(nextActiveIndex);
          setKeyboardNavigation(true);
        }
      },
      [activeIndex, isDisabled, options]
    );

    const onPreviousOption = useCallback(
      (event) => {
        event.preventDefault();
        let nextActiveIndex = activeIndex - 1;
        while (nextActiveIndex >= 0 && isDisabled(nextActiveIndex)) {
          nextActiveIndex -= 1;
        }
        if (nextActiveIndex >= 0) {
          setActiveIndex(nextActiveIndex);
          setKeyboardNavigation(true);
        }
      },
      [activeIndex, isDisabled]
    );

    const onActiveOption = useCallback(
      (index) => () => {
        if (!keyboardNavigation) setActiveIndex(index);
      },
      [keyboardNavigation]
    );

    const onSelectOption = useCallback(
      (event) => {
        if (activeIndex >= 0) {
          event.preventDefault(); // prevent submitting forms
          selectOption(activeIndex)(event);
        }
      },
      [activeIndex, selectOption]
    );

    return (
      <Keyboard
        onEnter={onSelectOption}
        onUp={onPreviousOption}
        onDown={onNextOption}
        onKeyDown={onKeyDown}
      >
        <div
          ref={ref as any}
          id={id ? `${id}__select-drop` : undefined}
          className={`Select__select-drop`}
          style={{ maxHeight: "inheritt" }}
        >
          {onSearch && (
            <div className="Select__search">
              <IconButton size="mini" icon="search" />
              <TextInput
                // focusIndicator={!customSearchInput}
                // size="small"
                ref={searchRef}
                type="search"
                classOverride="Select"
                value={search || ""}
                placeholder={searchPlaceholder}
                onChange={(event: any) => {
                  const nextSearch = event.target.value;
                  setSearch(nextSearch);
                  setActiveIndex(-1);
                  onSearch(nextSearch);
                }}
              />
            </div>
          )}

          <div
            role="menubar"
            tabIndex={-1}
            ref={optionsRef as any}
            className="Select__select-options"
          >
            {options.length > 0 ? (
              <InfiniteScroll
                items={options}
                step={50}
                onMore={onMore}
                replace={replace}
                show={activeIndex !== -1 ? activeIndex : undefined}
              >
                {(option: any, index: number, optionRef: any) => {
                  const optionDisabled = isDisabled(index);
                  const optionSelected = isSelected(index);
                  const optionActive = activeIndex === index;
                  // Determine whether the label is done as a child or
                  // as an option Button kind property.
                  let child;

                  if (children)
                    child = children(option, index, options, {
                      active: optionActive,
                      disabled: optionDisabled,
                      selected: optionSelected,
                    });
                  else
                    child = (
                      <div
                        className={`Select__option ${
                          optionActive ? "active" : ""
                        } ${optionSelected ? "selected" : ""}`}
                      >
                        <p>{optionLabel(index)}</p>
                      </div>
                    );

                  // if we have a child, turn on plain, and hoverIndicator

                  return (
                    <Button
                      className="Select__option-btn"
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      ref={optionRef}
                      tabIndex={-1}
                      role="menuitem"
                      //   plain={!child ? undefined : true}
                      //   align="start"
                      //   kind={!child ? 'option' : undefined}
                      //   hoverIndicator={!child ? undefined : 'background'}
                      //   label={!child ? optionLabel(index) : undefined}
                      disabled={optionDisabled || undefined}
                      active={optionActive}
                      selected={optionSelected}
                      option={option}
                      onMouseOver={
                        !optionDisabled ? onActiveOption(index) : undefined
                      }
                      onClick={
                        !optionDisabled ? selectOption(index) : undefined
                      }
                    >
                      {child}
                    </Button>
                  );
                }}
              </InfiniteScroll>
            ) : (
              <button
                key="search_empty"
                className={`Select__option-empty`}
                tabIndex={-1}
                role="menuitem"
                // hoverIndicator="background"
                disabled
                // option={emptySearchMessage}
              >
                <div>
                  <p>{emptySearchMessage}</p>
                </div>
              </button>
            )}
          </div>
        </div>
      </Keyboard>
    );
  }
);

export { SelectContainer };
