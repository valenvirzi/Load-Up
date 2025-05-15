import { useTranslation } from "react-i18next";
import {
  InventoryComponent,
  InventoryComponentSelectorProps,
} from "../types/types";

const InventoryComponentSelector: React.FC<InventoryComponentSelectorProps> = ({
  inventoryDisplayed,
  setInventoryDisplayed,
}) => {
  const { t } = useTranslation();
  const inventoryDisplays = [
    { label: t("plates"), value: InventoryComponent.Plates },
    { label: t("barbells"), value: InventoryComponent.Barbells },
  ];
  return (
    <ul className="flex justify-evenly border-b border-b-gray-400">
      {inventoryDisplays.map(({ label, value }) => (
        <li className="flex-1" key={value}>
          <button
            type="button"
            onClick={() => setInventoryDisplayed(value)}
            className={`w-full cursor-pointer border-b-4 border-transparent p-2 transition-all duration-300 ease-in-out ${inventoryDisplayed === value ? "border-violet-800" : ""}`}
          >
            <span>{label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default InventoryComponentSelector;
