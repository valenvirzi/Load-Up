import { useTranslation } from "react-i18next";
import { Plate } from "../types/types";
import { useSettingsStore } from "../context/SettingsContext";

interface PlateInventoryItemProps {
  plate: Plate;
}

const PlateInventoryItem: React.FC<PlateInventoryItemProps> = ({ plate }) => {
  const { t } = useTranslation();
  const { massUnit } = useSettingsStore();
  return (
    <li
      className={`${plate.color} flex aspect-square flex-col items-center justify-center gap-2 rounded-full p-1`}
    >
      <span className="text-xl">
        {plate.weight}
        {massUnit}
      </span>
      <div className="flex items-center justify-center">
        <span>
          {plate.availableAmount} {t("units")}
        </span>
      </div>
    </li>
  );
};

export default PlateInventoryItem;
