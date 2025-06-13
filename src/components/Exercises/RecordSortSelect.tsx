import { useTranslation } from "react-i18next";

interface RecordSortSelectProps {
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RecordSortSelect: React.FC<RecordSortSelectProps> = ({
  handleSelectChange,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between">
      <h4>{t("sortElements")}:</h4>
      <select
        onChange={handleSelectChange}
        name="historyOrder"
        id="historyOrder"
        className="cursor-pointer rounded border-none bg-gray-100 p-2 text-sm dark:bg-zinc-700"
      >
        <option value="desc">{t("recentFirst")}</option>
        <option value="asc">{t("oldFirst")}</option>
      </select>
    </div>
  );
};

export default RecordSortSelect;
