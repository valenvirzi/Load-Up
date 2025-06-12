import deleteImg from "../../assets/delete.svg";
import tickImg from "../../assets/tick.svg";
import { useEffect, useState } from "react";
import {
  Exercise,
  ExerciseRecord,
  useExercisesStore,
} from "../../context/ExercisesContext";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../context/SettingsContext";
import calculate1RM from "../../utils/calculate1RM";

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
  const [isCalculate1RM, setIsCalculate1RM] = useState<boolean>(false);
  const [calculateWorkoutVolume, setCalculateWorkoutVolume] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ExerciseRecord>({
    date: selectedExerciseRecord.date,
    average1RM: selectedExerciseRecord.average1RM,
    workoutVolume: selectedExerciseRecord.workoutVolume,
  });
  // States for 1RM calculation inputs
  const [reps1RM, setReps1RM] = useState<string>("0");
  const [weight1RM, setWeight1RM] = useState<string>("0");
  // States for Workout Volume calculation inputs
  const [setsVolume, setSetsVolume] = useState<string>("0");
  const [repsVolume, setRepsVolume] = useState<string>("0");
  const [weightVolume, setWeightVolume] = useState<string>("0");

  // TODO: Complete the form input fields and the handlers for each one.
  // TODO: Add the possibility for the user to enter a Weight and Reps to calculate the 1RM if they don't know it, same with the Workout Volume, but also add the Sets

  // Effect to calculate 1RM and update formData.average1RM
  useEffect(() => {
    if (isCalculate1RM) {
      const calculated1RM = calculate1RM(Number(weight1RM), Number(reps1RM));
      setFormData((prev) => ({
        ...prev,
        average1RM: parseFloat(calculated1RM.toFixed(2)), // Format to 2 decimal places
      }));
    } else {
      // When switching off calculation, reset calculation inputs
      setReps1RM("0");
      setWeight1RM("0");
    }
  }, [isCalculate1RM, weight1RM, reps1RM]);

  // Effect to calculate Workout Volume and update formData.workoutVolume
  useEffect(() => {
    if (calculateWorkoutVolume) {
      const calculatedVolume =
        Number(setsVolume) * Number(repsVolume) * Number(weightVolume);
      setFormData((prev) => ({
        ...prev,
        workoutVolume: parseFloat(calculatedVolume.toFixed(2)), // Format to 2 decimal places
      }));
    } else {
      // When switching off calculation, reset calculation inputs
      setSetsVolume("0");
      setRepsVolume("0");
      setWeightVolume("0");
    }
  }, [calculateWorkoutVolume, setsVolume, repsVolume, weightVolume]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Allow empty values, but avoid zeros to the left
    if (value === "" || /^(0|[1-9]\d*)(\.\d{0,2})?$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
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

  // Handlers for calculation inputs (reps1RM, weight1RM, setsVolume, repsVolume, weightVolume)
  const handleCalcInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
    isInteger: boolean = false,
  ) => {
    const { value } = e.target;
    if (value === "") {
      setState("0"); // Set to "0" to clear the field but keep calculation logic robust
      return;
    }
    if (isInteger) {
      // For integer fields (reps, sets)
      if (/^(0|[1-9]\d*)$/.test(value)) {
        setState(value);
      }
    } else {
      // For decimal fields (weight)
      if (/^(0|[1-9]\d*)(\.\d*)?$/.test(value)) {
        setState(value);
      }
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setFormData((prev) => ({
      ...prev,
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate() + 1,
        hour: prev.date.hour,
        minute: prev.date.minute,
      },
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
    if (isNaN(formData.average1RM) || isNaN(formData.workoutVolume)) {
      setError("invalidWeight");
    }
    const { date } = formData;
    const inputDate = new Date(
      date.year,
      date.month - 1,
      date.day,
      date.hour,
      date.minute,
    );
    if (inputDate > new Date()) {
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
        className="absolute top-1/12 flex w-10/12 max-w-md flex-col gap-4 rounded bg-white p-3 text-black dark:bg-stone-900 dark:text-white"
        name="exerciseRecordForm"
        id="exerciseRecordForm"
        onSubmit={handleSubmit}
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
                onChange={handleDateChange}
                value={`${String(formData.date.year).padStart(2, "0")}-${String(formData.date.month).padStart(2, "0")}-${String(formData.date.day).padStart(2, "0")}`}
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
                    className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 border-gray-400 transition ${isCalculate1RM ? "bg-violet-600" : ""}`}
                  >
                    {isCalculate1RM ? <img src={tickImg} alt="Tick" /> : <></>}
                  </span>
                  <input
                    onChange={() => {
                      setIsCalculate1RM(!isCalculate1RM);
                    }}
                    className="hidden"
                    checked={isCalculate1RM}
                    type="checkbox"
                    name="calculate1RM"
                    id="calculate1RM"
                  />
                </label>
              </div>

              <div
                className={`flex flex-col gap-2 ${isCalculate1RM ? "" : "hidden"}`}
              >
                {/* Reps */}
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
                    onChange={(e) => handleCalcInputChange(e, setReps1RM, true)}
                    value={reps1RM === "0" ? "" : reps1RM}
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
                      onChange={(e) => handleCalcInputChange(e, setWeight1RM)}
                      value={weight1RM === "0" ? "" : weight1RM}
                    />
                    <span className="text-black/65 dark:text-white/65">
                      {massUnit}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-1">
                  {isCalculate1RM ? (
                    <span className="text-black/65 dark:text-white/65">=</span>
                  ) : (
                    <></>
                  )}
                  <input
                    className={`w-1/2 rounded p-2 ${isCalculate1RM ? "bg-transparent" : "bg-gray-100 dark:bg-zinc-700"}`}
                    type="number"
                    name="average1RM"
                    placeholder="0"
                    min={0}
                    step={0.01}
                    id="average1RM"
                    value={formData.average1RM === 0 ? "" : formData.average1RM}
                    onChange={handleNumberChange}
                    onBlur={handleNumberBlur}
                    readOnly={isCalculate1RM}
                  />
                  <span className="text-black/65 dark:text-white/65">
                    {massUnit}
                  </span>
                </div>
              </div>
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

              <div
                className={`flex flex-col gap-2 ${calculateWorkoutVolume ? "" : "hidden"}`}
              >
                {/* Sets */}
                <div className="flex flex-col gap-1">
                  <label className="" htmlFor="setsVolume">
                    {t("sets")}
                  </label>
                  <input
                    className="w-1/2 rounded bg-gray-100 p-1 px-2 dark:bg-zinc-700"
                    type="number"
                    name="setsVolume"
                    placeholder="0"
                    min={1}
                    step={1}
                    id="setsVolume"
                    onChange={(e) =>
                      handleCalcInputChange(e, setSetsVolume, true)
                    }
                    value={setsVolume === "0" ? "" : setsVolume}
                  />
                </div>
                {/* Reps per Set */}
                <div className="flex flex-col items-start gap-1">
                  <label className="" htmlFor="repsVolume">
                    {t("repsPerSet")}
                  </label>
                  <input
                    className="w-1/2 rounded bg-gray-100 p-1 px-2 dark:bg-zinc-700"
                    type="number"
                    name="repsVolume"
                    placeholder="0"
                    min={1}
                    step={1}
                    id="repsVolume"
                    onChange={(e) =>
                      handleCalcInputChange(e, setRepsVolume, true)
                    }
                    value={repsVolume === "0" ? "" : repsVolume}
                  />
                </div>
                {/* Weight */}
                <div className="flex flex-col items-start gap-1">
                  <label className="" htmlFor="weightVolume">
                    {t("weight")}
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      className="w-1/2 rounded bg-gray-100 p-1 px-2 dark:bg-zinc-700"
                      type="number"
                      name="weightVolume"
                      placeholder="0"
                      min={0}
                      step={0.05}
                      id="weightVolume"
                      onChange={(e) =>
                        handleCalcInputChange(e, setWeightVolume)
                      }
                      value={weightVolume === "0" ? "" : weightVolume}
                    />
                    <span className="text-black/65 dark:text-white/65">
                      {massUnit}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-1">
                  {calculateWorkoutVolume ? (
                    <span className="text-black/65 dark:text-white/65">=</span>
                  ) : (
                    <></>
                  )}
                  <input
                    className={`w-1/2 rounded p-2 ${calculateWorkoutVolume ? "bg-transparent" : "bg-gray-100 dark:bg-zinc-700"}`}
                    type="number"
                    name="workoutVolume"
                    placeholder="0"
                    min={0}
                    step={0.05}
                    id="workoutVolume"
                    value={
                      formData.workoutVolume === 0 ? "" : formData.workoutVolume
                    }
                    onChange={handleNumberChange}
                    onBlur={handleNumberBlur}
                    readOnly={calculateWorkoutVolume}
                  />
                  <span className="text-black/65 dark:text-white/65">
                    {massUnit}
                  </span>
                </div>
              </div>
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
            form="exerciseRecordForm"
          >
            {create ? t("add") : t("update")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExerciseHistoryForm;
