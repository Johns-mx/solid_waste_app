import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Colors } from '../assets/colors/colorsMode';
import { iThemeContextType } from '../interfaces/iColorMode';
import { useColorScheme } from 'react-native';

export const ThemeContext = createContext<iThemeContextType>({
  isDarkMode: false,
  colorsTheme: Colors.lighter_mode,
  toggleDarkMode: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  //const [isDarkMode, setIsDarkMode] = useState(false);
  const colorsTheme = isDarkMode ? Colors.darker_mode : Colors.lighter_mode;

  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleDarkMode = (active: boolean) => {
    setIsDarkMode(active);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, colorsTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): iThemeContextType => useContext(ThemeContext);
