import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../context/SettingsContext";

interface CalculatorOutputTextProps {
  totalWeight: number;
  desiredWeight: string;
  message: string;
}

const CalculatorOutputText: React.FC<CalculatorOutputTextProps> = ({
  totalWeight,
  desiredWeight,
  message,
}) => {
  const { t } = useTranslation();
  const { massUnit } = useSettingsStore();
  return (
    <div className="relative self-center px-4 text-xl">
      {message === "" ? (
        <></>
      ) : (
        <p className="mb-2 text-center text-sm text-gray-400">{t(message)}</p>
      )}
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
  );
};

export default CalculatorOutputText;
