import { useSettingsStore } from "../context/SettingsContext";
import { Barbell } from "../types/types";

const BARBELLS_IMG: Record<Barbell["type"], string> = {
  Standard: "./straight-barbell-half.png",
  Olympic: "./straight-barbell-half.png",
  "Straight Curl": "./straight-barbell-half.png",
  Trap: "./trap-barbell-half.png",
  "EZ Curl": "./ez-curl-barbell-half.png",
  Swiss: "./swiss-barbell-half.png",
  Roman: "./roman-barbell-half.png",
  "W Curl": "./w-curl-barbell-half.png",
};

interface BarbellInventoryItemProps {
  barbell: Barbell;
  setSelectedBarbell: (barbell: Barbell) => void;
}

const BarbellInventoryItem: React.FC<BarbellInventoryItemProps> = ({
  barbell,
  setSelectedBarbell,
}) => {
  const { massUnit } = useSettingsStore();

  return (
    <li>
      <button
        className="flex cursor-pointer flex-col gap-2"
        type="button"
        onClick={() => setSelectedBarbell(barbell)}
      >
        <img src={BARBELLS_IMG[barbell.type]} alt={`${barbell.type} barbell`} />
        <div className="flex w-full justify-between">
          <h3>{barbell.type}</h3>
          <span>
            {barbell.weight}
            {massUnit}
          </span>
        </div>
      </button>
      <hr className="mx-auto mt-2 w-2/3 border-t-0 border-b border-gray-600" />
    </li>
  );
};

export default BarbellInventoryItem;
