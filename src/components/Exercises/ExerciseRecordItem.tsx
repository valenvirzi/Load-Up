import edit from "../../assets/edit.svg";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../context/SettingsContext";
import ExerciseDate from "./ExerciseDate";
import { ExerciseRecord } from "../../context/ExercisesContext";

interface ExerciseRecordItemProps {
  entry: ExerciseRecord;
  setSelectedExerciseRecord: React.Dispatch<
    React.SetStateAction<ExerciseRecord | null>
  >;
}

const ExerciseRecordItem: React.FC<ExerciseRecordItemProps> = ({
  entry,
  setSelectedExerciseRecord,
}) => {
  const { massUnit } = useSettingsStore();
  const { t } = useTranslation();
  return (
    <article className="flex items-stretch justify-between gap-2 border-0 border-b border-b-gray-400 py-2">
      <div className="flex flex-col gap-1">
        <ExerciseDate latestWorkoutDate={entry.date} displayHour={false} />
        <div className="flex flex-col text-sm opacity-80">
          <span>
            1RM: {entry.average1RM}
            {massUnit}
          </span>
          <span>
            {t("workoutVolume")}: {entry.workoutVolume}
            {massUnit}
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-stone-700 p-1.5 hover:bg-stone-700/85"
          type="button"
          onClick={() => setSelectedExerciseRecord(entry)}
        >
          <img className="w-5" src={edit} alt={t("edit")} />
        </button>
      </div>
    </article>
  );
};

export default ExerciseRecordItem;
