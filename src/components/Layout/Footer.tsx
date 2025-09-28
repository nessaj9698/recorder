import { useTheme, Stack, Typography } from "@mui/material";
import { LAYOUT_PADDING } from "./constants";

export const Footer = () => {
  const theme = useTheme();
  return (
    <Stack
      flexDirection="row"
      bgcolor={theme.palette.primary.dark}
      px={LAYOUT_PADDING}
      py={5.5}
    >
      <Typography variant="body2" color={theme.palette.text.secondary}>
        © 2024 VoiceMail System
      </Typography>
    </Stack>
  );
};
