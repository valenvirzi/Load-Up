// TODO: Design this page

import { useTranslation } from "react-i18next";
import { Exercise, useExercisesStore } from "../context/ExercisesContext";
import { useState } from "react";
import ExerciseForm from "../components/ExerciseForm";
import ExerciseItem from "../components/ExerciseItem";

const ExercisesPage: React.FC = () => {
  const { t } = useTranslation();
  const { exercises } = useExercisesStore();
  const [create, setCreate] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  return (
    <main className="flex flex-col items-stretch p-2 px-4">
      <div className="p-2">
        <h2 className="text-3xl">{t("exercises")}</h2>
      </div>
      <section className="flex flex-col gap-2 px-1">
        <button
          onClick={() => {
            setCreate(true);
            setSelectedExercise({
              name: "",
              sets: 0,
              repsPerSet: 0,
              currentWeight: 0,
              average1RM: null,
              latestWorkoutDate: null,
              workoutVolume: null,
            });
          }}
          className="mt-4 mb-2 cursor-pointer rounded-full bg-violet-800 p-3 text-white"
          type="button"
        >
          <span>{t("addNewExercise")}</span>
        </button>
        <ul className="border-0 border-t border-t-gray-500">
          {exercises.map((exercise) => {
            return (
              <ExerciseItem
                key={exercise.name}
                exercise={exercise}
                setSelectedExercise={setSelectedExercise}
              />
            );
          })}
        </ul>
        {selectedExercise === null ? (
          <></>
        ) : (
          <ExerciseForm
            create={create}
            setCreate={setCreate}
            selectedExercise={selectedExercise}
            setSelectedExercise={setSelectedExercise}
          />
        )}
      </section>
    </main>
  );
};

export default ExercisesPage;
