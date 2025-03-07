// import { normalizeColor } from "../../utils";

import { CSSObject } from "styled-components";

// export const strokeProps = (color: any) => {
//   const result: CSSObject = {};
//   if (color) {
//     if (typeof color === "object") {
//       result.stroke = "var(--highlight-color)";
//       if (color.opacity) {
//         result.strokeOpacity = 1;
//       }
//     } else {
//       result.stroke = normalizeColor(color, theme);
//     }
//   }
//   return result;
// };

// const neutralExp = /^neutral-\d+/;

// export const defaultColor = (index, theme, valuesLength) => {
//   if (index === valuesLength - 1 && theme.meter.color) {
//     return theme.meter.color;
//   }
//   // We want the last value to have the first color
//   const colorIndex = valuesLength - index - 1;
//   if (theme.meter && theme.meter.colors) {
//     const colors =
//       theme.meter.colors[theme.dark ? "dark" : "light"] || theme.meter.colors;
//     return colors[colorIndex % colors.length];
//   }
//   const colors = Object.keys(theme.global.colors).filter((n) =>
//     n.match(/^graph-[0-9]$/)
//   );
//   if (colors.length > 0) {
//     return colors[colorIndex % colors.length];
//   }
//   // Deprecate using "neutral-*" color names. Remove eventually.
//   const neutralColors = Object.keys(theme.global.colors).filter((k) =>
//     neutralExp.test(k)
//   );
//   return neutralColors[colorIndex % neutralColors.length];
// };
