import { Stack, useTheme } from "@mui/material";
import { LAYOUT_PADDING } from "./constants";
import { RecordsTable } from "../Table";

export const Content = () => {
  const theme = useTheme();
  return (
    <Stack
      flex={1}
      bgcolor={theme.palette.background.default}
      px={LAYOUT_PADDING}
      pt={7}
      pb={10}
    >
      <Stack
        bgcolor={theme.palette.common.white}
        flex={1}
        borderRadius={theme.spacing(4)}
        px={10}
        pt={8}
        pb={7.5}
        justifyContent="space-between"
      >
        <RecordsTable />
      </Stack>
    </Stack>
  );
};
