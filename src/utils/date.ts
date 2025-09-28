export const getRelativeDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();

  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffMs = nowOnly.getTime() - dateOnly.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Сегодня";
  if (diffDays === 1) return "Вчера";

  const getDayWord = (n: number) => {
    const rem10 = n % 10;
    const rem100 = n % 100;
    if (rem10 === 1 && rem100 !== 11) return "день";
    if ([2, 3, 4].includes(rem10) && ![12, 13, 14].includes(rem100))
      return "дня";
    return "дней";
  };

  return `${diffDays} ${getDayWord(diffDays)} назад`;
};
