import radarGraph from "../assets/radar-graph.svg";
import { useTranslation } from "react-i18next";
import { Exercise, useExercisesStore } from "../context/ExercisesContext";
import { useState } from "react";
import ExerciseForm from "../components/Exercises/ExerciseForm";
import ExerciseItem from "../components/Exercises/ExerciseItem";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import CreateExerciseBtn from "../components/Exercises/CreateExerciseBtn";

const ExercisesPage: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { exercises } = useExercisesStore();
  const [create, setCreate] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const to =
    location.pathname === "/exercises/all" ? "/exercises" : "/exercises/all";
  return (
    <main className="flex flex-col items-stretch p-2 px-4 lg:px-10 lg:py-4">
      <div className="flex items-center justify-between p-2">
        <h2 className="text-3xl xl:text-4xl">{t("exercises")}</h2>
        {exercises.length >= 3 ? (
          <NavLink
            className={({ isActive }) => {
              const activeClass = isActive
                ? "bg-violet-800 hover:bg-violet-800/85"
                : "";
              return `group flex items-center justify-center gap-1.5 rounded-full bg-stone-700 p-1.5 transition-all duration-300 hover:bg-stone-700/85 xl:p-2 xl:px-3 ${activeClass}`;
            }}
            to={to}
          >
            <img
              className="w-7 xl:w-8"
              src={radarGraph}
              alt={t("radarGraph")}
            />
            <span className="hidden text-white xl:inline-block">
              {t("seeExercisesChart")}
            </span>
          </NavLink>
        ) : (
          <></>
        )}
      </div>
      {location.pathname === "/exercises" ? (
        <section className="flex flex-col gap-2 px-2">
          <CreateExerciseBtn
            setCreate={setCreate}
            setSelectedExercise={setSelectedExercise}
          />
          <ul className="border-0 border-t border-t-gray-500 xl:grid xl:grid-cols-2 xl:gap-x-10 2xl:grid-cols-3">
            {exercises.map((exercise) => {
              return (
                <ExerciseItem
                  key={exercise.name}
                  exercise={exercise}
                  setSelectedExercise={setSelectedExercise}
                />
              );
            })}
          </ul>
          {selectedExercise === null ? (
            <></>
          ) : (
            <ExerciseForm
              create={create}
              setCreate={setCreate}
              selectedExercise={selectedExercise}
              setSelectedExercise={setSelectedExercise}
            />
          )}
        </section>
      ) : (
        <Outlet />
      )}
    </main>
  );
};

export default ExercisesPage;
