export const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

export const sortDocumentsByDate = (documents) => {
  return documents.sort((a, b) => parseDate(b.date) - parseDate(a.date));
};
