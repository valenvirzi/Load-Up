import graph from "../../assets/graph.svg";
import edit from "../../assets/edit.svg";
import { useTranslation } from "react-i18next";
import { Exercise } from "../../context/ExercisesContext";
import { useSettingsStore } from "../../context/SettingsContext";
import ExerciseDate from "./ExerciseDate";
import { Link } from "react-router-dom";

interface ExerciseItemProps {
  exercise: Exercise;
  setSelectedExercise?: (exercise: Exercise) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exercise,
  setSelectedExercise,
}) => {
  const { t } = useTranslation();
  const { massUnit } = useSettingsStore();
  return (
    <li
      key={exercise.name}
      className="flex items-stretch justify-between border-b border-b-gray-400 py-3"
    >
      <div className="flex flex-col gap-2">
        <span className="text-xl">{exercise.name}</span>
        <div className="flex flex-col gap-1 text-sm opacity-80">
          {exercise.currentWeight ? (
            <span>
              {t("weight")}: {exercise.currentWeight}
              {massUnit}
            </span>
          ) : (
            <></>
          )}
          <span>
            {t("sets")}: {exercise.sets}
          </span>
          <span>
            {t("repsPerSet")}: {exercise.repsPerSet}
          </span>
          {exercise.workoutVolume ? (
            <span>
              {t("workoutVolume")}: {exercise.workoutVolume}
              {massUnit}
            </span>
          ) : (
            <></>
          )}
          {exercise.average1RM ? (
            <span>
              1RM: {exercise.average1RM}
              {massUnit}
            </span>
          ) : (
            <></>
          )}
          <span>
            {t("lastTime")}:{" "}
            <ExerciseDate
              latestWorkoutDate={exercise.latestWorkoutDate}
              displayHour={true}
            />
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-3">
        <Link
          to={`/exercises/${exercise.name}`}
          className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-stone-700 p-2"
        >
          <img className="w-6" src={graph} alt={t("graph")} />
        </Link>
        {setSelectedExercise ? (
          <button
            className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-stone-700 p-2"
            type="button"
            onClick={() => setSelectedExercise(exercise)}
          >
            <img className="w-6" src={edit} alt={t("edit")} />
          </button>
        ) : (
          <></>
        )}
      </div>
    </li>
  );
};

export default ExerciseItem;
