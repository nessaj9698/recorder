import { Button, Stack, styled, Typography, useTheme } from "@mui/material";
import { ChevronIcon } from "../../assets";
import { useState } from "react";

const StyledButton = styled(Button)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  minWidth: "unset",
}));

const VISIBLE_PAGINATION_COUNT = 3;

interface Props {
  dataLength: number;
  newDataLength: number;
  recordsPerPage: number;
  onButtonClick: (page: number) => void;
}

export const RecordsTableFooter = ({
  dataLength,
  newDataLength,
  recordsPerPage,
  onButtonClick,
}: Props) => {
  const theme = useTheme();

  const [paginationSliceIndex, setPaginationSliceIndex] = useState(0);

  const paginationArray = Array.from(
    { length: Math.ceil(dataLength / recordsPerPage) },
    (_, index) => ++index
  );

  const slicedPagination = paginationArray.slice(
    paginationSliceIndex,
    paginationSliceIndex + VISIBLE_PAGINATION_COUNT
  );

  const [activePage, setActivePage] = useState(1);

  const handleClick = (item: number) => {
    onButtonClick(item);
    setActivePage(item);
  };

  const isPrevButtonDisabled = paginationSliceIndex === 0;

  const isNextButtonDisabled =
    paginationArray.length + 1 <=
    paginationSliceIndex + VISIBLE_PAGINATION_COUNT;

  const handlePaginationNext = () =>
    setPaginationSliceIndex((prev) => prev + VISIBLE_PAGINATION_COUNT);

  const handlePaginationPrev = () =>
    setPaginationSliceIndex((prev) => prev - VISIBLE_PAGINATION_COUNT);

  return (
    <Stack alignItems="center" gap={theme.spacing(4)}>
      <Typography color={theme.palette.table.footer} variant="caption">
        Всего сообщений: {dataLength} • Новых: {newDataLength}
      </Typography>
      <Stack flexDirection="row" gap={theme.spacing(2.5)}>
        <StyledButton
          onClick={handlePaginationPrev}
          disabled={isPrevButtonDisabled}
        >
          <ChevronIcon />
        </StyledButton>
        {slicedPagination.map((item) => (
          <StyledButton
            onClick={() => handleClick(item)}
            sx={{
              color:
                activePage === item
                  ? theme.palette.common.white
                  : theme.palette.table.footer,
              bgcolor:
                activePage === item
                  ? theme.palette.primary.main
                  : theme.palette.common.white,
            }}
            key={item}
          >
            {item}
          </StyledButton>
        ))}
        <StyledButton
          onClick={handlePaginationNext}
          sx={{ transform: "rotate(180deg)" }}
          disabled={isNextButtonDisabled}
        >
          <ChevronIcon />
        </StyledButton>
      </Stack>
    </Stack>
  );
};
