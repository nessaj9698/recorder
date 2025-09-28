import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MUIThemeProvider } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MUIThemeProvider>
      <App />
    </MUIThemeProvider>
  </StrictMode>
);
