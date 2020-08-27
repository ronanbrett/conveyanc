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
  '--spacing-xxs': `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.xtiny}px`,
  '--spacing-xs': `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.tiny}px`,
  '--spacing-s': `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.small}px`,
  '--spacing-m': `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.med}px`,
  '--spacing-mx': `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.medX}px`,
  '--spacing-l': `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.large}px`,
  '--spacing-xl': `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.xLarge}px`,
  '--spacing-xxl': `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.huge}px`,
  '--spacing-xxxl': `${GLOBAL_FONT_SIZE * DEFAULT_SPACINGS.xHuge}px`,
});
