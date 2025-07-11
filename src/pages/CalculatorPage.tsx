import { useTranslation } from "react-i18next";
import { useInventoryStore } from "../context/InventoryContext";
import { useEffect, useState } from "react";
import { Barbell, Plate } from "../types/types";
import { Exercise, useExercisesStore } from "../context/ExercisesContext";
import calculateTotalWeight from "../utils/calculateTotalWeight";
import ExerciseSelector from "../components/Calculator/ExerciseSelector";
import BarbellSelector from "../components/Calculator/BarbellSelector";
import LoadedBarbell from "../components/Calculator/LoadedBarbell";
import CalculatorOutputText from "../components/Calculator/CalculatorOutputText";
import CalculatorInput from "../components/Calculator/CalculatorInput";

const CalculatorPage: React.FC = () => {
  const { t } = useTranslation();
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
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTotalWeight(
      calculateTotalWeight(renderedPlates) + barbellDisplayed.weight,
    );
  }, [renderedPlates, barbellDisplayed]);
  return (
    <main className="flex flex-col gap-4 p-2 px-4 lg:px-10 lg:py-4">
      <div className="p-2">
        <h2 className="text-3xl xl:text-4xl">{t("calculator")}</h2>
      </div>
      <section className="flex flex-col gap-2 px-2">
        {exercises.length === 0 ? (
          <></>
        ) : (
          <ExerciseSelector
            currentExercise={currentExercise}
            exercises={exercises}
            setCurrentExercise={setCurrentExercise}
            setMessage={setMessage}
            totalWeight={totalWeight}
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
      <LoadedBarbell
        barbellDisplayed={barbellDisplayed}
        renderedPlates={renderedPlates}
        setRenderedPlates={setRenderedPlates}
      />
      <CalculatorOutputText
        desiredWeight={desiredWeight}
        totalWeight={totalWeight}
        message={message}
      />
      <CalculatorInput
        barbellDisplayed={barbellDisplayed}
        desiredWeight={desiredWeight}
        error={error}
        plates={plates}
        setDesiredWeight={setDesiredWeight}
        setMessage={setMessage}
        setError={setError}
        setRenderedPlates={setRenderedPlates}
      />
    </main>
  );
};

export default CalculatorPage;
