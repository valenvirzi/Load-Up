import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WorkoutDate = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

export type Exercise = {
  name: string;
  sets: number;
  repsPerSet: number;
  currentWeight: number;
  average1RM: number | null;
  workoutVolume: number | null;
  latestWorkoutDate: WorkoutDate | null;
};

type ExercisesStore = {
  exercises: Exercise[];
  createExercise: (exercise: Exercise) => void;
  deleteExercise: (name: Exercise["name"]) => void;
  updateExercise: (
    previousName: Exercise["name"],
    updatedExercise: Exercise,
  ) => void;
};

export const useExercisesStore = create(
  persist<ExercisesStore>(
    (set) => ({
      exercises: [
        {
          name: "Bench Press",
          currentWeight: 50,
          sets: 3,
          repsPerSet: 12,
          average1RM: 0,
          workoutVolume: 0,
          latestWorkoutDate: {
            year: 2025,
            month: 4,
            day: 14,
            hour: 15,
            minute: 15,
          },
        },
      ],

      createExercise: (newExercise: Exercise) =>
        set((state) => {
          if (state.exercises.some((e) => e.name === newExercise.name)) {
            throw new Error("alreadyExerciseName");
          }
          return {
            exercises: [...state.exercises, { ...newExercise }],
          };
        }),

      deleteExercise: (exerciseName: string) =>
        set((state) => {
          if (state.exercises.some((e) => e.name === exerciseName)) {
            return {
              exercises: state.exercises.filter((e) => e.name !== exerciseName),
            };
          } else {
            throw new Error("exerciseNotFound");
          }
        }),

      updateExercise: (previousName: string, updatedExercise: Exercise) =>
        set((state) => {
          const exerciseIndex = state.exercises.findIndex(
            (e) => e.name === previousName,
          );
          if (exerciseIndex === -1) {
            throw new Error("exerciseNotFound");
          }
          const previousExercise = state.exercises[exerciseIndex];
          if (
            previousExercise.name !== updatedExercise.name &&
            state.exercises.some((e) => e.name === updatedExercise.name)
          ) {
            throw new Error("alreadyExerciseName");
          }

          const updatedExercises = [...state.exercises];
          updatedExercises[exerciseIndex] = { ...updatedExercise };

          return {
            exercises: updatedExercises,
          };
        }),
    }),
    { name: "LoadUpExercises" },
  ),
);
