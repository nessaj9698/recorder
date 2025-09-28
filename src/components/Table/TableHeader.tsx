import {
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

interface Props {
  headers: string[];
}

export const TableHeader = ({ headers }: Props) => {
  const theme = useTheme();
  return (
    <TableHead
      sx={{
        bgcolor: theme.palette.table.header,
        borderRadius: theme.spacing(4),
      }}
    >
      <TableRow>
        {headers.map((header) => (
          <TableCell key={header}>
            <Typography
              fontWeight={700}
              fontSize="0.75rem"
              textTransform="uppercase"
              color={theme.palette.table.headerFont}
            >
              {header}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
