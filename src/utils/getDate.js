import { format, fromUnixTime, formatDistanceToNowStrict } from "date-fns";

// const date = new Date();
// export const getTodaysDate = format(date, "dd.MM.yyyy");

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
