import React, { useState } from "react";

import CharacterInput from "./CharacterInput";

import { action } from "@storybook/addon-actions";

export default {
  title: "Components/CharacterInput",
  decorators: [],
  component: CharacterInput,
};

export const Default = (props) => {
  return <CharacterInput size={7} value="D08XKT1" {...props}></CharacterInput>;
};

export const WithErrors = (props) => {
  const [errors, setErrors] = useState<string[]>();

  return (
    <div>
      <CharacterInput
        errors={errors}
        size={7}
        value="D08XKT1"
        {...props}
      ></CharacterInput>

      <button onClick={() => setErrors(["newError"])}>Add Error</button>
    </div>
  );
};
