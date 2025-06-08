import { useTranslation } from "react-i18next";
import { useInventoryStore } from "../../context/InventoryContext";
import PlateInventoryItem from "./PlateInventoryItem";
import { useState } from "react";
import { Plate } from "../../types/types";
import PlateForm from "./PlateForm";

const PlatesInventory: React.FC = () => {
  const { t } = useTranslation();
  const { plates } = useInventoryStore();
  const [create, setCreate] = useState<boolean>(false);
  const [selectedPlate, setSelectedPlate] = useState<Plate | null>(null);
  return (
    <section className="flex flex-col gap-2 px-1">
      <button
        className="mt-4 mb-2 cursor-pointer rounded-full bg-violet-800 p-3 text-white hover:bg-violet-800/85"
        onClick={() => {
          setCreate(true);
          setSelectedPlate({
            id: "",
            weight: 0,
            color: "bg-gray-500",
            availableAmount: 2,
          });
        }}
        type="button"
      >
        <span>{t("addNewPlate")}</span>
      </button>
      <hr className="border-0 border-b border-b-gray-500" />

      {plates.length === 0 ? (
        <p className="mt-2 text-center text-sm text-gray-400">
          {t("noPlatesInInventory")}
        </p>
      ) : (
        <ul className="grid grid-cols-3 gap-2 p-2">
          {plates.map((plate) => (
            <PlateInventoryItem
              key={plate.id}
              plate={plate}
              setSelectedPlate={setSelectedPlate}
            />
          ))}
        </ul>
      )}

      {selectedPlate === null ? (
        <></>
      ) : (
        <PlateForm
          create={create}
          setCreate={setCreate}
          selectedPlate={selectedPlate}
          setSelectedPlate={setSelectedPlate}
        />
      )}
    </section>
  );
};

export default PlatesInventory;
