export const yyMMDDFormat = (dateFormat) => {
  const dateObj = new Date(dateFormat);

  const year = dateObj.getUTCFullYear().toString().slice(-2);
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getUTCDate().toString().padStart(2, "0");
  return `${year}:${month}:${day}`;
};
