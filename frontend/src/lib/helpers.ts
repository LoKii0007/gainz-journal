export const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const getDayOfWeek = (date: Date) => {
  const day = date.getDay();
  return daysOfWeek[day];
};

