import edit from "../../assets/edit.svg";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../context/SettingsContext";
import { Barbell } from "../../types/types";

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
  const { t } = useTranslation();

  return (
    <li className="mx-auto flex max-w-sm flex-col items-stretch md:h-full 2xl:mx-0 2xl:w-full">
      <button
        className="relative flex cursor-pointer flex-col gap-2 md:h-full"
        type="button"
        onClick={() => setSelectedBarbell(barbell)}
      >
        <div
          className={`absolute top-4 right-2 flex h-8 w-8 items-center justify-center rounded-full p-1.5 ${barbell.color}`}
        >
          <img className="" src={edit} alt={t("edit")} />
        </div>
        <img src={BARBELLS_IMG[barbell.type]} alt={`${barbell.type} barbell`} />
        <div className="absolute bottom-0 flex w-full justify-between text-lg">
          <h3 className="">{barbell.type}</h3>
          <span>
            {barbell.weight}
            {massUnit}
          </span>
        </div>
      </button>
      <hr className="mx-auto mt-2 w-full border-t-0 border-b border-gray-400" />
    </li>
  );
};

export default BarbellInventoryItem;
