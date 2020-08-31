import { getDefaultCSSVars } from './defaults.styles';
import { getSpacingCSSVars } from './spacings.styles';

const LIGHT_THEME_COLORS = {
  bgColor: '#f1f2f6',
  whiteColor: '#ffffff',
  highlightColor: '#5BF69F',
  borderColor: '#DADADA',
  borderLightColor: '#F1F2F6',
};

export const getLightThemeCSS = () => ({
  '--bg-color': LIGHT_THEME_COLORS.bgColor,
  '--white-color': LIGHT_THEME_COLORS.whiteColor,
  '--highlight-color': LIGHT_THEME_COLORS.highlightColor,
  '--border-color': LIGHT_THEME_COLORS.borderColor,
  '--border-light-color': LIGHT_THEME_COLORS.borderLightColor,
  ...getSpacingCSSVars(),
  ...getDefaultCSSVars(),
});
