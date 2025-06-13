import { useTranslation } from "react-i18next";
import { Exercise } from "../../context/ExercisesContext";

interface CreateExerciseBtnProps {
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedExercise: React.Dispatch<React.SetStateAction<Exercise | null>>;
}

const CreateExerciseBtn: React.FC<CreateExerciseBtnProps> = ({
  setCreate,
  setSelectedExercise,
}) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={() => {
        setCreate(true);
        setSelectedExercise({
          name: "",
          sets: 0,
          repsPerSet: 0,
          currentWeight: 0,
          average1RM: null,
          latestWorkoutDate: null,
          workoutVolume: null,
          history: [],
        });
      }}
      className="mt-4 mb-2 cursor-pointer rounded-full bg-violet-800 p-3 text-white"
      type="button"
    >
      <span>{t("addNewExercise")}</span>
    </button>
  );
};

export default CreateExerciseBtn;
