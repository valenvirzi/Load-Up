// TODO: Design this page
import { useState } from "react";
import { useTranslation } from "react-i18next";
import InventoryComponentSelector from "../components/InventoryComponentSelector";
import { InventoryComponent } from "../types/types";
import PlatesInventory from "../components/PlatesInventory";
import BarbellsInventory from "../components/BarbellsInventory";

const inventoryComponents = {
  [InventoryComponent.Plates]: <PlatesInventory />,
  [InventoryComponent.Barbells]: <BarbellsInventory />,
};

const InventoryPage: React.FC = () => {
  const { t } = useTranslation();
  const [inventoryDisplayed, setInventoryDisplayed] =
    useState<InventoryComponent>(InventoryComponent.Plates);
  return (
    <main className="flex flex-col items-stretch p-2">
      <div className="p-2">
        <h2 className="text-3xl">{t("inventory")}</h2>
      </div>
      <InventoryComponentSelector
        inventoryDisplayed={inventoryDisplayed}
        setInventoryDisplayed={setInventoryDisplayed}
      />
      <div>{inventoryComponents[inventoryDisplayed]}</div>
    </main>
  );
};

export default InventoryPage;
