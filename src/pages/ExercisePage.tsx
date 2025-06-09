import edit from "../assets/edit.svg";
import { useParams } from "react-router-dom";
import { ExerciseRecord, useExercisesStore } from "../context/ExercisesContext";
import { useTranslation } from "react-i18next";
import sortExerciseHistory, { SortOrder } from "../utils/sortExerciseHistory";
import { useState } from "react";
import ExerciseDate from "../components/Exercises/ExerciseDate";
import { useSettingsStore } from "../context/SettingsContext";
import ExerciseHistoryForm from "../components/Exercises/ExerciseHistoryForm";
import ExerciseChart from "../components/Exercises/ExerciseChart";

const ExercisePage: React.FC = () => {
  // TODO: Componetizar funcionalidades y elementos.

  const params = useParams<{ exerciseName: string }>();
  const { massUnit } = useSettingsStore();
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
    return (
      <div className="flex flex-col gap-2 px-2">
        <div>
          <h3 className="text-xl">{t("allExercises")}</h3>
        </div>
        {/* TODO: Insertar 2 gráficos de radar:
            * Gráfico 1:
                - Angle Axis: exercise.name
                - Radar datakey: 1RM más reciente de ese ejercicio.
            * Gráfico 2:
                - Eje X: exercise.name
                - Radar datakey: Volumen de Entrenamiento más reciente de ese ejercicio.
      */}

        {/* TODO: Agregar una lista de elementos que contengan el desempeño más reciente de cada ejercicio con su correspondiente:
            - Fecha
            - 1RM
            - Volumen de Entrenamiento
      */}
      </div>
    );
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
        <h3 className="text-xl">{exercise.name}</h3>
      </div>
      <ExerciseChart history={sortedHistory} />
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
      <hr className="border-0 border-b border-b-gray-400" />
      <div className="flex items-center justify-between">
        <h4>{t("sortElements")}:</h4>
        <select
          onChange={handleSelectChange}
          name="historyOrder"
          id="historyOrder"
          className="cursor-pointer rounded border-none bg-gray-100 p-2 text-sm dark:bg-zinc-700"
        >
          <option value="desc">{t("recentFirst")}</option>
          <option value="asc">{t("oldFirst")}</option>
        </select>
      </div>

      {sortedHistory.length === 0 ? (
        <p className="mt-2 text-center text-sm text-gray-400">
          {t("noExerciseRecords")}
        </p>
      ) : (
        <ul className="flex flex-col items-stretch border-0 border-t border-t-gray-400">
          {sortedHistory.map((entry, index) => {
            return (
              <li
                className="flex items-stretch justify-between gap-2 border-0 border-b border-b-gray-400 py-2"
                key={index}
              >
                <div className="flex flex-col gap-1">
                  <ExerciseDate
                    latestWorkoutDate={entry.date}
                    displayHour={false}
                  />
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
              </li>
            );
          })}
        </ul>
      )}

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
