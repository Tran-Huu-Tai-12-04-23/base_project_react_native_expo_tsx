import themeData from "@constants/Colors";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ETheme, useThemeUtil } from "./useThemUtil";

interface ThemeContextValue {
  theme: typeof themeData.dark | typeof themeData.light;
  onSaveThem: (themeData: ETheme) => Promise<void>;
  themeName: ETheme;
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
  const [themeName, setThemeName] = useState<ETheme>(ETheme.LIGHT);
  const { onSaveTheme, onGetTheme, onGetSystemTheme } = useThemeUtil();

  const saveTheme = async (theme: ETheme) => {
    try {
      onSaveTheme(theme);
      if (theme === ETheme.DARK) {
        setTheme(themeData.dark);
        setThemeName(ETheme.DARK);
      } else if (theme === ETheme.LIGHT) {
        setTheme(themeData.light);
        setThemeName(ETheme.LIGHT);
      } else if (theme === ETheme.SYSTEM) {
        initSystemTheme();
        setThemeName(ETheme.SYSTEM);
      }
    } catch (error) {
      console.log("Error saving theme:", error);
    }
  };
  const initSystemTheme = async () => {
    if (onGetSystemTheme() === (ETheme.DARK as string)) {
      saveTheme(ETheme.DARK);
    } else {
      saveTheme(ETheme.LIGHT);
    }
  };
  useEffect(() => {
    const initTheme = async () => {
      const theme = await onGetTheme();
      if (theme) {
        if (theme === ETheme.DARK) {
          saveTheme(ETheme.DARK);
        } else if (theme === ETheme.LIGHT) {
          saveTheme(ETheme.LIGHT);
        }
        return;
      }
      await initSystemTheme();
    };
    initTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        onSaveThem: saveTheme,
        themeName,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
