import {
  format,
  fromUnixTime,
  formatDistanceToNowStrict,
  getTime,
  startOfMonth,
} from "date-fns";

export const getTimestamp = Date.now();

export const date = (workoutDate) => {
  const roundedDate = Math.round(workoutDate / 1000);
  return format(fromUnixTime(roundedDate), "dd.MM.yyyy");
};

export const timeDistance = (startDate) => {
  return formatDistanceToNowStrict(startDate, {
    unit: "minute",
  });
};

export const getfirstDayOfTheMonth = () => {
  const firstDayOfTheMonth = startOfMonth(Date.now());
  return getTime(firstDayOfTheMonth);
};
