import { Stack } from "@mui/material";
import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <Stack minHeight="100vh">
      <Header />
      <Content />
      <Footer />
    </Stack>
  );
};
