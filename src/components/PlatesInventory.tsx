import { useTranslation } from "react-i18next";
import { useInventoryStore } from "../context/InventoryContext";
import PlateInventoryItem from "./PlateInventoryItem";
import { useState } from "react";
import { Plate } from "../types/types";
import PlateForm from "./PlateForm";

const PlatesInventory: React.FC = () => {
  const { t } = useTranslation();
  const { plates } = useInventoryStore();
  const [selectedPlate, setSelectedPlate] = useState<Plate | null>(null);
  return (
    <section className="flex flex-col">
      <ul className="grid grid-cols-3 gap-2 p-2">
        {plates.map((plate) => (
          <PlateInventoryItem
            key={plate.id}
            plate={plate}
            setSelectedPlate={setSelectedPlate}
          />
        ))}
      </ul>
      <button className="rounded-full bg-violet-800 p-3" type="button">
        <span>{t("createNewPlate")}</span>
      </button>
      {selectedPlate === null ? (
        <></>
      ) : (
        <PlateForm
          selectedPlate={selectedPlate}
          setSelectedPlate={setSelectedPlate}
        />
      )}
    </section>
  );
};

export default PlatesInventory;
