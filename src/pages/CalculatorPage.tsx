import { useTranslation } from "react-i18next";
import { useInventoryStore } from "../context/InventoryContext";
import { useSettingsStore } from "../context/SettingsContext";
import { useEffect, useRef, useState } from "react";
import { Barbell, Plate } from "../types/types";
import { Exercise, useExercisesStore } from "../context/ExercisesContext";
import calculateTotalWeight from "../utils/calculateTotalWeight";
import calculateLoadedBarbell from "../utils/calculateLoadedBarbell";
import ExerciseSelector from "../components/ExerciseSelector";
import BarbellSelector from "../components/BarbellSelector";

const CalculatorPage: React.FC = () => {
  // TODO: Componetizar funcionalidades y elementos
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const { massUnit } = useSettingsStore();
  const { plates, barbells } = useInventoryStore();
  const { exercises } = useExercisesStore();
  const [barbellDisplayed, setBarbellDisplayed] = useState<Barbell>(
    barbells[0] ?? {
      id: "barbell,standard,20",
      weight: 20,
      color: "bg-zinc-600",
      type: "Standard",
    },
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
    <main className="flex flex-col gap-4 p-2 px-4">
      <div className="p-2">
        <h2 className="text-3xl">{t("calculator")}</h2>
      </div>
      <section className="flex flex-col gap-2 px-2">
        {exercises.length === 0 ? (
          <></>
        ) : (
          <ExerciseSelector
            currentExercise={currentExercise}
            exercises={exercises}
            setCurrentExercise={setCurrentExercise}
          />
        )}
        {barbells.length === 0 ? (
          <></>
        ) : (
          <BarbellSelector
            barbellDisplayed={barbellDisplayed}
            barbells={barbells}
            setBarbellDisplayed={setBarbellDisplayed}
          />
        )}
      </section>
      <section className="flex h-44 overflow-x-auto overflow-y-hidden px-1 pt-2">
        <div
          className={`relative mt-16 flex h-6 w-auto min-w-60 items-center gap-1 rounded-sm ${barbellDisplayed.color} text-white`}
        >
          <div
            className={`absolute flex items-center justify-center rounded-sm ${barbellDisplayed.color} p-3`}
          >
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
                className={`plate ${index === 0 ? "ml-12" : ""} ${index === renderedPlates.length - 1 ? "mr-2" : ""} z-10 flex h-32 min-w-9 cursor-pointer items-center justify-center rounded-sm ${plate.color} p-2 md:p-4`}
              >
                <span className="plateWeight font-semibold">
                  {plate.weight}
                </span>
              </button>
            );
          })}
        </div>
      </section>
      <div className="relative top-16 self-center px-4 text-xl">
        <div className="flex w-full items-center justify-between gap-6">
          <p>{t("currentWeight")}:</p>
          <span>
            {totalWeight}
            {massUnit}
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-6">
          <p>{t("inputWeight")}:</p>
          <span>
            {desiredWeight ? desiredWeight : 0}
            {massUnit}
          </span>
        </div>
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
            ref={inputRef}
            onFocus={() => {
              inputRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }}
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
