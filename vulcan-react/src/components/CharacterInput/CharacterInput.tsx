import { TextInput } from "@components";
import { FormContext } from "@core/contexts/FormContext";
import Keyboard from "components/Keyboard";
import { motion, useAnimation } from "framer-motion";
import React, {
  FC,
  SyntheticEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SyntheticEventData } from "react-dom/test-utils";
import "./CharacterInput.scss";

export interface CharacterInputProps {
  name?: string;
  value?: string;
  onChange?: (value?: string) => void;
  onUpdate?: (value?: string) => void;
  errors?: any[];
  size: number;
  children?: any;
}

const CharacterInput: FC<CharacterInputProps> = ({
  value: valueProp,
  onUpdate,
  name,
  errors,
  size,
  ...props
}) => {
  const [parts, setParts] = useState([]);
  const controls = useAnimation();
  const formContext = useContext(FormContext);

  const [value, setValue] = formContext.useFormInput(name, valueProp);

  const elRefs = React.useRef<HTMLInputElement[]>([]);

  useMemo(() => {
    if (!valueProp) {
      return setParts(new Array(size).fill(""));
    }

    if (valueProp.length > size) {
      throw new Error("Value doesnt fit");
    }

    setParts(valueProp.split(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    if (valueProp === "") {
      setParts(new Array(size).fill(""));
    }
  }, [valueProp, size]);

  useEffect(
    () => {
      const value = parts.join("");
      setValue(value);
      onUpdate(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parts]
  );

  useEffect(
    () => {
      if (errors?.length > 0) {
        triggerErrors();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [errors]
  );

  const validate = (char: string, index: number) => {
    const match = RegExp(/A-Za-z0-9/);
    return match.test(char);
  };

  const onChange = (e: any, index: number) => {
    const value = e.target.value as string;
    validate(value, index);

    const newParts = [...parts];
    newParts.splice(index, 1, value.toUpperCase());
    setParts(newParts);

    if (index === size - 1 && value) {
      triggerValidation();
    }
  };

  const onKeyPress = (e: any, index: number) => {
    if (elRefs && elRefs.current[index + 1]) {
      setTimeout(() => {
        elRefs.current[index + 1].focus();
        elRefs.current[index + 1].select();
      });
    }
  };

  const onClick = (index: number) => {
    elRefs.current[index].select();
  };

  const onBackspace = (value: string, index: number) => {
    if (value) {
      return;
    }
    if (elRefs && elRefs.current[index - 1]) {
      elRefs.current[index - 1].focus();
      elRefs.current[index - 1].select();
    }
  };

  const onPaste = (evt: any) => {
    evt.clipboardData?.items[0]?.getAsString((text: string) => {
      let arr = [...parts];
      const txt = text.replaceAll(" ", "").toUpperCase().split("");
      arr = arr.map((val, index) => {
        return txt[index] || "";
      });
      setParts(arr);

      if (txt.length === size) {
        setTimeout(() => {
          triggerValidation();
        });
      }
    });
  };

  const onEnter = () => {
    triggerValidation();
  };

  const triggerValidation = () => {
    controls.set("inactive");
    controls.start("active");
  };

  const triggerErrors = () => {
    controls.set("inactive");
    controls.start("errors");
  };

  const onEsc = () => {
    setParts(new Array(size).fill(""));
    elRefs.current[0].focus();
  };

  const list = {
    inactive: {},
    active: {
      transition: {
        ease: "easeOut",
        staggerChildren: 0.07,
        staggerDirection: -1,
      },
    },
    errors: {
      transition: {
        ease: "easeOut",
        staggerChildren: 0.07,
        staggerDirection: 1,
      },
    },
  };

  return (
    <div>
      <motion.div
        initial="inactive"
        animate={controls}
        className="CharacterInput"
        variants={list}
      >
        {parts.length > 0 ? (
          parts.map((val, index, ref) => (
            <Keyboard
              key={index}
              onEnter={onEnter}
              onEsc={onEsc}
              onBackspace={(evt: SyntheticEventData) =>
                onBackspace(elRefs.current[index].value, index)
              }
            >
              <TextInput
                key={index}
                onPaste={onPaste}
                ref={(el: HTMLInputElement) => (elRefs.current[index] = el)}
                pattern="[A-Za-z0-9]{1}"
                onClick={() => onClick(index)}
                onChange={(evt: SyntheticEvent) => onChange(evt, index)}
                onKeyPress={(evt: SyntheticEvent) => onKeyPress(evt, index)}
                maxLength={1}
                size="single"
                type="text"
                value={val}
              />
            </Keyboard>
          ))
        ) : (
          <div></div>
        )}
      </motion.div>
    </div>
  );
};

export default CharacterInput;
