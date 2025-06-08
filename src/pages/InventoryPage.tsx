import { useState } from "react";
import { useTranslation } from "react-i18next";
import InventoryComponentSelector from "../components/Inventory/InventoryComponentSelector";
import { InventoryComponent } from "../types/types";
import PlatesInventory from "../components/Inventory/PlatesInventory";
import BarbellsInventory from "../components/Inventory/BarbellsInventory";

const InventoryPage: React.FC = () => {
  const { t } = useTranslation();
  const [inventoryDisplayed, setInventoryDisplayed] =
    useState<InventoryComponent>(InventoryComponent.Plates);

  const inventoryComponents = {
    [InventoryComponent.Plates]: <PlatesInventory />,
    [InventoryComponent.Barbells]: <BarbellsInventory />,
  };
  return (
    <main className="flex flex-col items-stretch p-2 px-4">
      <div className="p-2">
        <h2 className="text-3xl">{t("inventory")}</h2>
      </div>
      <InventoryComponentSelector
        inventoryDisplayed={inventoryDisplayed}
        setInventoryDisplayed={setInventoryDisplayed}
      />
      {inventoryComponents[inventoryDisplayed]}
    </main>
  );
};

export default InventoryPage;
