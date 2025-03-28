import { useTranslation } from "react-i18next";
import { useInventoryStore } from "../context/InventoryContext";
import { useState } from "react";
import { Barbell } from "../types/types";
import BarbellForm from "./BarbellForm";
import BarbellInventoryItem from "./BarbellInventoryItem";

const BarbellsInventory: React.FC = () => {
  const { t } = useTranslation();
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
          <BarbellInventoryItem
            key={barbell.id}
            barbell={barbell}
            setSelectedBarbell={setSelectedBarbell}
          />
        ))}
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
