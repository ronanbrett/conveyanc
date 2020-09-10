import React, {
  FC,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./Select.scss";
import { SelectContainer } from "./SelectContainer";
import { Keyboard, DropButton, TextInput, IconButton } from "@components";
import { applyKey } from "./select.utils";
import { FormContext } from "@core/contexts/FormContext";
import { isObject } from "lodash-es";

export interface SelectProps {
  children?: any;
  a11yTitle?: string;
  alignSelf?: string;
  closeOnChange?: boolean;
  disabled?: boolean | (number | string | object)[];
  disabledKey?: string | ((...args: any[]) => any);
  dropAlign?: any;
  dropHeight?: number;
  dropProps?: any;
  dropTarget?: object;
  emptySearchMessage?: string;
  focusIndicator?: boolean;
  id: string;
  icon?: boolean | ((...args: any[]) => any) | React.ReactNode;
  labelKey?: string | ((...args: any[]) => any);
  margin?: number;
  messages?: { multiple?: string };
  multiple?: boolean;
  name: string;
  onChange?: (...args: any[]) => void;
  onClose?: (...args: any[]) => any;
  onClick?: (...args: any[]) => any;
  onMore?: (...args: any[]) => any;
  onOpen?: (...args: any[]) => any;
  onKeyDown?: (...args: any[]) => any;

  onSearch?: (search: string) => void;
  options: (string | boolean | number | JSX.Element | object)[];
  optionIndexesInValue?: any[];
  open?: boolean;
  placeholder: string;
  plain?: boolean;
  replace?: boolean;
  searchPlaceholder?: string;
  selected?: number | number[];
  size?: "small" | "medium" | "large" | "xlarge" | string;
  value?: string | JSX.Element | object | (string | object)[];
  valueLabel?: React.ReactNode;
  valueKey?:
    | string
    | { key: string; reduce?: boolean }
    | ((...args: any[]) => any);
}

const defaultMessages = { multiple: "multiple" };

const Select = forwardRef(
  (
    {
      a11yTitle,
      alignSelf,
      children,
      closeOnChange = true,
      disabled,
      disabledKey,
      dropAlign = { top: "bottom", right: "right" },
      dropHeight,
      dropProps,
      dropTarget,
      emptySearchMessage,
      focusIndicator,
      id,
      icon,
      labelKey,
      margin,
      messages = defaultMessages,
      multiple,
      name,
      onChange,
      onClick,
      onClose,
      onKeyDown,
      onMore,
      onOpen,
      onSearch,
      open: propOpen,
      options,
      placeholder,
      plain,
      replace,
      searchPlaceholder,
      selected,
      size,
      value: valueProp,
      valueKey,
      valueLabel,
      ...rest
    }: SelectProps,
    ref
  ) => {
    const inputRef = useRef();
    const formContext = useContext(FormContext);

    // value is used for what we receive in valueProp and the basis for
    // what we send with onChange
    const [value, setValue] = formContext.useFormInput(name, valueProp, "");
    // valuedValue is the value mapped with any valueKey applied
    const valuedValue = useMemo(() => {
      if (Array.isArray(value))
        return value.map((v) =>
          valueKey && isObject(valueKey) ? v : applyKey(v, valueKey)
        );
      return valueKey && isObject(valueKey) ? value : applyKey(value, valueKey);
    }, [value, valueKey]);

    // the option indexes present in the value
    const optionIndexesInValue = useMemo(() => {
      const result: any = [];
      options.forEach((option, index) => {
        if (selected !== undefined) {
          if (Array.isArray(selected)) {
            if (selected.indexOf(index) !== -1) result.push(index);
          } else if (index === selected) {
            result.push(index);
          }
        } else if (Array.isArray(valuedValue)) {
          if (valuedValue.some((v) => v === applyKey(option, valueKey))) {
            result.push(index);
          }
        } else if (valuedValue === applyKey(option, valueKey)) {
          result.push(index);
        }
      });

      return result;
    }, [options, selected, valueKey, valuedValue]);

    const [open, setOpen] = useState(propOpen);
    useEffect(() => setOpen(propOpen), [propOpen]);

    const onRequestOpen = useCallback(() => {
      if (open) return;
      setOpen(true);
      if (onOpen) onOpen();
    }, [onOpen, open]);

    const onRequestClose = useCallback(() => {
      setOpen(false);
      if (onClose) onClose();
    }, [onClose]);

    const onSelectChange = useCallback(
      (event, { option, value: nextValue, selected: nextSelected }) => {
        if (closeOnChange) onRequestClose();
        setValue(nextValue);
        if (onChange) {
          event.persist();
          const adjustedEvent = event;
          adjustedEvent.target = inputRef.current;
          adjustedEvent.value = nextValue;
          adjustedEvent.option = option;
          adjustedEvent.selected = nextSelected;
          onChange(adjustedEvent);
        }
      },
      [closeOnChange, onChange, onRequestClose, setValue]
    );

    let SelectIcon;
    switch (icon) {
      case false:
        break;
      case true:
      case undefined:
        SelectIcon = open && (
          <IconButton size="mini" icon="keyboard_arrow_up" />
        ) ? (
          <IconButton size="mini" icon="keyboard_arrow_up" />
        ) : (
          <IconButton size="mini" icon="keyboard_arrow_down" />
        );
        break;
      default:
        SelectIcon = icon;
    }

    // element to show, trumps inputValue
    const selectValue = useMemo(() => {
      if (valueLabel) return valueLabel;
      if (React.isValidElement(value)) return value; // deprecated
      return undefined;
    }, [value, valueLabel]);

    // text to show
    const inputValue = useMemo(() => {
      if (!selectValue) {
        if (optionIndexesInValue.length === 0) return "";
        if (optionIndexesInValue.length === 1)
          return applyKey(options[optionIndexesInValue[0]], labelKey);
        return messages.multiple;
      }
      return undefined;
    }, [labelKey, messages, optionIndexesInValue, options, selectValue]);

    return (
      <Keyboard onDown={onRequestOpen} onUp={onRequestOpen}>
        <DropButton
          ref={ref}
          id={id}
          disabled={disabled === true || undefined}
          dropAlign={{ top: "bottom", left: "left" }}
          dropTarget={dropTarget}
          open={open}
          alignSelf={alignSelf}
          focusIndicator={focusIndicator}
          margin={margin}
          onOpen={onRequestOpen}
          onClose={onRequestClose}
          onClick={onClick}
          size="small"
          buttonType="outline"
          dropContent={
            <SelectContainer
              disabled={disabled}
              disabledKey={disabledKey}
              dropHeight={dropHeight}
              emptySearchMessage={emptySearchMessage}
              id={id}
              labelKey={labelKey}
              multiple={multiple}
              name={name}
              onChange={onSelectChange}
              onKeyDown={onKeyDown}
              onMore={onMore}
              onSearch={onSearch}
              options={options}
              optionIndexesInValue={optionIndexesInValue}
              replace={replace}
              searchPlaceholder={searchPlaceholder}
              selected={selected}
              value={value}
              valueKey={valueKey}
            >
              {children}
            </SelectContainer>
          }
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexBasis: "auto",
              }}
            >
              {selectValue || (
                <TextInput
                  a11yTitle={
                    a11yTitle &&
                    `${a11yTitle}${
                      value && typeof value === "string" ? `, ${value}` : ""
                    }`
                  }
                  classOverride="Select"
                  // When Select is disabled, we want to show a default cursor
                  // but not have disabled styling come from TextInput
                  // Disabled can be a bool or an array of options to disable.
                  // We only want to disable the TextInput if the control
                  // button should be disabled which occurs when disabled
                  // equals true.
                  defaultCursor={disabled === true || undefined}
                  id={id ? `${id}__input` : undefined}
                  name={name}
                  ref={inputRef}
                  {...rest}
                  tabIndex="-1"
                  type="text"
                  placeholder={placeholder}
                  plain
                  readOnly
                  value={inputValue}
                  size={size}
                />
              )}
            </div>
            {SelectIcon && (
              <div style={{ minWidth: "auto", flex: 0 }}>
                {isValidElement(SelectIcon) ? (
                  SelectIcon
                ) : (
                  <IconButton icon="home" />
                )}
              </div>
            )}
          </div>
        </DropButton>
      </Keyboard>
    );
  }
);

Select.displayName = "Select";

// export const Select = () => {};

export default Select;
