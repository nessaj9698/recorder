import { useState, useEffect } from "react";
import type { Message } from "../types";

export const useRecordsData = () => {
  const [data, setData] = useState<Message[]>([]);

  useEffect(() => {
    fetch("/voicemail_data.json")
      .then((data) => data.json())
      .then((result) => setData(result.records));
  }, []);

  return data;
};
