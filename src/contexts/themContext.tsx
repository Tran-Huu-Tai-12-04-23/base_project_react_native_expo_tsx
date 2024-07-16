import themeData from "@constants/Colors";
import React, { createContext, useContext, useState } from "react";
import { ETheme, useThemeUtil } from "./useThemUtil";

interface ThemeContextValue {
  theme: typeof themeData.dark | typeof themeData.light;
  onSaveThem: (themeData: ETheme) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface PropsType {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: PropsType) => {
  const [theme, setTheme] = useState<
    typeof themeData.dark | typeof themeData.light
  >(themeData.light);
  const { onSaveTheme, onGetTheme } = useThemeUtil();

  const saveTheme = async (theme: ETheme) => {
    try {
      onSaveTheme(theme);
      if (theme === ETheme.DARK) {
        setTheme(themeData.dark);
      } else if (theme === ETheme.LIGHT) {
        setTheme(themeData.light);
      }
    } catch (error) {
      console.log("Error saving theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, onSaveThem: saveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
