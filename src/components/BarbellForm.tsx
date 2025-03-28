import { useState } from "react";
import { Barbell } from "../types/types";
import { useTranslation } from "react-i18next";
import { useInventoryStore } from "../context/InventoryContext";
import { useSettingsStore } from "../context/SettingsContext";

interface BarbellFormProps {
  create: boolean;
  setCreate: (boolean: boolean) => void;
  selectedBarbell: Barbell;
  setSelectedBarbell: (barbell: Barbell | null) => void;
}

const BARBELL_TYPES = [
  "Standard",
  "Olympic",
  "Straight Curl",
  "Trap",
  "EZ Curl",
  "Swiss",
  "Roman",
  "W Curl",
];

const BARBELL_COLORS = [
  "bg-zinc-700",
  "bg-yellow-800",
  "bg-emerald-800",
  "bg-blue-800",
  "bg-red-800",
];

const BarbellForm: React.FC<BarbellFormProps> = ({
  create,
  setCreate,
  selectedBarbell,
  setSelectedBarbell,
}) => {
  const { t } = useTranslation();
  const { massUnit } = useSettingsStore();
  const { updateBarbell, createBarbell, deleteBarbell } = useInventoryStore();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Barbell>({
    id: selectedBarbell.id,
    weight: selectedBarbell.weight,
    color: selectedBarbell.color,
    type: selectedBarbell.type,
  });

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      type: e.target.value as Barbell["type"],
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Allow empty values, but avoid zeros to the left
    if (value === "" || /^(0|[1-9]\d*)(\.\d*)?$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // If input empty when no longer focused, then value = 0
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : Number(value),
    }));
  };

  const handleColorChange = (color: string) => {
    setFormData((prev) => ({ ...prev, color }));
  };

  const handleCancel = () => {
    setSelectedBarbell(null);
    if (create) {
      setCreate(false);
    }
  };

  const handleDelete = () => {
    if (confirm(t("confirmDelete"))) {
      deleteBarbell(selectedBarbell.id);
      setSelectedBarbell(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    const weight = Number(formData.weight);
    const type = formData.type;

    // Validation
    if (isNaN(weight) || weight <= 0) {
      setError("weightAboveZero");
      return;
    }
    if (!BARBELL_COLORS.includes(formData.color)) {
      setError("colorNotValid");
      return;
    }

    if (create) {
      try {
        createBarbell({ ...formData, weight, type });
        setSelectedBarbell(null);
        setCreate(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    } else {
      try {
        updateBarbell(selectedBarbell.id, { ...formData, weight, type });
        setSelectedBarbell(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center bg-black/30">
      <form
        className="absolute top-1/12 flex w-10/12 flex-col gap-4 rounded bg-white p-3 text-black dark:bg-stone-900 dark:text-white"
        name="barbellForm"
        id="barbellForm"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">
            {create ? t("createBarbell") : t("editBarbell")}
          </h2>
          {create ? (
            <></>
          ) : (
            <button
              className="flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-red-600/10"
              onClick={handleDelete}
              type="button"
            >
              <img className="w-6" src="./delete.svg" alt="Delete" />
            </button>
          )}
        </div>
        {error && <p className="text-red-500">{t(error)}</p>}

        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start gap-1">
            <label className="text-lg" htmlFor="weight">
              {t("weight")}
            </label>
            <div className="flex items-center gap-1">
              <input
                className="w-1/2 rounded bg-gray-100 p-2 dark:bg-zinc-700"
                type="number"
                name="weight"
                min={0}
                step={0.05}
                id="weight"
                value={formData.weight}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <span className="text-black/65 dark:text-white/65">
                {massUnit}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg">{t("color")}</h3>
            <ul className="flex items-center gap-2">
              {BARBELL_COLORS.map((color) => (
                <li key={color}>
                  <button
                    className={`h-10 w-10 cursor-pointer rounded-full border-4 ${
                      formData.color === color
                        ? "border-violet-800"
                        : "border-transparent"
                    } ${color}`}
                    type="button"
                    onClick={() => handleColorChange(color)}
                  ></button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-1">
            <label className="text-lg" htmlFor="type">
              {t("type")}
            </label>
            <div className="flex items-center gap-1">
              <select
                className="cursor-pointer rounded border-none bg-gray-100 p-2 dark:bg-zinc-700"
                name="type"
                id="type"
                onChange={handleTypeChange}
                value={formData.type}
              >
                {BARBELL_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="cursor-pointer rounded-full px-6 py-3 text-violet-800 dark:text-white"
            type="button"
            onClick={handleCancel}
          >
            {t("cancel")}
          </button>
          <button
            className="cursor-pointer rounded-full bg-violet-800 px-6 py-3 text-white"
            type="submit"
            form="barbellForm"
          >
            {create ? t("add") : t("update")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BarbellForm;
