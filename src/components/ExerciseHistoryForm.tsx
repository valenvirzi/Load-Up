import deleteImg from "../assets/delete.svg";
import { useState } from "react";
import { ExerciseData } from "../context/ExercisesContext";
import { useTranslation } from "react-i18next";
// import getWorkoutDate from "../utils/getWorkoutDate";

// const defaultObject = {
//   date: getWorkoutDate(new Date(Date.now())),
//   average1RM: 0,
//   workoutVolume: 0,
// };

interface ExerciseHistoryFormProps {
  create: boolean;
  setCreate: (boolean: boolean) => void;
  currentExerciseData: ExerciseData;
  setCurrentExerciseData: (exercise: ExerciseData | null) => void;
}

const ExerciseHistoryForm: React.FC<ExerciseHistoryFormProps> = ({
  create,
  setCreate,
  currentExerciseData,
  setCurrentExerciseData,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ExerciseData>({
    date: currentExerciseData.date,
    average1RM: currentExerciseData.average1RM,
    workoutVolume: currentExerciseData.workoutVolume,
  });

  // TODO: Complete the form input fields and the handlers for each one.
  // TODO: Add the possibility for the user to enter a Weight and Reps to calculate the 1RM if they don't know it, same with the Workout Volume, but also add the Sets

  const handleCancel = () => {
    setCurrentExerciseData(null);
    if (create) {
      setCreate(false);
    }
  };
  return (
    <div
      onClick={handleCancel}
      className="absolute inset-0 flex flex-col items-center bg-black/30"
    >
      <form
        className="absolute top-1/12 flex w-10/12 flex-col gap-4 rounded bg-white p-3 text-black dark:bg-stone-900 dark:text-white"
        name="exerciseForm"
        id="exerciseForm"
        // onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">
            {create ? t("createExercise") : t("editExercise")}
          </h2>
          {create ? (
            <></>
          ) : (
            <button
              className="flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-red-600/10"
              //   onClick={handleDelete}
              type="button"
            >
              <img className="w-6" src={deleteImg} alt="Delete" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExerciseHistoryForm;
