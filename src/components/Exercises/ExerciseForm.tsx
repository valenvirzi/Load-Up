import deleteImg from "../../assets/delete.svg";
import { useTranslation } from "react-i18next";
import { Exercise, useExercisesStore } from "../../context/ExercisesContext";
import { useState } from "react";
import getWorkoutDate from "../../utils/getWorkoutDate";
import { useSettingsStore } from "../../context/SettingsContext";
import calculate1RM from "../../utils/calculate1RM";

interface ExerciseFormProps {
  create: boolean;
  setCreate: (boolean: boolean) => void;
  selectedExercise: Exercise;
  setSelectedExercise: (exercise: Exercise | null) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({
  create,
  setCreate,
  selectedExercise,
  setSelectedExercise,
}) => {
  const { t } = useTranslation();
  const { massUnit } = useSettingsStore();
  const { createExercise, deleteExercise, updateExercise, exercises } =
    useExercisesStore();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Exercise>({
    name: selectedExercise.name,
    currentWeight: selectedExercise.currentWeight,
    sets: selectedExercise.sets,
    repsPerSet: selectedExercise.repsPerSet,
    workoutVolume: selectedExercise.workoutVolume,
    average1RM: selectedExercise.average1RM,
    latestWorkoutDate: selectedExercise.latestWorkoutDate,
    history: selectedExercise.history,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedString = value.charAt(0).toUpperCase() + value.slice(1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: formattedString,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Allow empty values, but avoid zeros to the left
    if (value === "" || /^(0|[1-9]\d*)(\.\d*)?$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleIntChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value === "") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }

    if (!value.includes(".")) {
      const parsedValue = parseInt(value, 10);
      if (
        !isNaN(parsedValue) &&
        parsedValue > 0 &&
        String(parsedValue) === value
      ) {
        setFormData((prev) => ({ ...prev, [name]: parsedValue }));
      }
    }
  };

  const handleNumberBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // If input empty when no longer focused and value = "", then value = 0
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : Number(value),
    }));
  };

  const handleDelete = () => {
    if (confirm(t("confirmDelete"))) {
      deleteExercise(selectedExercise.name);
      setSelectedExercise(null);
    }
  };

  const handleCancel = () => {
    setSelectedExercise(null);
    if (create) {
      setCreate(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const name = formData.name;
    const sets = Number(formData.sets);
    const repsPerSet = Number(formData.repsPerSet);
    const weight = Number(formData.currentWeight);

    if (name === "") {
      setError("invalidName");
      return;
    }
    if (create && exercises.some((e) => e.name === name)) {
      setError("alreadyExerciseName");
      return;
    }
    if (isNaN(sets) || sets <= 0) {
      setError("setsAboveZero");
      return;
    }
    if (isNaN(repsPerSet) || repsPerSet <= 0) {
      setError("repsPerSetAboveZero");
      return;
    }
    if (isNaN(weight) || weight <= 0) {
      setError("weightAboveZero");
      return;
    }

    if (create) {
      try {
        createExercise({
          ...formData,
          latestWorkoutDate: getWorkoutDate(new Date()),
          workoutVolume:
            formData.sets * formData.repsPerSet * formData.currentWeight,
          average1RM: calculate1RM(formData.currentWeight, formData.repsPerSet),
        });
        setSelectedExercise(null);
        setCreate(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    } else {
      try {
        updateExercise(selectedExercise.name, {
          ...formData,
          latestWorkoutDate: getWorkoutDate(new Date()),
          workoutVolume:
            formData.sets * formData.repsPerSet * formData.currentWeight,
          average1RM: calculate1RM(formData.currentWeight, formData.repsPerSet),
        });
        setSelectedExercise(null);
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
        name="exerciseForm"
        id="exerciseForm"
        onSubmit={handleSubmit}
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
              onClick={handleDelete}
              type="button"
            >
              <img className="w-6" src={deleteImg} alt="Delete" />
            </button>
          )}
        </div>
        {error && <p className="text-red-500">{t(error)}</p>}

        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start gap-1">
            <label className="text-lg" htmlFor="name">
              {t("name")}
            </label>
            <div className="flex w-full flex-col">
              <input
                className="rounded bg-gray-100 p-2 dark:bg-zinc-700"
                type="text"
                name="name"
                placeholder="Bench Press, Squats..."
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-1">
            <label className="text-lg" htmlFor="sets">
              {t("sets")}
            </label>
            <div className="flex items-center gap-1">
              <input
                className="w-1/2 rounded bg-gray-100 p-2 dark:bg-zinc-700"
                type="number"
                name="sets"
                placeholder="0"
                min={1}
                step={1}
                id="sets"
                value={formData.sets === 0 ? "" : formData.sets}
                onChange={handleIntChange}
                onBlur={handleNumberBlur}
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-1">
            <label className="text-lg" htmlFor="repsPerSet">
              {t("repsPerSet")}
            </label>
            <div className="flex items-center gap-1">
              <input
                className="w-1/2 rounded bg-gray-100 p-2 dark:bg-zinc-700"
                type="number"
                name="repsPerSet"
                placeholder="0"
                min={1}
                step={1}
                id="repsPerSet"
                value={formData.repsPerSet === 0 ? "" : formData.repsPerSet}
                onChange={handleIntChange}
                onBlur={handleNumberBlur}
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <label className="text-lg" htmlFor="currentWeight">
              {t("weight")}
            </label>
            <div className="flex items-center gap-1">
              <input
                className="w-1/2 rounded bg-gray-100 p-2 dark:bg-zinc-700"
                type="number"
                name="currentWeight"
                placeholder="0"
                min={0}
                step={0.05}
                id="currentWeight"
                value={
                  formData.currentWeight === 0 ? "" : formData.currentWeight
                }
                onChange={handleNumberChange}
                onBlur={handleNumberBlur}
              />
              <span className="text-black/65 dark:text-white/65">
                {massUnit}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="cursor-pointer rounded-full px-6 py-3 text-violet-800 dark:text-white"
            type="button"
            onClick={handleCancel}
          >
            {t("cancel")}
          </button>
          <button
            className="cursor-pointer rounded-full bg-violet-800 px-6 py-3 text-white"
            type="submit"
            form="exerciseForm"
          >
            {create ? t("add") : t("update")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExerciseForm;
