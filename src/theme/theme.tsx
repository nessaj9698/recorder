import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { PropsWithChildren } from "react";

const theme = createTheme({
  spacing: 4,
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#6366F1",
      dark: "#1F2937",
    },
    background: {
      default: "#F1F5F9",
    },
    text: {
      primary: "#212121",
      secondary: "#9CA3AF",
    },
    table: {
      header: "#F8FAFC",
      headerFont: "#374151",
      footer: "#6B7280",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: "1px solid #E5E7EB",
          borderRadius: 6,
          cursor: "pointer",
          minWidth: "unset",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 8,
          borderRadius: 16,
        },
      },
    },
  },
});

export const MUIThemeProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
