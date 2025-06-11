import { useTranslation } from "react-i18next";
import { Barbell } from "../../types/types";
import { useSettingsStore } from "../../context/SettingsContext";

interface BarbellSelectorProps {
  barbells: Barbell[];
  barbellDisplayed: Barbell;
  setBarbellDisplayed: (barbell: Barbell) => void;
}

const BarbellSelector: React.FC<BarbellSelectorProps> = ({
  barbellDisplayed,
  barbells,
  setBarbellDisplayed,
}) => {
  const { t } = useTranslation();
  const { massUnit } = useSettingsStore();

  if (barbells.length === 0) {
    return (
      <div className="flex flex-col gap-1">
        <p className="text-center text-sm text-gray-400">
          {t("noBarbellsAvailable")}
        </p>
        <p className="text-center text-sm text-gray-400">
          {t("createBarbellToCalculateWeight")}
        </p>
      </div>
    );
  }

  return (
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
              {barbell.type} {`(${barbell.weight}${massUnit})`}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default BarbellSelector;
