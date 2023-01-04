export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

// Helper function to format ISO dates to normal dates
export const dateFormatter = (date: Date) => {
  return date.toISOString().slice(0, -14);
};

// Helper function for setting today's date
export const todayDateSetter = () => {
  return dateFormatter(new Date());
};

// Helper function to add specific amount of years from today
export function addYears(date: Date, years: number) {
  const dateCopy = new Date(date);
  dateCopy.setFullYear(dateCopy.getFullYear() + years);
  return dateFormatter(dateCopy);
}

// Helper function to add specific amount of Days from today
export function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return dateFormatter(result);
}
