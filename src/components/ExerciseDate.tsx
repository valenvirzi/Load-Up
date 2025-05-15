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
    const formattedDate: string = `${latestWorkoutDate.day}-${latestWorkoutDate.month}-${latestWorkoutDate.year} ${latestWorkoutDate.hour}:${latestWorkoutDate.minute}hs`;
    return <span>{formattedDate}</span>;
  }
};

export default ExerciseDate;
