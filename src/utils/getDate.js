import { format } from "date-fns";

const date = new Date();
export const getTodaysDate = format(date, "dd.MM.yyyy");
