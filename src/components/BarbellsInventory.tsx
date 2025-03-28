import { useTranslation } from "react-i18next";
import { useInventoryStore } from "../context/InventoryContext";
import { useState } from "react";
import { Barbell } from "../types/types";
import BarbellForm from "./BarbellForm";
import { useSettingsStore } from "../context/SettingsContext";

// const BARBELLS_IMG = [
//   "./roman-barbell-half.png",
//   "./ez-curl-barbell-half.png",
//   "./straight-barbell-half.png",
//   "./swiss-barbell-half.png",
//   "./trap-barbell-half.png",
//   "./w-curl-barbell-half.png",
// ];

const BarbellsInventory: React.FC = () => {
  const { t } = useTranslation();
  const { massUnit } = useSettingsStore();
  const { barbells } = useInventoryStore();
  const [create, setCreate] = useState<boolean>(false);
  const [selectedBarbell, setSelectedBarbell] = useState<Barbell | null>(null);
  return (
    <section className="flex flex-col gap-2 px-1">
      <button
        className="mt-4 cursor-pointer rounded-full bg-violet-800 p-3 text-white"
        onClick={() => {
          setCreate(true);
          setSelectedBarbell({
            id: "",
            weight: 0,
            color: "bg-zinc-700",
            type: "Standard",
          });
        }}
        type="button"
      >
        <span>{t("addNewBarbell")}</span>
      </button>
      <ul>
        {barbells.map((barbell) => (
          <li key={barbell.id}>
            <span>20{massUnit}</span>
            <hr className="mx-auto w-2/3 border-b border-gray-400/25" />
          </li>
        ))}
        {/* {BARBELLS_IMG.map((barbell) => (
          <li key={barbell}>
            <img src={barbell} alt="Barbell" />
            <span>20{massUnit}</span>
            <hr className="mx-auto w-2/3 border-b border-gray-400/25" />
          </li>
        ))} */}
      </ul>

      {selectedBarbell === null ? (
        <></>
      ) : (
        <BarbellForm
          create={create}
          setCreate={setCreate}
          selectedBarbell={selectedBarbell}
          setSelectedBarbell={setSelectedBarbell}
        />
      )}
    </section>
  );
};

export default BarbellsInventory;
