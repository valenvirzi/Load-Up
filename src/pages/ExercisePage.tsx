import { useParams } from "react-router-dom";
import { ExerciseRecord, useExercisesStore } from "../context/ExercisesContext";
import { useTranslation } from "react-i18next";
import sortExerciseHistory, { SortOrder } from "../utils/sortExerciseHistory";
import { useState } from "react";
import ExerciseHistoryForm from "../components/Exercises/ExerciseHistoryForm";
import ExerciseChart from "../components/Exercises/ExerciseChart";
import ExerciseRecordItem from "../components/Exercises/ExerciseRecordItem";
import CreateRecordBtn from "../components/Exercises/CreateRecordBtn";
import RecordSortSelect from "../components/Exercises/RecordSortSelect";
import AllExercisesSection from "../components/Exercises/AllExercisesSection";

const ExercisePage: React.FC = () => {
  // TODO: Componetizar funcionalidades y elementos.

  const params = useParams<{ exerciseName: string }>();
  const { t } = useTranslation();
  const { exercises } = useExercisesStore();
  const exercise = exercises.find((e) => e.name === params.exerciseName);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [create, setCreate] = useState<boolean>(false);
  const [selectedExerciseRecord, setSelectedExerciseRecord] =
    useState<ExerciseRecord | null>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "asc") {
      setSortOrder("asc");
    } else {
      setSortOrder("desc");
    }
  };

  if (params.exerciseName === "all") {
    return <AllExercisesSection />;
  }
  if (!exercise) {
    return (
      <p className="text-sm text-red-700">Error 404: {t("exerciseNotFound")}</p>
    );
  }
  const sortedHistory = sortExerciseHistory(exercise.history, sortOrder);
  return (
    <div className="flex flex-col gap-2 px-2">
      <div>
        <h3 className="text-xl xl:text-2xl">{exercise.name}</h3>
      </div>
      <div className="flex flex-col gap-2 xl:flex-row xl:gap-4">
        <ExerciseChart history={sortedHistory} />
        <section className="flex flex-col gap-2 xl:w-1/2">
          <CreateRecordBtn
            setCreate={setCreate}
            setSelectedExerciseRecord={setSelectedExerciseRecord}
          />
          <hr className="border-0 border-b border-b-gray-400" />
          <RecordSortSelect handleSelectChange={handleSelectChange} />

          {sortedHistory.length === 0 ? (
            <p className="mt-2 text-center text-sm text-gray-400">
              {t("noExerciseRecords")}
            </p>
          ) : (
            <ul className="flex flex-col items-stretch border-0 border-t border-t-gray-400 lg:max-h-[450px] lg:overflow-y-scroll">
              {sortedHistory.map((entry, index) => {
                return (
                  <ExerciseRecordItem
                    entry={entry}
                    setSelectedExerciseRecord={setSelectedExerciseRecord}
                    key={index}
                  />
                );
              })}
            </ul>
          )}
        </section>
      </div>

      {selectedExerciseRecord === null ? (
        <></>
      ) : (
        <ExerciseHistoryForm
          exercise={exercise}
          create={create}
          setCreate={setCreate}
          selectedExerciseRecord={selectedExerciseRecord}
          setSelectedExerciseRecord={setSelectedExerciseRecord}
        />
      )}
    </div>
  );
};

export default ExercisePage;
