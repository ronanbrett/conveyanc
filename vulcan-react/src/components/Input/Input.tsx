import React, { FC } from "react";

import "./Input.scss";

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

interface InputProps {
  type?: InputTypes;
  autocomplete?: string;
  children?: any;
}

const Input: FC<InputProps> = ({ type, autocomplete, ...props }) => {
  return (
    <input
      className="Input"
      type={type}
      autoComplete={autocomplete}
      {...props}
    />
  );
};

Input.defaultProps = {
  type: "text",
  autocomplete: "off",
};

export default Input;
