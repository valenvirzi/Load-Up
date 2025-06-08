import { useTranslation } from "react-i18next";
import { WorkoutDate } from "../context/ExercisesContext";
import workoutDateToText from "../utils/workoutDateToText";

interface ExerciseDateProps {
  latestWorkoutDate: WorkoutDate | null;
  displayHour: boolean;
}

const ExerciseDate: React.FC<ExerciseDateProps> = ({
  latestWorkoutDate,
  displayHour = false,
}) => {
  const { t } = useTranslation();
  if (!latestWorkoutDate) {
    return <span>{t("noDateAvailable")}</span>;
  } else {
    return <span>{workoutDateToText(latestWorkoutDate, displayHour)}</span>;
  }
};

export default ExerciseDate;
