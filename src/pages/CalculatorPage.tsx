// TODO: Design this page

import { useTranslation } from "react-i18next";
import { useInventoryStore } from "../context/InventoryContext";
import { useSettingsStore } from "../context/SettingsContext";
import { useEffect, useState } from "react";
import { Barbell, Plate } from "../types/types";
import { Exercise, useExercisesStore } from "../context/ExercisesContext";
import calculateTotalWeight from "../utils/calculateTotalWeight";
import calculateLoadedBarbell from "../utils/calculateLoadedBarbell";

const CalculatorPage: React.FC = () => {
  const { t } = useTranslation();
  const { massUnit } = useSettingsStore();
  const { plates, barbells } = useInventoryStore();
  const { exercises } = useExercisesStore();
  const [barbellDisplayed, setBarbellDisplayed] = useState<Barbell>(
    barbells[0],
  );
  const [currentExercise, setCurrentExercise] = useState<Exercise>(
    exercises[0],
  );
  const [renderedPlates, setRenderedPlates] = useState<Plate[]>([]);
  const [desiredWeight, setDesiredWeight] = useState<string>("");
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty values, but avoid zeros to the left
    if (value === "" || /^(0|[1-9]\d*)(\.\d*)?$/.test(value)) {
      setDesiredWeight(value);
    }
  };

  const handleNumberBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Convert to number or reset to 0 on blur if empty
    if (value === "") setDesiredWeight("0");
  };

  const handleSubmitWeight = () => {
    setError(null);
    if (Number(desiredWeight) < barbellDisplayed.weight) {
      setError("weightGreaterThanBarbell");
      return;
    }
    setRenderedPlates(
      calculateLoadedBarbell(
        Number(desiredWeight),
        barbellDisplayed.weight,
        plates,
      ),
    );
  };

  useEffect(() => {
    setTotalWeight(
      calculateTotalWeight(renderedPlates) + barbellDisplayed.weight,
    );
  }, [renderedPlates, barbellDisplayed]);
  return (
    <main className="flex flex-col items-stretch gap-4 p-2">
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
      </section>
      <section className="flex flex-col px-1">
        {/* TODO: Make the calculating logic to later render the loaded bar with the corresponding weight given the input weight and the available plates */}
        <div className="relative mt-16 flex h-6 items-center gap-1 rounded-sm bg-slate-400 text-white">
          <div className="absolute flex items-center justify-center rounded-sm bg-slate-400 p-3">
            <span className="font-medium">{barbellDisplayed.weight}</span>
          </div>
          {renderedPlates.map((plate, index) => {
            return (
              <button
                key={plate.id}
                onClick={() => {
                  setRenderedPlates((prevPlates) =>
                    prevPlates.filter((p) => p.id !== plate.id),
                  );
                }}
                className={`plate ${index === 0 ? "ml-12" : ""} z-10 flex h-32 w-8 cursor-pointer items-center justify-center rounded-sm ${plate.color} p-2 md:p-5`}
              >
                <span className="plateWeight font-semibold">
                  {plate.weight}
                </span>
              </button>
            );
          })}
        </div>
      </section>
      <div className="relative top-20 self-center">
        <p className="text-xl">
          {t("calculatedWeight")}: {totalWeight}
          {massUnit}
        </p>
      </div>
      <section className="relative top-20 flex w-full flex-col items-stretch gap-1 px-2">
        <label className="text-sm" htmlFor="desiredWeight">
          {t("enterDesiredWeight")} ({massUnit}):
        </label>
        <div className="flex items-stretch">
          <input
            className="w-full cursor-pointer rounded-l bg-gray-100 p-2 px-3 dark:bg-zinc-700"
            placeholder={t("enterDesiredWeight")}
            type="text"
            inputMode="decimal"
            pattern="/^(0|[1-9]\d*)(\.\d*)?$/"
            name="desiredWeight"
            id="desiredWeight"
            min={0}
            step={0.05}
            value={desiredWeight}
            onChange={handleNumberChange}
            onBlur={handleNumberBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmitWeight();
              }
            }}
          />
          <button
            className="cursor-pointer rounded-r bg-violet-800 p-2 hover:bg-violet-800/85"
            type="button"
            onClick={() => {
              handleSubmitWeight();
            }}
          >
            <img className="w-6" src="./send-arrow.svg" alt="Submit" />
          </button>
        </div>
        {error ? <p className="text-sm text-red-700">{t(error)}</p> : <></>}
      </section>
    </main>
  );
};

export default CalculatorPage;
