import { WorkoutDate } from "../context/ExercisesContext";

const workoutDateToText = (date: WorkoutDate, displayHour = false): string => {
  const formattedDate = `${String(date.day).padStart(2, "0")}-${String(date.month).padStart(2, "0")}-${date.year}${displayHour ? ` ${String(date.hour).padStart(2, "0")}:${String(date.minute).padStart(2, "0")}hs` : ""}`;
  return formattedDate;
};

export default workoutDateToText;
