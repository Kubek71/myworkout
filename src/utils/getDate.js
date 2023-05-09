import { format, fromUnixTime } from "date-fns";

// const date = new Date();
// export const getTodaysDate = format(date, "dd.MM.yyyy");

export const getTimestamp = Math.round(Date.now() / 1000);

export const date = (workoutDate) =>
  format(fromUnixTime(workoutDate), "dd.MM.yyyy");
