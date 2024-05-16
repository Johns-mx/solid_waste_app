import { iColorPallete, iColorsType } from '../../interfaces/iColorMode';
import colors from './colors';

const lightColor: iColorPallete = {
  background: colors.primary_bg,
  text: colors.dark, // '#222428'
  button: colors.primary_shade, // '#27ae60'
  statusBar: colors.primary_shade,
};

const darkColor: iColorPallete = {
  background: colors.primary_seven,
  text: colors.light, // '#F4F5F8'
  button: colors.primary_shade, // '#27ae60'
  statusBar: colors.primary_shade,
};

export const Colors: iColorsType = {
  lighter_mode: lightColor,
  darker_mode: darkColor,
};
