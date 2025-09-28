import { Box, IconButton, LinearProgress, Typography } from "@mui/material";
import { PlayButton } from "../../assets";
import { useEffect, useState } from "react";
import { PauseButton } from "../../assets";
import type { Message } from "../../types";

interface Props {
  duration: Message["Duration"];
  formattedDuration: Message["formattedDuration"];
  isActive: boolean;
  onPlay: () => void;
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

export const RecordPlayer = ({
  duration,
  formattedDuration,
  isActive,
  onPlay,
}: Props) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isActive && elapsed < duration) {
      interval = setInterval(() => {
        setElapsed((prev) => Math.min(prev + 1, duration));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, elapsed, duration]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = clickX / rect.width;
    const newTime = Math.floor(ratio * duration);

    setElapsed(newTime);
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        size="small"
        sx={(theme) => ({
          bgcolor: theme.palette.primary.main,
          color: theme.palette.common.white,
        })}
        onClick={onPlay}
      >
        {isActive ? <PauseButton /> : <PlayButton />}
      </IconButton>
      <Typography variant="caption" alignSelf="flex-start" color="primary">
        {formatTime(elapsed)}
      </Typography>
      <Box
        width="100%"
        display="grid"
        gridTemplateColumns="1fr 35px"
        alignItems="center"
        gap={2.5}
      >
        <Box width="100%" onClick={handleSeek}>
          <LinearProgress
            variant="determinate"
            value={(elapsed / duration) * 100}
          />
        </Box>
        <Typography variant="caption">{formattedDuration}</Typography>
      </Box>
    </Box>
  );
};
