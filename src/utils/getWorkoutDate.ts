import { WorkoutDate } from "../context/ExercisesContext";

const getWorkoutDate = (date: Date): WorkoutDate => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
};

export default getWorkoutDate;
