import deleteImg from "../assets/delete.svg";
import tickImg from "../assets/tick.svg";
import { useState } from "react";
import {
  Exercise,
  ExerciseRecord,
  useExercisesStore,
} from "../context/ExercisesContext";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../context/SettingsContext";
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
  const { massUnit } = useSettingsStore();
  const { t } = useTranslation();
  const { createExerciseRecord, deleteExerciseRecord, updateExerciseRecord } =
    useExercisesStore();
  const [calculate1RM, setCalculate1RM] = useState<boolean>(false);
  const [calculateWorkoutVolume, setCalculateWorkoutVolume] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ExerciseRecord>({
    date: selectedExerciseRecord.date,
    average1RM: selectedExerciseRecord.average1RM,
    workoutVolume: selectedExerciseRecord.workoutVolume,
  });

  // TODO: Complete the form input fields and the handlers for each one.
  // TODO: Add the possibility for the user to enter a Weight and Reps to calculate the 1RM if they don't know it, same with the Workout Volume, but also add the Sets

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

    if (formData.average1RM <= 0 || formData.workoutVolume <= 0) {
      setError("weightAboveZero");
      return;
    }
    const date = formData.date;
    if (
      new Date(date.year, date.month - 1, date.day, date.hour, date.minute) >
      new Date()
    ) {
      setError("dateLowerThanCurrentDate");
      return;
    }
    //******************

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
        <div className="flex max-h-96 flex-col gap-4 overflow-y-auto p-0.5">
          {error && <p className="text-red-500">{t(error)}</p>}
          <div className="flex flex-col gap-4">
            {/* // TODO: Edit and create a new ExerciseRecord feature */}
            {/* Date */}
            <div className="flex flex-col gap-1">
              <label className="text-lg" htmlFor="workoutDate">
                {t("date")}
              </label>
              <input
                className="cursor-pointer rounded bg-gray-100 p-2 dark:bg-zinc-700"
                type="date"
                value={`${String(selectedExerciseRecord.date.year).padStart(2, "0")}-${String(selectedExerciseRecord.date.month).padStart(2, "0")}-${String(selectedExerciseRecord.date.day).padStart(2, "0")}`}
                name="workoutDate"
                id="workoutDate"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h4 className="text-lg">1RM</h4>

                <label
                  className="flex cursor-pointer items-center gap-1 text-sm opacity-70"
                  htmlFor="calculate1RM"
                >
                  <span>{t("calculate?")}</span>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 border-gray-400 transition ${calculate1RM ? "bg-violet-600" : ""}`}
                  >
                    {calculate1RM ? <img src={tickImg} alt="Tick" /> : <></>}
                  </span>
                  <input
                    onChange={() => {
                      setCalculate1RM(!calculate1RM);
                    }}
                    className="hidden"
                    checked={calculate1RM}
                    type="checkbox"
                    name="calculate1RM"
                    id="calculate1RM"
                  />
                </label>
              </div>
              {calculate1RM ? (
                <div className="flex flex-col gap-2">
                  {/* Reps per Set */}
                  <div className="flex flex-col items-start gap-1">
                    <label className="" htmlFor="reps">
                      {t("reps")}
                    </label>
                    <input
                      className="w-1/2 rounded bg-gray-100 p-1 px-2 dark:bg-zinc-700"
                      type="number"
                      name="reps"
                      placeholder="0"
                      min={1}
                      step={1}
                      id="reps"
                      value={0}
                    />
                  </div>
                  {/* Weight */}
                  <div className="flex flex-col items-start gap-1">
                    <label className="" htmlFor="currentWeight">
                      {t("weight")}
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        className="w-1/2 rounded bg-gray-100 p-1 px-2 dark:bg-zinc-700"
                        type="number"
                        name="currentWeight"
                        placeholder="0"
                        min={0}
                        step={0.05}
                        id="currentWeight"
                        value={0}
                      />
                      <span className="text-black/65 dark:text-white/65">
                        {massUnit}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-1">
                    <input
                      className="w-1/2 rounded bg-gray-100 p-2 dark:bg-zinc-700"
                      type="number"
                      name="average1RM"
                      placeholder="0"
                      min={0}
                      step={0.01}
                      id="average1RM"
                      value={
                        formData.average1RM === 0 ? "" : formData.average1RM
                      }
                      onChange={handleNumberChange}
                      onBlur={handleNumberBlur}
                    />
                    <span className="text-black/65 dark:text-white/65">
                      {massUnit}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h4 className="text-lg">{t("workoutVolume")}</h4>

                <label
                  className="flex cursor-pointer items-center gap-1 text-sm opacity-70"
                  htmlFor="calculateWorkoutVolume"
                >
                  <span>{t("calculate?")}</span>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 border-gray-400 transition ${calculateWorkoutVolume ? "bg-violet-600" : ""}`}
                  >
                    {calculateWorkoutVolume ? (
                      <img src={tickImg} alt="Tick" />
                    ) : (
                      <></>
                    )}
                  </span>
                  <input
                    onChange={() => {
                      setCalculateWorkoutVolume(!calculateWorkoutVolume);
                    }}
                    className="hidden"
                    checked={calculateWorkoutVolume}
                    type="checkbox"
                    name="calculateWorkoutVolume"
                    id="calculateWorkoutVolume"
                  />
                </label>
              </div>
              {calculateWorkoutVolume ? (
                <div className="flex flex-col gap-2">
                  {/* Sets */}
                  <div className="flex flex-col gap-1">
                    <label className="" htmlFor="workoutDate">
                      {t("sets")}
                    </label>
                    <input
                      className="w-1/2 rounded bg-gray-100 p-1 px-2 dark:bg-zinc-700"
                      type="number"
                      name="sets"
                      placeholder="0"
                      min={1}
                      step={1}
                      id="sets"
                      value={0}
                    />
                  </div>
                  {/* Reps per Set */}
                  <div className="flex flex-col items-start gap-1">
                    <label className="" htmlFor="repsPerSet">
                      {t("repsPerSet")}
                    </label>
                    <input
                      className="w-1/2 rounded bg-gray-100 p-1 px-2 dark:bg-zinc-700"
                      type="number"
                      name="repsPerSet"
                      placeholder="0"
                      min={1}
                      step={1}
                      id="repsPerSet"
                      value={0}
                    />
                  </div>
                  {/* Weight */}
                  <div className="flex flex-col items-start gap-1">
                    <label className="" htmlFor="currentWeight">
                      {t("weight")}
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        className="w-1/2 rounded bg-gray-100 p-1 px-2 dark:bg-zinc-700"
                        type="number"
                        name="currentWeight"
                        placeholder="0"
                        min={0}
                        step={0.05}
                        id="currentWeight"
                        value={0}
                      />
                      <span className="text-black/65 dark:text-white/65">
                        {massUnit}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-1">
                    <input
                      className="w-1/2 rounded bg-gray-100 p-2 dark:bg-zinc-700"
                      type="number"
                      name="workoutVolume"
                      placeholder="0"
                      min={0}
                      step={0.05}
                      id="workoutVolume"
                      value={
                        formData.workoutVolume === 0
                          ? ""
                          : formData.workoutVolume
                      }
                      onChange={handleNumberChange}
                      onBlur={handleNumberBlur}
                    />
                    <span className="text-black/65 dark:text-white/65">
                      {massUnit}
                    </span>
                  </div>
                </div>
              )}
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

export default ExerciseHistoryForm;
