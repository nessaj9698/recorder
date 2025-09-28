import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    table: {
      header: string;
      headerFont: string
      cell: string;
      footer: string;
    };
  }
  interface PaletteOptions {
    table?: {
      header?: string;
      headerFont?: string
      cell?: string;
      footer?: string;
    };
  }
}
