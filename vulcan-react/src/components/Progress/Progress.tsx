import React, { FC, forwardRef, useMemo } from "react";

import "./Progress.scss";
import { ProgressCircle } from "./ProgressCircle";
import { ProgressProps, ProgressValueProps } from "./Progress.interfaces";

const deriveMax = (values: ProgressValueProps[]) => {
  let max = 100;
  if (values && values.length > 1) {
    max = 0;
    values.forEach((v) => {
      max += v.value;
    });
  }
  return max;
};

const Progress = forwardRef(
  (
    {
      size = 25,
      thickness = 5,
      type = "circle",
      indeterminate,
      values,
      ...rest
    }: ProgressProps,
    ref
  ) => {
    const memoizedMax = useMemo(() => deriveMax(values), [values]);
    let content;
    if (type === "bar") {
      content = (
        <></>
        // <Bar
        //   ref={ref}
        //   max={memoizedMax}
        //   values={values}
        //   size={size}
        //   thickness={thickness}
        //   background={background}
        //   {...rest}
        // />
      );
    } else if (type === "circle") {
      content = (
        <ProgressCircle
          ref={ref}
          max={memoizedMax}
          values={values}
          size={size}
          thickness={thickness}
          indeterminate={indeterminate}
          {...rest}
        />
      );
    }
    return content;
  }
);
export default Progress;
