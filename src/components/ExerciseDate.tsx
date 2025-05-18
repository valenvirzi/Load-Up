import { useTranslation } from "react-i18next";
import { WorkoutDate } from "../context/ExercisesContext";

interface ExerciseDateProps {
  latestWorkoutDate: WorkoutDate | null;
}

const ExerciseDate: React.FC<ExerciseDateProps> = ({ latestWorkoutDate }) => {
  const { t } = useTranslation();
  if (!latestWorkoutDate) {
    return <span>{t("noDateAvailable")}</span>;
  } else {
    const formattedDate: string = `${String(latestWorkoutDate.day).padStart(2, "0")}-${String(latestWorkoutDate.month).padStart(2, "0")}-${latestWorkoutDate.year} ${String(latestWorkoutDate.hour).padStart(2, "0")}:${String(latestWorkoutDate.minute).padStart(2, "0")}hs`;
    return <span>{formattedDate}</span>;
  }
};

export default ExerciseDate;
