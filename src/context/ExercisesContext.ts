import { create } from "zustand";
import { persist } from "zustand/middleware";
import sortExerciseHistory from "../utils/sortExerciseHistory";

export type WorkoutDate = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

export type ExerciseRecord = {
  date: WorkoutDate;
  average1RM: number;
  workoutVolume: number;
};

export type Exercise = {
  name: string;
  sets: number;
  repsPerSet: number;
  currentWeight: number;
  average1RM: number | null;
  workoutVolume: number | null;
  latestWorkoutDate: WorkoutDate | null;
  history: ExerciseRecord[];
};

type ExercisesStore = {
  exercises: Exercise[];
  createExercise: (exercise: Exercise) => void;
  createExerciseRecord: (
    name: Exercise["name"],
    exerciseRecord: ExerciseRecord,
  ) => void;
  deleteExercise: (name: Exercise["name"]) => void;
  deleteExerciseRecord: (
    name: Exercise["name"],
    exerciseRecord: ExerciseRecord,
  ) => void;
  updateExercise: (
    previousName: Exercise["name"],
    updatedExercise: Exercise,
  ) => void;
  updateExerciseRecord: (
    name: Exercise["name"],
    previousExerciseRecord: ExerciseRecord,
    updatedExerciseRecord: ExerciseRecord,
  ) => void;
};

export const useExercisesStore = create(
  persist<ExercisesStore>(
    (set) => ({
      exercises: [
        {
          name: "Squats",
          currentWeight: 75,
          sets: 3,
          repsPerSet: 12,
          workoutVolume: 3000,
          average1RM: 121,
          latestWorkoutDate: {
            year: 2025,
            month: 6,
            day: 8,
            hour: 19,
            minute: 33,
          },
          history: [
            {
              date: { year: 2025, month: 6, day: 8, hour: 19, minute: 33 },
              average1RM: 121,
              workoutVolume: 3000,
            },
            {
              date: { year: 2025, month: 5, day: 24, hour: 15, minute: 13 },
              average1RM: 130,
              workoutVolume: 3100,
            },
            {
              date: { year: 2025, month: 5, day: 19, hour: 17, minute: 33 },
              average1RM: 107.5,
              workoutVolume: 2700,
            },
            {
              date: { year: 2025, month: 5, day: 15, hour: 19, minute: 45 },
              average1RM: 105.4,
              workoutVolume: 2600,
            },
            {
              date: { year: 2025, month: 5, day: 12, hour: 19, minute: 36 },
              average1RM: 150,
              workoutVolume: 3500,
            },
            {
              date: { year: 2025, month: 5, day: 12, hour: 18, minute: 30 },
              average1RM: 103.9,
              workoutVolume: 2550,
            },
            {
              date: { year: 2025, month: 5, day: 10, hour: 17, minute: 10 },
              average1RM: 101.3,
              workoutVolume: 2400,
            },
            {
              date: { year: 2025, month: 5, day: 7, hour: 16, minute: 20 },
              average1RM: 98.75,
              workoutVolume: 2300,
            },
          ],
        },
        {
          name: "Bench Press",
          currentWeight: 60,
          sets: 3,
          repsPerSet: 12,
          workoutVolume: 1650,
          average1RM: 92.5,
          latestWorkoutDate: {
            year: 2025,
            month: 5,
            day: 17,
            hour: 22,
            minute: 6,
          },
          history: [
            {
              date: { year: 2025, month: 5, day: 7, hour: 16, minute: 20 },
              average1RM: 84.3,
              workoutVolume: 1450,
            },
            {
              date: { year: 2025, month: 5, day: 10, hour: 17, minute: 10 },
              average1RM: 86,
              workoutVolume: 1500,
            },
            {
              date: { year: 2025, month: 5, day: 12, hour: 18, minute: 30 },
              average1RM: 88.1,
              workoutVolume: 1550,
            },
            {
              date: { year: 2025, month: 5, day: 15, hour: 19, minute: 45 },
              average1RM: 90.2,
              workoutVolume: 1600,
            },
            {
              date: { year: 2025, month: 5, day: 17, hour: 22, minute: 6 },
              average1RM: 92.5,
              workoutVolume: 1650,
            },
          ],
        },
        {
          name: "Military Press",
          currentWeight: 40,
          sets: 3,
          repsPerSet: 12,
          workoutVolume: 980,
          average1RM: 57.5,
          latestWorkoutDate: {
            year: 2025,
            month: 5,
            day: 17,
            hour: 22,
            minute: 6,
          },
          history: [
            {
              date: { year: 2025, month: 5, day: 7, hour: 16, minute: 20 },
              average1RM: 51,
              workoutVolume: 850,
            },
            {
              date: { year: 2025, month: 5, day: 10, hour: 17, minute: 10 },
              average1RM: 52.6,
              workoutVolume: 880,
            },
            {
              date: { year: 2025, month: 5, day: 12, hour: 18, minute: 30 },
              average1RM: 54.2,
              workoutVolume: 910,
            },
            {
              date: { year: 2025, month: 5, day: 15, hour: 19, minute: 45 },
              average1RM: 55.8,
              workoutVolume: 940,
            },
            {
              date: { year: 2025, month: 5, day: 17, hour: 22, minute: 6 },
              average1RM: 57.5,
              workoutVolume: 980,
            },
          ],
        },
        {
          name: "Pull Up",
          currentWeight: 30,
          sets: 3,
          repsPerSet: 11,
          workoutVolume: 2000,
          average1RM: 115,
          latestWorkoutDate: {
            year: 2025,
            month: 6,
            day: 12,
            hour: 13,
            minute: 53,
          },
          history: [
            {
              date: { year: 2025, month: 6, day: 12, hour: 13, minute: 53 },
              average1RM: 115,
              workoutVolume: 2000,
            },
            {
              date: { year: 2025, month: 6, day: 8, hour: 19, minute: 51 },
              average1RM: 104,
              workoutVolume: 1800,
            },
            {
              date: { year: 2025, month: 6, day: 4, hour: 19, minute: 51 },
              average1RM: 98,
              workoutVolume: 1200,
            },
            {
              date: { year: 2025, month: 5, day: 31, hour: 19, minute: 54 },
              average1RM: 90,
              workoutVolume: 1400,
            },
          ],
        },
        {
          name: "Rows",
          currentWeight: 40,
          sets: 4,
          repsPerSet: 12,
          workoutVolume: 1920,
          average1RM: 57.13,
          latestWorkoutDate: {
            year: 2025,
            month: 6,
            day: 13,
            hour: 18,
            minute: 35,
          },
          history: [
            {
              date: { year: 2025, month: 6, day: 13, hour: 18, minute: 35 },
              average1RM: 57.13,
              workoutVolume: 1920,
            },
            {
              date: { year: 2025, month: 6, day: 8, hour: 18, minute: 50 },
              average1RM: 55.5,
              workoutVolume: 1850,
            },
            {
              date: { year: 2025, month: 6, day: 4, hour: 18, minute: 10 },
              average1RM: 54.2,
              workoutVolume: 1800,
            },
            {
              date: { year: 2025, month: 5, day: 31, hour: 17, minute: 45 },
              average1RM: 52.7,
              workoutVolume: 1720,
            },
            {
              date: { year: 2025, month: 5, day: 27, hour: 19, minute: 20 },
              average1RM: 51.4,
              workoutVolume: 1650,
            },
          ],
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

      createExerciseRecord: (
        exerciseName: string,
        newExerciseRecord: ExerciseRecord,
      ) =>
        set((state) => {
          const foundExerciseIndex = state.exercises.findIndex(
            (e) => e.name === exerciseName,
          );
          if (foundExerciseIndex === -1) {
            throw new Error("exerciseNotFound");
          } else {
            if (
              state.exercises[foundExerciseIndex].history.some((entry) => {
                const isSameDate =
                  entry.date.year === newExerciseRecord.date.year &&
                  entry.date.month === newExerciseRecord.date.month &&
                  entry.date.day === newExerciseRecord.date.day &&
                  entry.date.hour === newExerciseRecord.date.hour &&
                  entry.date.minute === newExerciseRecord.date.minute;
                return isSameDate;
              })
            ) {
              throw new Error("alreadyDate");
            } else {
              const updatedExercises = state.exercises.map(
                (exercise, index) => {
                  if (index === foundExerciseIndex) {
                    const updatedHistory = [
                      ...state.exercises[foundExerciseIndex].history,
                    ];
                    updatedHistory.push({ ...newExerciseRecord });
                    const descendingSortedHistory = sortExerciseHistory(
                      updatedHistory,
                      "desc",
                    );

                    return {
                      ...exercise,
                      latestWorkoutDate: descendingSortedHistory[0].date,
                      average1RM: descendingSortedHistory[0].average1RM,
                      workoutVolume: descendingSortedHistory[0].workoutVolume,
                      history: descendingSortedHistory,
                    };
                  }
                  return exercise;
                },
              );
              return {
                exercises: updatedExercises,
              };
            }
          }
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

      deleteExerciseRecord: (
        exerciseName: string,
        exerciseRecord: ExerciseRecord,
      ) =>
        set((state) => {
          const foundExerciseIndex = state.exercises.findIndex(
            (e) => e.name === exerciseName,
          );
          if (foundExerciseIndex === -1) {
            throw new Error("exerciseNotFound");
          } else {
            const updatedExercises = state.exercises.map((exercise, index) => {
              if (index === foundExerciseIndex) {
                const updatedHistory = exercise.history.filter((entry) => {
                  const isSameDate =
                    entry.date.year === exerciseRecord.date.year &&
                    entry.date.month === exerciseRecord.date.month &&
                    entry.date.day === exerciseRecord.date.day &&
                    entry.date.hour === exerciseRecord.date.hour &&
                    entry.date.minute === exerciseRecord.date.minute;

                  return !isSameDate;
                });

                const descendingSortedHistory = sortExerciseHistory(
                  updatedHistory,
                  "desc",
                );

                return {
                  ...exercise,
                  latestWorkoutDate: descendingSortedHistory[0].date,
                  average1RM: descendingSortedHistory[0].average1RM,
                  workoutVolume: descendingSortedHistory[0].workoutVolume,
                  history: descendingSortedHistory,
                };
              }
              return exercise;
            });
            return {
              exercises: updatedExercises,
            };
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

      updateExerciseRecord: (
        exerciseName: string,
        previousExerciseRecord: ExerciseRecord,
        updatedExerciseRecord: ExerciseRecord,
      ) =>
        set((state) => {
          const foundExerciseIndex = state.exercises.findIndex(
            (e) => e.name === exerciseName,
          );
          if (foundExerciseIndex === -1) {
            throw new Error("exerciseNotFound");
          } else {
            const updatedExercises = state.exercises.map((exercise, index) => {
              if (index === foundExerciseIndex) {
                const updatedHistory = [
                  ...state.exercises[foundExerciseIndex].history,
                ].map((entry) => {
                  const isSameDate =
                    entry.date.year === previousExerciseRecord.date.year &&
                    entry.date.month === previousExerciseRecord.date.month &&
                    entry.date.day === previousExerciseRecord.date.day &&
                    entry.date.hour === previousExerciseRecord.date.hour &&
                    entry.date.minute === previousExerciseRecord.date.minute;

                  return isSameDate
                    ? { ...entry, ...updatedExerciseRecord }
                    : entry;
                });

                const descendingSortedHistory = sortExerciseHistory(
                  updatedHistory,
                  "desc",
                );

                return {
                  ...exercise,
                  latestWorkoutDate: descendingSortedHistory[0].date,
                  average1RM: descendingSortedHistory[0].average1RM,
                  workoutVolume: descendingSortedHistory[0].workoutVolume,
                  history: descendingSortedHistory,
                };
              }
              return exercise;
            });
            return {
              exercises: updatedExercises,
            };
          }
        }),
    }),
    { name: "LoadUpExercises" },
  ),
);
