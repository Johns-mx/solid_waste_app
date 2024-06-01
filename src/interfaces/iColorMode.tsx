export interface iColorPallete {
  background?: string;
  text: string;
  button: string;
  statusBar: string;
  buttonText?: string;
  icons?: string;
}

export interface iColorsType {
  lighter_mode: iColorPallete;
  darker_mode: iColorPallete;
}

export interface iThemeContextType {
  isDarkMode: boolean;
  colorsTheme: iColorPallete;
  toggleDarkMode: (isDarkMode: boolean) => void;
}
