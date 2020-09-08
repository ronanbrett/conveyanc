import React, { CSSProperties, useEffect } from "react";

const GLOBAL_FONT_SIZE = 16;
export const DEFAULT_SPACINGS = {
  xtiny: 0.125,
  tiny: 0.25,
  small: 0.5,
  med: 1,
  medX: 1.5,
  large: 2,
  xLarge: 3,
  huge: 4,
  xHuge: 8,
};

export const getSpacingCSSVars = () => ({
  "--spacing-xxs": `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.xtiny}px`,
  "--spacing-xs": `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.tiny}px`,
  "--spacing-s": `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.small}px`,
  "--spacing-m": `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.med}px`,
  "--spacing-mx": `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.medX}px`,
  "--spacing-l": `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.large}px`,
  "--spacing-xl": `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.xLarge}px`,
  "--spacing-xxl": `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.huge}px`,
  "--spacing-xxxl": `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.xHuge}px`,
});

const LIGHT_THEME_COLORS = {
  bgColor: "#f1f2f6",
  whiteColor: "#ffffff",
  highlightColor: "#5BF69F",
  borderColor: "#DADADA",
  borderLightColor: "#F1F2F6",
  warnColor: "#F65B5B",
};

const lightTheme: { [property: string]: string } = {
  "--border-radius": "8px",
  "--bg-color": `${LIGHT_THEME_COLORS.bgColor}`,
  "--white-color": `${LIGHT_THEME_COLORS.whiteColor}`,
  "--highlight-color": `${LIGHT_THEME_COLORS.highlightColor}`,
  "--warn-color": `${LIGHT_THEME_COLORS.warnColor}`,
  "--border-color": `${LIGHT_THEME_COLORS.borderColor}`,
  "--border-light-color": `${LIGHT_THEME_COLORS.borderLightColor}`,
  ...getSpacingCSSVars(),
};

const darkTheme: { [property: string]: string } = {
  "--border-radius": "8px",
  "--bg-color": `${LIGHT_THEME_COLORS.bgColor}`,
  "--white-color": `${LIGHT_THEME_COLORS.whiteColor}`,
  "--highlight-color": `${LIGHT_THEME_COLORS.highlightColor}`,
  "--warn-color": `${LIGHT_THEME_COLORS.warnColor}`,

  "--border-color": `${LIGHT_THEME_COLORS.borderColor}`,
  "--border-light-color": `${LIGHT_THEME_COLORS.borderLightColor}`,
  ...getSpacingCSSVars(),
};

const applyTheme = (nextTheme: any) => {
  const theme = nextTheme === "dark" ? lightTheme : darkTheme;
  Object.keys(theme).map((key: any) => {
    const value: any = theme[key];
    document.documentElement.style.setProperty(key, value);
  });
};

export const GlobalStyleProvider = ({ children }: { children: any }) => {
  // const [currentTheme, setTheme] = React.useState("light");

  useEffect(() => {
    console.log("applying");
    applyTheme(lightTheme);
  }, []);

  // const swapTheme = () => {
  //   const nextTheme = currentTheme === "light" ? "dark" : "light";
  //   setTheme(nextTheme);
  //   applyTheme(lightTheme);
  // };
  // applyTheme(lightTheme);

  return <div>{children}</div>;
};
