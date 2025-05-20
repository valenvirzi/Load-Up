import deleteImg from "../assets/delete.svg";
import { useState } from "react";
import {
  Exercise,
  ExerciseRecord,
  useExercisesStore,
} from "../context/ExercisesContext";
import { useTranslation } from "react-i18next";
// import getWorkoutDate from "../utils/getWorkoutDate";

// const defaultObject = {
//   date: getWorkoutDate(new Date(Date.now())),
//   average1RM: 0,
//   workoutVolume: 0,
// };

interface ExerciseHistoryFormProps {
  exercise: Exercise;
  create: boolean;
  setCreate: (boolean: boolean) => void;
  selectedExerciseRecord: ExerciseRecord;
  setSelectedExerciseRecord: (exercise: ExerciseRecord | null) => void;
}

const ExerciseHistoryForm: React.FC<ExerciseHistoryFormProps> = ({
  exercise,
  create,
  setCreate,
  selectedExerciseRecord,
  setSelectedExerciseRecord,
}) => {
  const { t } = useTranslation();
  const { createExerciseRecord, deleteExerciseRecord, updateExerciseRecord } =
    useExercisesStore();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ExerciseRecord>({
    date: selectedExerciseRecord.date,
    average1RM: selectedExerciseRecord.average1RM,
    workoutVolume: selectedExerciseRecord.workoutVolume,
  });

  // TODO: Complete the form input fields and the handlers for each one.
  // TODO: Add the possibility for the user to enter a Weight and Reps to calculate the 1RM if they don't know it, same with the Workout Volume, but also add the Sets

  const handleDelete = () => {
    if (confirm(t("confirmDelete"))) {
      deleteExerciseRecord(exercise.name, selectedExerciseRecord);
      setSelectedExerciseRecord(null);
    }
  };

  const handleCancel = () => {
    setSelectedExerciseRecord(null);
    if (create) {
      setCreate(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // TODO: Insert fields validation here

    if (create) {
      try {
        createExerciseRecord(exercise.name, { ...formData });
        setSelectedExerciseRecord(null);
        setCreate(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    } else {
      try {
        updateExerciseRecord(exercise.name, selectedExerciseRecord, {
          ...formData,
        });
        setSelectedExerciseRecord(null);
        setCreate(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }
  };
  return (
    <div
      onClick={handleCancel}
      className="absolute inset-0 flex flex-col items-center bg-black/30"
    >
      <form
        className="absolute top-1/12 flex w-10/12 flex-col gap-4 rounded bg-white p-3 text-black dark:bg-stone-900 dark:text-white"
        name="exerciseRecordForm"
        id="exerciseRecordForm"
        // onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">
            {create ? t("createExerciseRecord") : t("editExerciseRecord")}
          </h2>
          {create ? (
            <></>
          ) : (
            <button
              className="flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-red-600/10"
              onClick={handleDelete}
              type="button"
            >
              <img className="w-6" src={deleteImg} alt="Delete" />
            </button>
          )}
        </div>
        {error && <p className="text-red-500">{t(error)}</p>}
        <div>
          {/* // TODO: Create form elements to edit and create a new ExerciseRecord */}
        </div>
      </form>
    </div>
  );
};

export default ExerciseHistoryForm;
