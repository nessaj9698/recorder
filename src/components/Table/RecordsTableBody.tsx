import { Button, TableCell, TableRow, Typography } from "@mui/material";
import type { Message } from "../../types";
import { getRelativeDate, JSONDownload } from "../../utils";
import { DownloadIcon } from "../../assets";
import { RecordPlayer } from "../RecordPlayer";
import { useState } from "react";

interface Props {
  data: Message[];
}

export const RecordsTableBody = ({ data }: Props) => {
  const handleMessageDownload = (message: Message) => {
    JSONDownload(message, message.MIME.audioFile.filename);
  };

  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return data.map((msg, idx) => (
    <TableRow key={idx}>
      <TableCell>
        <Typography variant="body2">
          {msg.displayDate} {msg.displayTime}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {getRelativeDate(msg.Received)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body2"
          component="a"
          href={`tel:${msg.phoneNumber}`}
          sx={(theme) => ({
            textDecoration: "unset",
            color: theme.palette.text.primary,
            "&:hover": { color: theme.palette.primary.main },
          })}
        >
          {msg.phoneNumber}
        </Typography>
      </TableCell>
      <TableCell>
        <RecordPlayer
          duration={msg.Duration}
          formattedDuration={msg.formattedDuration}
          isActive={activeIdx === idx}
          onPlay={() => setActiveIdx((prev) => (prev === idx ? null : idx))}
        />
      </TableCell>
      <TableCell>
        <Button
          size="small"
          sx={{ height: 40, width: 40, backgroundColor: "#F3F4F6" }}
          onClick={() => handleMessageDownload(msg)}
        >
          <DownloadIcon />
        </Button>
      </TableCell>
    </TableRow>
  ));
};
