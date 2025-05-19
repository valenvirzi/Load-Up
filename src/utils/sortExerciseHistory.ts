import { ExerciseData } from "../context/ExercisesContext";

export type SortOrder = "asc" | "desc";

const sortExerciseHistory = (
  exerciseHistory: ExerciseData[],
  order: SortOrder = "desc",
): ExerciseData[] => {
  return exerciseHistory.sort((a, b) => {
    const dateA = new Date(
      a.date.year,
      a.date.month - 1,
      a.date.day,
      a.date.hour,
      a.date.minute,
    );
    const dateB = new Date(
      b.date.year,
      b.date.month - 1,
      b.date.day,
      b.date.hour,
      b.date.minute,
    );

    return order === "asc"
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });
};

export default sortExerciseHistory;
