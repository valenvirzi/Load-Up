// TODO: Design this page

import { useTranslation } from "react-i18next";
import { useInventoryStore } from "../context/InventoryContext";
import { useSettingsStore } from "../context/SettingsContext";
import { useState } from "react";
import { Barbell } from "../types/types";
import { Exercise, useExercisesStore } from "../context/ExercisesContext";

const CalculatorPage: React.FC = () => {
  const { t } = useTranslation();
  const { massUnit } = useSettingsStore();
  const { barbells } = useInventoryStore();
  const { exercises } = useExercisesStore();
  const [barbellDisplayed, setBarbellDisplayed] = useState<Barbell>(
    barbells[0],
  );
  const [currentExercise, setCurrentExercise] = useState<Exercise>(
    exercises[0],
  );
  return (
    <main className="flex flex-col items-stretch p-2">
      <div className="p-2">
        <h2 className="text-3xl">{t("calculator")}</h2>
      </div>
      {/* TODO: Make the right display for the loading of the barbell and write the logic. */}
      <section className="flex flex-col gap-2 px-2">
        <div className="flex flex-col gap-1">
          <label className="opacity-65" htmlFor="exerciseSelect">
            {t("selectExercise")}
          </label>
          <select
            className="cursor-pointer rounded border-none bg-gray-100 p-2 dark:bg-zinc-700"
            name="exerciseSelect"
            id="exerciseSelect"
            onChange={(e) => {
              const selectedName = e.target.value;
              const selectedExercise = exercises.find(
                (e) => e.name === selectedName,
              );
              if (selectedExercise) {
                setCurrentExercise(selectedExercise);
              }
            }}
            value={currentExercise.name}
          >
            {exercises.map((exercise) => {
              return (
                <option
                  className="flex"
                  value={exercise.name}
                  key={exercise.name}
                >
                  <span>{exercise.name}</span>
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="opacity-65" htmlFor="barbellSelect">
            {t("selectBarbell")}
          </label>
          <select
            className="cursor-pointer rounded border-none bg-gray-100 p-2 dark:bg-zinc-700"
            name="barbellSelect"
            id="barbellSelect"
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedBarbell = barbells.find((b) => b.id === selectedId);
              if (selectedBarbell) {
                setBarbellDisplayed(selectedBarbell);
              }
            }}
            value={barbellDisplayed.id}
          >
            {barbells.map((barbell) => {
              return (
                <option className="flex" value={barbell.id} key={barbell.id}>
                  <span>{barbell.type}</span>
                  <span> {`(${barbell.weight}${massUnit})`}</span>
                </option>
              );
            })}
          </select>
        </div>
        {/* TODO: Make the calculating logic to later render the loaded bar with the corresponding weight given the input weight and the available plates */}
        <div className="relative mt-16 flex h-6 w-11/12 items-center gap-1 rounded-sm bg-slate-400 text-white">
          <div className="absolute flex items-center justify-center rounded-sm bg-slate-400 p-3">
            <span className="font-medium">{barbellDisplayed.weight}</span>
          </div>
          <div className="plate z-10 ml-12 flex h-32 w-8 cursor-pointer items-center justify-center rounded-sm bg-slate-600 p-2 text-lg md:p-5">
            <span className="plateWeight font-semibold">{15}</span>
          </div>
          <div className="plate z-10 flex h-32 w-8 cursor-pointer items-center justify-center rounded-sm bg-slate-600 p-2 text-lg md:p-5">
            <span className="plateWeight font-semibold">{15}</span>
          </div>
          <div className="plate z-10 flex h-32 w-8 cursor-pointer items-center justify-center rounded-sm bg-slate-600 p-2 text-lg md:p-5">
            <span className="plateWeight font-semibold">{15}</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CalculatorPage;
