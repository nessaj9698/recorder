import { TableBase } from "./TableBase";
import { TableHeader } from "./TableHeader";
import { RecordsTableBody } from "./RecordsTableBody";
import { RecordsTableFooter } from "./RecordsTableFooter";
import { useEffect, useState } from "react";
import { useRecordsData } from "../../hooks";

const DATA_PER_PAGE_COUNT = 10;

interface NewRecordsCounter {
  newRecordsCount: number;
  visitedPages: number[];
}

export const RecordsTable = () => {
  const data = useRecordsData();

  const [page, setPage] = useState(1);

  const slicedData = data.slice(
    (page - 1) * DATA_PER_PAGE_COUNT,
    page * DATA_PER_PAGE_COUNT
  );

  const [newRecordsCounter, setNewRecordsCounter] = useState<NewRecordsCounter>(
    {
      newRecordsCount: 0,
      visitedPages: [],
    }
  );

  useEffect(() => {
    if (data.length > 0) {
      setNewRecordsCounter({
        newRecordsCount: data.length,
        visitedPages: [],
      });
    }
  }, [data]);

  const handlePagination = (page: number) => {
    setPage(page);

    if (!newRecordsCounter.visitedPages.includes(page)) {
      setNewRecordsCounter((prev) => ({
        visitedPages: [...prev.visitedPages, page],
        newRecordsCount: Math.max(
          prev.newRecordsCount - DATA_PER_PAGE_COUNT,
          0
        ),
      }));
    }
  };

  return (
    <TableBase
      headerSlot={
        <TableHeader
          headers={["Дата", "Номер", "Запись сообщения", "Действия"]}
        />
      }
      bodySlot={<RecordsTableBody data={slicedData} />}
      footerSlot={
        <RecordsTableFooter
          dataLength={data.length}
          newDataLength={newRecordsCounter.newRecordsCount}
          recordsPerPage={DATA_PER_PAGE_COUNT}
          onButtonClick={handlePagination}
        />
      }
    />
  );
};
