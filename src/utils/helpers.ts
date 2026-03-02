/**
 * Formats a date string into DD/MM/YYYY format.
 * @param dateString The date string to format.
 * @returns The formatted date string.
 */
export const formatDate = (dateString: string): string => {
  const isoDateMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  // Preserve exact calendar day for date-only strings and avoid timezone drift.
  if (isoDateMatch) {
    const [, year, month, day] = isoDateMatch;
    return `${day}/${month}/${year}`;
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};
