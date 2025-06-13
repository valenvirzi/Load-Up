import { useTranslation } from "react-i18next";
import {
  Exercise,
  useExercisesStore,
  WorkoutDate,
} from "../../context/ExercisesContext";
import calculate1RM from "../../utils/calculate1RM";
import workoutDateToText from "../../utils/workoutDateToText";
import { useSettingsStore } from "../../context/SettingsContext";

interface SaveRecordBtnProps {
  currentExercise: Exercise;
  totalWeight: number;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const SaveRecordBtn: React.FC<SaveRecordBtnProps> = ({
  currentExercise,
  totalWeight,
  setMessage,
}) => {
  const { t } = useTranslation();
  const { massUnit } = useSettingsStore();
  const { createExerciseRecord } = useExercisesStore();

  const saveRecord = () => {
    setMessage("");
    const calculatedWorkoutVolume =
      currentExercise.sets * currentExercise.repsPerSet * totalWeight;
    const calculated1RM = calculate1RM(totalWeight, currentExercise.repsPerSet);
    const currentTime = new Date();
    const currentWorkoutDate: WorkoutDate = {
      year: currentTime.getFullYear(),
      month: currentTime.getMonth() + 1,
      day: currentTime.getDate(),
      hour: currentTime.getHours(),
      minute: currentTime.getMinutes(),
    };
    console.log(currentExercise);
    console.log(totalWeight);
    console.log(calculated1RM);
    if (
      confirm(
        `${t("saveRecord?")}\n1RM: ${calculated1RM}${massUnit},\n${t("workoutVolume")}: ${calculatedWorkoutVolume}${massUnit},\n${t("date")}: ${workoutDateToText(currentWorkoutDate, true)}`,
      )
    )
      try {
        createExerciseRecord(currentExercise.name, {
          workoutVolume: calculatedWorkoutVolume,
          average1RM: calculated1RM,
          date: currentWorkoutDate,
        });
      } catch (err) {
        if (err instanceof Error) {
          setMessage(err.message);
        }
      }
  };

  return (
    <section className="flex justify-center py-2 lg:justify-normal lg:py-0">
      <button
        onClick={saveRecord}
        className="w-full cursor-pointer rounded-full bg-violet-800 p-3 px-4 text-white hover:bg-violet-800/85 lg:min-w-76 lg:py-2"
        type="button"
      >
        {t("saveRecordTo")} {currentExercise.name}
      </button>
    </section>
  );
};

export default SaveRecordBtn;
