import { parseMetricToNum, arcCommands, translateEndAngle } from "@core/utils";
import React, { forwardRef, useContext } from "react";
import { ProgressProps } from "./Progress.interfaces";
import { motion, useMotionValue } from "framer-motion";

export const ProgressCircle = forwardRef(
  (props: Partial<ProgressProps>, ref: any) => {
    const {
      background,
      max,
      round,
      size,
      thickness,
      values,
      indeterminate,
      ...rest
    } = props;

    const width = size;
    const height = thickness;
    const mid = width / 2;
    const radius = width / 2 - height / 2;
    const anglePer = 360 / max;
    const someHighlight = (values || []).some((v: any) => v.highlight);

    let startValue = 0;
    let startAngle = 0;
    const paths: any[] = [];
    let pathCaps: any[] = [];

    (values || [])
      .filter((v) => v.value > 0)
      .forEach((valueArg, index) => {
        const {
          color,
          highlight,
          label,
          onHover,
          value,
          ...pathRest
        } = valueArg;
        const key = `p-${index}`;
        const colorName = color;

        let endAngle;
        if (startValue + value >= max) {
          endAngle = 360;
        } else {
          endAngle = Math.min(
            360,
            translateEndAngle(startAngle, anglePer, value)
          );
        }

        let hoverProps;
        if (onHover) {
          hoverProps = {
            onMouseOver: () => onHover(true),
            onMouseLeave: () => onHover(false),
          };
        }

        if (round) {
          const d1 = arcCommands(
            width / 2,
            width / 2,
            radius,
            startAngle,
            endAngle
          );
          console.log(d1);
          paths.unshift(
            <path
              key={key}
              d={d1}
              fill="none"
              // {...stroke}
              stroke="var(--highlight-color)"
              strokeWidth={height}
              strokeLinecap="round"
              {...hoverProps}
              {...pathRest}
            />
          );

          // To handle situations where the last values are small, redraw
          // a dot at the end. Give just a bit of angle to avoid anti-aliasing
          // leakage around the edge.
          const d2 = arcCommands(
            width / 2,
            width / 2,
            radius,
            endAngle - 0.5,
            endAngle
          );

          const pathCap = (
            <path
              key={`${key}-`}
              d={d2}
              fill="none"
              // {...stroke}
              stroke="var(--highlight-color)"
              strokeWidth={height}
              strokeLinecap="round"
              {...hoverProps}
              {...pathRest}
            />
          );
          // If we are on a large enough path to not need re-drawing previous
          // ones, clear the pathCaps we've collected already.
          if (endAngle - startAngle > 2 * anglePer) {
            pathCaps = [];
          }
          pathCaps.unshift(pathCap);
        } else if (indeterminate) {
          const d = arcCommands(width / 2, width / 2, radius, startAngle, 180);

          paths.push(
            <path
              key={key}
              d={d}
              className="animating"
              fill="none"
              // {...stroke}
              stroke="var(--highlight-color)"
              strokeWidth={height}
              strokeLinecap="butt"
              {...hoverProps}
              {...pathRest}
            />
          );
        } else {
          const d = arcCommands(
            width / 2,
            width / 2,
            radius,
            startAngle,
            endAngle
          );

          paths.push(
            <path
              key={key}
              d={d}
              fill="none"
              // {...stroke}
              stroke="var(--highlight-color)"
              strokeWidth={height}
              strokeLinecap="butt"
              {...hoverProps}
              {...pathRest}
            />
          );
        }
        startValue += value;
        startAngle = endAngle;
      });

    return (
      <svg
        className="Progress"
        ref={ref}
        viewBox={`0 0 ${width} ${width}`}
        width={!size ? "100%" : width}
        height={!size ? "100%" : width}
        {...rest}
      >
        <circle
          cx={mid}
          cy={mid}
          r={radius}
          stroke="var(--border-color)"
          strokeWidth={height}
          strokeLinecap={round ? "round" : "square"}
          fill="none"
        />
        {paths}
        {pathCaps}
      </svg>
    );
  }
);
