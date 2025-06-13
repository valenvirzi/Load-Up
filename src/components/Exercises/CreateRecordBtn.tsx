import { useTranslation } from "react-i18next";
import { ExerciseRecord } from "../../context/ExercisesContext";

interface CreateRecordBtnProps {
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedExerciseRecord: React.Dispatch<
    React.SetStateAction<ExerciseRecord | null>
  >;
}

const CreateRecordBtn: React.FC<CreateRecordBtnProps> = ({
  setCreate,
  setSelectedExerciseRecord,
}) => {
  const { t } = useTranslation();
  return (
    <button
      className="mt-2 mb-2 cursor-pointer rounded-full bg-violet-800 p-3 text-white hover:bg-violet-800/85"
      onClick={() => {
        setCreate(true);
        const newDate = new Date();
        setSelectedExerciseRecord({
          date: {
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1,
            day: newDate.getDate(),
            hour: newDate.getHours(),
            minute: newDate.getMinutes(),
          },
          average1RM: 0,
          workoutVolume: 0,
        });
      }}
      type="button"
    >
      <span>{t("addNewRecord")}</span>
    </button>
  );
};

export default CreateRecordBtn;
