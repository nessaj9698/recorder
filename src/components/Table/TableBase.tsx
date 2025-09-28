import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import type { ReactElement } from "react";

interface Props {
  headerSlot: ReactElement;
  bodySlot: ReactElement;
  footerSlot?: ReactElement;
}

export const TableBase = ({ headerSlot, bodySlot, footerSlot }: Props) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table>
          {headerSlot}
          <TableBody>{bodySlot}</TableBody>
        </Table>
      </TableContainer>
      {footerSlot}
    </>
  );
};
