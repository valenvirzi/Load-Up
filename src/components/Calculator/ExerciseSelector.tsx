import { useTranslation } from "react-i18next";
import { Exercise } from "../../context/ExercisesContext";

interface ExerciseSelectorProps {
  exercises: Exercise[];
  currentExercise: Exercise;
  setCurrentExercise: (exercise: Exercise) => void;
}

const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({
  exercises,
  currentExercise,
  setCurrentExercise,
}) => {
  const { t } = useTranslation();

  if (exercises.length === 0) {
    return (
      <div className="flex flex-col gap-1">
        <p className="text-center text-sm text-gray-400">
          {t("noExerciseAvailable")}
        </p>
        <p className="text-center text-sm text-gray-400">
          {t("createExerciseToSaveProgress")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="opacity-65" htmlFor="exerciseSelect">
        {t("selectExercise")}
      </label>
      <select
        className="cursor-pointer rounded border-none bg-gray-100 p-2 dark:bg-zinc-700"
        name="exerciseSelect"
        id="exerciseSelect"
        onChange={(e) => {
          const selectedName = e.target.value;
          const selectedExercise = exercises.find(
            (e) => e.name === selectedName,
          );
          if (selectedExercise) {
            setCurrentExercise(selectedExercise);
          }
        }}
        value={currentExercise.name}
      >
        {exercises.map((exercise) => {
          return (
            <option className="flex" value={exercise.name} key={exercise.name}>
              {exercise.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ExerciseSelector;
