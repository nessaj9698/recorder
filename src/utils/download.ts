export const JSONDownload = (item: object, fileName: string) => {
  const jsonString = JSON.stringify(item);
  const dataBlob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
