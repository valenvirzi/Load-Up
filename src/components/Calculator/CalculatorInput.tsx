import sendArrow from "../../assets/send-arrow.svg";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../context/SettingsContext";
import calculateLoadedBarbell from "../../utils/calculateLoadedBarbell";
import { Barbell, Plate } from "../../types/types";
import { useRef } from "react";

interface CalculatorInputProps {
  error: string | null;
  desiredWeight: string;
  setDesiredWeight: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setRenderedPlates: React.Dispatch<React.SetStateAction<Plate[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  barbellDisplayed: Barbell;
  plates: Plate[];
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({
  error,
  desiredWeight,
  setDesiredWeight,
  setMessage,
  setRenderedPlates,
  setError,
  barbellDisplayed,
  plates,
}) => {
  const { t } = useTranslation();
  const { massUnit } = useSettingsStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty values, but avoid zeros to the left
    if (value === "" || /^(0|[1-9]\d*)(\.\d{0,2})?$/.test(value)) {
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
    setMessage("");
    if (Number(desiredWeight) < barbellDisplayed.weight) {
      setError("weightGreaterThanBarbell");
      return;
    }
    const { platesToRender, message } = calculateLoadedBarbell(
      Number(desiredWeight),
      barbellDisplayed.weight,
      plates,
    );
    setRenderedPlates(platesToRender);
    setMessage(message);
  };

  return (
    <section
      className={`relative top-2 flex w-full flex-col items-stretch gap-1 px-2`}
    >
      <label className="text-sm" htmlFor="desiredWeight">
        {t("enterDesiredWeight")} ({massUnit}):
      </label>
      <div className="flex items-stretch">
        <input
          className="w-full cursor-pointer rounded-l bg-gray-100 p-2 px-3 dark:bg-zinc-700"
          placeholder={t("enterDesiredWeight")}
          type="text"
          inputMode="decimal"
          pattern="/^(0|[1-9]\d*)(\.\d{0,2})?$/"
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
          <img className="w-6" src={sendArrow} alt="Submit" />
        </button>
      </div>
      {error ? (
        <p className="absolute -bottom-6 left-2 text-sm text-red-700">
          {t(error)}
        </p>
      ) : (
        <></>
      )}
    </section>
  );
};

export default CalculatorInput;
