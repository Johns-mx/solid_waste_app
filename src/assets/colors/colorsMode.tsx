import { iColorPallete, iColorsType } from '../../interfaces/iColorMode';
import colors from './colors';

const lightColor: iColorPallete = {
  background: colors.primary_bg,
  text: colors.dark,
  button: colors.bg_welcome_screen3,
  statusBar: colors.primary_bg,
};

const darkColor: iColorPallete = {
  background: colors.dark_shade,
  text: colors.light,
  button: colors.bg_welcome_screen3,
  statusBar: colors.dark_shade,
};

export const Colors: iColorsType = {
  lighter_mode: lightColor,
  darker_mode: darkColor,
};
