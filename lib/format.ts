export const formatStartDate = (dateStart: Date) => {
  const startDate = new Date(dateStart);
  startDate.setDate(startDate.getDate());
  startDate.setHours(0, 0, 0, 0);
  return startDate;
};
export const formatEndDate = (dateEnd: Date) => {
  const endDate = new Date(dateEnd);
  endDate.setDate(endDate.getDate());
  endDate.setHours(23, 59, 59, 59);
  return endDate;
};
