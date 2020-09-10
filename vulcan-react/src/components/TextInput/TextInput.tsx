import { Button, Drop, InfiniteScroll, Keyboard } from "@components";
import { AnnounceContext } from "@core/contexts/AnnounceContext";
import { FormContext } from "@core/contexts/FormContext";
import {
  isNodeAfterScroll,
  isNodeBeforeScroll,
  useForwardedRef,
} from "@core/utils";
import classNames from "classnames";
import { DropProps } from "components/Drop/DropContainer";
import { FieldMetaProps } from "formik";
import { motion, Variants } from "framer-motion";
import React, {
  forwardRef,
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./TextInput.scss";

const defaultMessages = {
  enterSelect: "(Press Enter to Select)",
  suggestionsCount: "suggestions available",
  suggestionsExist: "This input has suggestions use arrow keys to navigate",
  suggestionIsOpen:
    "Suggestions drop is open, continue to use arrow keys to navigate",
};

type Suggestion = string | number | { label?: string; value?: string };

const renderLabel = (suggestion: Suggestion) => {
  if (suggestion && typeof suggestion === "object") {
    return suggestion.label || suggestion.value;
  }
  return suggestion;
};

const stringLabel = (suggestion: Suggestion) => {
  if (suggestion && typeof suggestion === "object") {
    if (suggestion.label && typeof suggestion.label === "string") {
      return suggestion.label;
    }
    return suggestion.value;
  }
  return suggestion;
};

type InputTypes =
  | "email"
  | "month"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export interface TextInputProps {
  a11yTitle: string;
  type?: InputTypes;
  autoComplete?: string;
  classOverride?: "Text" | "Select";
  dropAlign?: {
    top?: "top" | "bottom";
    bottom?: "top" | "bottom";
    right?: "left" | "right";
    left?: "left" | "right";
  };
  dropHeight?: "xsmall" | "small" | "medium" | "large" | "xlarge" | string;
  dropTarget?: object;
  dropProps?: DropProps;
  focusIndicator?: boolean;
  icon?: JSX.Element;
  id?: string;
  messages?: {
    enterSelect?: string;
    suggestionsCount?: string;
    suggestionsExist?: string;
    suggestionIsOpen?: string;
    onSuggestionsClose?: () => void;
  };
  name: string;
  onSelect?: (x: {
    target: React.RefObject<HTMLElement>["current"];
    suggestion: any;
  }) => void;
  onSuggestionsOpen?: () => void;
  onSuggestionsClose?: () => void;
  onSuggestionSelect?: () => void;
  placeholder?: string;
  reverse?: boolean;
  readOnly: boolean;
  size?: "single" | "small" | "medium" | "large" | "xlarge" | string;
  suggestions?: ({ label?: React.ReactNode; value?: any } | string)[];
  value?: string | number;
  defaultValue?: string | number | any;
  meta?: FieldMetaProps<any>;
  children?: any;
  [param: string]: any;
}

const TextInput = forwardRef(
  (
    {
      a11yTitle,
      classOverride = "Text",
      defaultValue,
      dropAlign = { top: "bottom", left: "left" },
      dropHeight,
      dropTarget,
      dropProps,
      icon,
      id,
      messages = defaultMessages,
      meta,
      name,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onSelect,
      onSuggestionSelect,
      onSuggestionsClose,
      onSuggestionsOpen,
      placeholder,
      plain,
      readOnly,
      size = "medium",
      type = "text",
      reverse,
      suggestions,
      value: valueProp,
      ...rest
    }: TextInputProps,
    ref
  ) => {
    const announce = useContext(AnnounceContext);
    const formContext = useContext(FormContext);
    const inputRef = useForwardedRef(ref);
    const dropRef = useRef();
    const suggestionsRef = useRef();
    const suggestionRefs: any = {};

    const [value, setValue] = formContext.useFormInput(
      readOnly ? undefined : name,
      valueProp
    );

    const [focus, setFocus] = useState<boolean>();
    const [showDrop, setShowDrop] = useState<boolean>();

    const handleSuggestionSelect = useMemo(
      () => (onSelect && !onSuggestionSelect ? onSelect : onSuggestionSelect),
      [onSelect, onSuggestionSelect]
    );
    const handleTextSelect = useMemo(
      () => (onSelect && onSuggestionSelect ? onSelect : undefined),
      [onSelect, onSuggestionSelect]
    );

    useEffect(() => {
      if (showDrop && (!suggestions || !suggestions.length)) {
        setShowDrop(false);
        if (onSuggestionsClose) onSuggestionsClose();
      }
    }, [onSuggestionsClose, showDrop, suggestions]);

    useEffect(() => {
      if (focus && !showDrop && suggestions && suggestions.length) {
        setShowDrop(true);
        if (onSuggestionsOpen) onSuggestionsOpen();
      }
    }, [onSuggestionsOpen, suggestions]);
    /* eslint-enable react-hooks/exhaustive-deps */

    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(
      -1
    );

    useEffect(() => {
      if (activeSuggestionIndex !== -1 && !showDrop) {
        setActiveSuggestionIndex(-1);
      }
    }, [activeSuggestionIndex, showDrop]);

    useEffect(() => {
      if (activeSuggestionIndex >= 0) {
        const label = stringLabel(suggestions[activeSuggestionIndex] as string);
        announce(`${label} ${messages.enterSelect}`);
      }
    }, [activeSuggestionIndex, announce, messages, suggestions]);

    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

    useEffect(() => {
      if (suggestions) {
        const suggestionValues = suggestions.map((suggestion) =>
          typeof suggestion === "object" ? suggestion.value : suggestion
        );
        setSelectedSuggestionIndex(suggestionValues.indexOf(value));
      } else setSelectedSuggestionIndex(-1);
    }, [suggestions, value]);

    useEffect(() => {
      const buttonNode = suggestionRefs[activeSuggestionIndex];
      const optionsNode = suggestionsRef.current as HTMLElement;
      if (
        buttonNode &&
        isNodeAfterScroll(buttonNode, optionsNode) &&
        optionsNode.scrollTo
      ) {
        optionsNode.scrollTo(
          0,
          buttonNode.offsetTop -
            (optionsNode.getBoundingClientRect().height -
              buttonNode.getBoundingClientRect().height)
        );
      }
      if (
        buttonNode &&
        isNodeBeforeScroll(buttonNode, optionsNode) &&
        optionsNode.scrollTo
      ) {
        optionsNode.scrollTo(0, buttonNode.offsetTop);
      }
    }, [activeSuggestionIndex, suggestionRefs]);

    const openDrop = useCallback(() => {
      setShowDrop(true);
      announce(messages?.suggestionIsOpen);
      announce(`${suggestions.length} ${messages.suggestionsCount}`);
      if (onSuggestionsOpen) onSuggestionsOpen();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      announce,
      messages.suggestionsCount,
      messages.suggestionIsOpen,
      onSuggestionsOpen,
      suggestions,
    ]);

    const closeDrop = useCallback(() => {
      setShowDrop(false);
      if (messages.onSuggestionsClose) {
        onSuggestionsClose();
      }
      if (onSuggestionsClose) {
        onSuggestionsClose();
      }
    }, [messages.onSuggestionsClose, onSuggestionsClose]);

    const onNextSuggestion = (event: SyntheticEvent) => {
      event.preventDefault();
      const nextActiveIndex = Math.min(
        activeSuggestionIndex + 1,
        suggestions.length - 1
      );
      setActiveSuggestionIndex(nextActiveIndex);
    };

    const onPreviousSuggestion = (event: SyntheticEvent) => {
      event.preventDefault();
      const nextActiveIndex = Math.max(activeSuggestionIndex - 1, 0);
      setActiveSuggestionIndex(nextActiveIndex);
    };

    const showStyledPlaceholder =
      placeholder && typeof placeholder !== "string" && !value;

    let drop;
    const extraProps = {
      onSelect: handleTextSelect,
    };

    const inputClasses = classNames({
      [`${classOverride}Input__input`]: true,
      [`${classOverride}Input--${type}`]: true,
    });

    const containerClasses = classNames({
      [`${classOverride}Input__input__container`]: true,
      [`${classOverride}Input--${size}`]: true,
      "field--invalid": meta && meta.touched && meta.error,
      "field--valid": meta && meta.touched && !meta.error,
    });

    const animationVarients: Variants = {
      inactive: {
        y: 0,
        borderColor: "var(--border-color)",
      },
      errors: {
        x: [0, -3, 3, 0],
        borderColor: "var(--warn-color)",
        transition: {
          ease: "easeInOut",
          duration: 0.4,
          repeat: 1,
          repeatType: "reverse",
        },
      },
      active: {
        y: 10,
        borderColor: "var(--highlight-color)",
        transition: {
          ease: "easeInOut",
          duration: 0.25,
          repeat: 1,
          repeatType: "reverse",
        },
      },
    };

    if (showDrop) {
      drop = (
        // keyboard access needed here in case user clicks
        // and drags on scroll bar and focus shifts to drop
        <Keyboard
          onDown={(event: SyntheticEvent) => onNextSuggestion(event)}
          onUp={(event: SyntheticEvent) => onPreviousSuggestion(event)}
          onEnter={(event: SyntheticEvent) => {
            // we stole the focus, give it back
            inputRef.current.focus();
            closeDrop();
            if (handleSuggestionSelect) {
              const adjustedEvent = event as any;
              adjustedEvent.suggestion = suggestions[activeSuggestionIndex];
              handleSuggestionSelect(adjustedEvent);
            }
            setValue(suggestions[activeSuggestionIndex]);
          }}
        >
          <Drop
            ref={dropRef}
            id={id ? `text-input-drop__${id}` : undefined}
            align={dropAlign}
            responsive={false}
            target={dropTarget || inputRef.current}
            onClickOutside={closeDrop}
            onEsc={closeDrop}
            {...dropProps}
          >
            <div ref={suggestionsRef}>
              <div className={`${classOverride}Input__suggestions`}>
                <InfiniteScroll items={suggestions} step={20}>
                  {(suggestion: Suggestion, index: number, itemRef: any) => {
                    // Determine whether the label is done as a child or
                    // as an option Button kind property.
                    const renderedLabel = renderLabel(suggestion);
                    let child;
                    if (typeof renderedLabel !== "string")
                      // must be an element rendered by suggestions.label
                      child = renderedLabel;
                    // don't have theme support, need to layout here
                    else
                      child = (
                        <div className={`${classOverride}Input__suggestion`}>
                          {renderedLabel}
                        </div>
                      );
                    // if we have a child, turn on plain, and hoverIndicator

                    return (
                      <li
                        key={`${stringLabel(suggestion)}-${index}`}
                        ref={itemRef}
                      >
                        <Button
                          active={
                            activeSuggestionIndex === index ||
                            selectedSuggestionIndex === index
                          }
                          ref={(r) => {
                            suggestionRefs[index] = r;
                          }}
                          fill
                          plain={!child ? undefined : true}
                          align="start"
                          kind={!child ? "option" : undefined}
                          hoverIndicator={!child ? undefined : "background"}
                          label={!child ? renderedLabel : undefined}
                          onClick={(event: SyntheticEvent) => {
                            // we stole the focus, give it back
                            inputRef.current.focus();
                            closeDrop();
                            if (handleSuggestionSelect) {
                              event.persist();
                              const adjustedEvent = event as any;
                              adjustedEvent.suggestion = suggestion;
                              adjustedEvent.target = inputRef.current;
                              handleSuggestionSelect(adjustedEvent);
                            }
                            setValue(suggestion);
                          }}
                          onMouseOver={() => setActiveSuggestionIndex(index)}
                          onFocus={() => setActiveSuggestionIndex(index)}
                        >
                          {child}
                        </Button>
                      </li>
                    );
                  }}
                </InfiniteScroll>
              </div>
            </div>
          </Drop>
        </Keyboard>
      );
    }

    return (
      <motion.div variants={animationVarients} className={containerClasses}>
        {showStyledPlaceholder && (
          <div className={`${classOverride}Input__placeholder`}>
            {placeholder}
          </div>
        )}
        {icon && <div className={`${classOverride}Input__icon`}>{icon}</div>}
        <Keyboard
          onEnter={(event: SyntheticEvent) => {
            closeDrop();
            if (activeSuggestionIndex >= 0 && handleSuggestionSelect) {
              // prevent submitting forms when choosing a suggestion
              event.preventDefault();
              event.persist();
              const adjustedEvent = event as any;
              adjustedEvent.suggestion = suggestions[activeSuggestionIndex];
              adjustedEvent.target = inputRef.current;
              handleSuggestionSelect(adjustedEvent);
            }
          }}
          onEsc={
            showDrop
              ? (event: SyntheticEvent) => {
                  closeDrop();
                  // we have to stop both synthetic events and native events
                  // drop and layer should not close by pressing esc on this
                  // input
                  event.stopPropagation();
                  event.nativeEvent.stopImmediatePropagation();
                }
              : undefined
          }
          onTab={showDrop ? closeDrop : undefined}
          onUp={
            showDrop &&
            suggestions &&
            suggestions.length > 0 &&
            activeSuggestionIndex
              ? (event: SyntheticEvent) => {
                  onPreviousSuggestion(event);
                }
              : undefined
          }
          onDown={
            suggestions && suggestions.length > 0
              ? (event: SyntheticEvent) => {
                  if (!showDrop) {
                    openDrop();
                  } else {
                    onNextSuggestion(event);
                  }
                }
              : undefined
          }
          onKeyDown={onKeyDown}
        >
          <input
            className={inputClasses}
            aria-label={a11yTitle}
            ref={inputRef}
            id={id}
            name={name}
            autoComplete="off"
            type={type}
            placeholder={
              typeof placeholder === "string" ? placeholder : undefined
            }
            // icon={icon}
            // reverse={reverse}
            // focus={focus}
            {...rest}
            // {...extraProps}
            defaultValue={renderLabel(defaultValue) as string}
            value={renderLabel(value) as string}
            readOnly={readOnly}
            onFocus={(event: SyntheticEvent) => {
              setFocus(true);
              if (suggestions && suggestions.length > 0) {
                announce(messages.suggestionsExist);
                openDrop();
              }
              if (onFocus) onFocus(event);
            }}
            onBlur={(event: SyntheticEvent) => {
              setFocus(false);
              if (onBlur) onBlur(event);
            }}
            onChange={
              readOnly
                ? undefined
                : (event: any) => {
                    setValue(event.target.value);
                    if (onChange) onChange(event);
                  }
            }
          />
        </Keyboard>
        {drop}
      </motion.div>
    );
  }
);
export default TextInput;
