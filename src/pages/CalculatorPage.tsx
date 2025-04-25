// TODO: Design this page

import { useTranslation } from "react-i18next";
import { useInventoryStore } from "../context/InventoryContext";
import { useSettingsStore } from "../context/SettingsContext";
import { useState } from "react";
import { Barbell } from "../types/types";

const CalculatorPage: React.FC = () => {
  const { t } = useTranslation();
  const { massUnit } = useSettingsStore();
  const { barbells } = useInventoryStore();
  const [barbellDisplayed, setBarbellDisplayed] = useState<Barbell>(
    barbells[0],
  );
  return (
    <main className="flex flex-col items-stretch p-2">
      <div className="p-2">
        <h2 className="text-3xl">{t("calculator")}</h2>
      </div>
      {/* TODO: Make the right display for the loading of the barbell and write the logic. */}
      <section className="flex flex-col px-2">
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
        <p>{barbellDisplayed.weight}</p>
      </section>
    </main>
  );
};

export default CalculatorPage;
