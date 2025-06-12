import { Plate } from "../../types/types";
import { useSettingsStore } from "../../context/SettingsContext";

interface PlateInventoryItemProps {
  plate: Plate;
  setSelectedPlate: (plate: Plate) => void;
}

const PlateInventoryItem: React.FC<PlateInventoryItemProps> = ({
  plate,
  setSelectedPlate,
}) => {
  const { massUnit } = useSettingsStore();

  return (
    <li className="mx-auto aspect-square w-full max-w-36">
      <button
        className={`${plate.color} flex size-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-full p-1 text-white`}
        type="button"
        onClick={() => setSelectedPlate(plate)}
      >
        <span className="text-lg lg:text-xl 2xl:text-2xl">
          {plate.weight}
          {massUnit}
        </span>
        <div className="flex items-center justify-center lg:text-lg 2xl:text-xl">
          <span>{plate.availableAmount}u.</span>
        </div>
      </button>
    </li>
  );
};

export default PlateInventoryItem;
