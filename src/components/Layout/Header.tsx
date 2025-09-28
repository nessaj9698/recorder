import { Typography, useTheme, Stack } from "@mui/material";

export const Header = () => {
  const theme = useTheme();

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="flex-start"
      bgcolor={theme.palette.primary.main}
      color={theme.palette.common.white}
      pt={6}
      pb={3}
      pl={11}
      pr={12}
    >
      <Stack flexDirection="row" alignItems="center">
        <Typography
          variant="h5"
          fontWeight={700}
          paddingLeft={theme.spacing(14)}
          display="flex"
          alignItems="center"
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              backgroundColor: "#8285f4",
              position: "absolute",
              left: 0,
              borderRadius: 16,
              width: theme.spacing(8),
              height: theme.spacing(8),
            },
            "&::after": {
              content: '""',
              backgroundColor: theme.palette.common.white,
              position: "absolute",
              left: theme.spacing(2),
              borderRadius: 16,
              width: theme.spacing(4),
              height: theme.spacing(4),
            },
          }}
        >
          Голосовая почта
        </Typography>
      </Stack>
      <Stack>
        <Typography variant="body2">Пользователь</Typography>
        <Typography variant="caption">test_user@mail.com</Typography>
      </Stack>
    </Stack>
  );
};
