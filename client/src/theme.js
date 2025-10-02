import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#ffffff",
          200: "#202325",
          300: "#a3a3a3",
          400: "rgb(220, 224, 224)",
          500: "#ffffff",
          600: "#a3a3a3",
          700: "#202325",
          800: "rgb(66 72 75)",
          900: "#202325",
        },
        primary: {
          100: "0% 0% / 200% 100% rgb(71 71 71)",
          200: "#a1a4ab",
          300: "#727681",
          400: "#202325",
          500: "#202325",
          600: "#202325",
          700: "#202325",
          800: "#202325",
          900: "#202325",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#9f4a77",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
        yellowAccent: {
          100: "#ffb862",
          200: "#EFD81A",
          300: "#F1DD33",
          400: "#F2E14D",
          500: "#F4E566",
          600: "#F6EA80",
          700: "#F8EE99",
          800: "#FAF2B3",
          900: "#debe67",
        },
      }
    : {
        grey: {
          100: "#202325",
          200: "#3d3d3d",
          300: "#3d3d3d",
          400: "rgb(220, 224, 224)",
          500: "#202325",
          600: "rgb(168 168 168)",
          700: "rgb(241 241 241)",
          800: "rgb(215 215 215 / 91%)",
          900: "#ffffff",
        },
        primary: {
          100: "#d0d1d5",
          200: "#202325",
          300: "#727681",
          400: "#d0d1d5", // manually changed
          500: "#202325",
          600: "#202325",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#b7ebde",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#711c49",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#0a6baf",
          200: "#0a6baf",
          300: "#0a6baf",
          400: "#0a6baf",
          500: "#0a6baf",
          600: "#0a6baf",
          700: "#0a6baf",
          800: "#0a6baf",
          900: "#0a6baf",
        },
        yellowAccent: {
          100: "#ffe1b1",
          200: "#FAF2B3",
          300: "#F8EE99",
          400: "#F6EA80",
          500: "#F4E566",
          600: "#F2E14D",
          700: "#F1DD33",
          800: "#EFD81A",
          900: "#debe67",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
// Context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
