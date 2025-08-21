const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Returns the full month name given a month number (0-based)
 * @param monthNumber 0 for January, 11 for December
 */
export const getMonthName = (monthNumber: number): string | null => {
  if (monthNumber < 0 || monthNumber > 11) return null;
  return monthNames[monthNumber];
};

export const formatDate = (date: Date): string => {
  return (
    date.getFullYear() +
    ' ' +
    getMonthName(date.getMonth()) +
    ' ' +
    date.getDay() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes()
  );
};
