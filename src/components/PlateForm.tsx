import { useState } from "react";
import { Plate } from "../types/types";
import { useTranslation } from "react-i18next";
import { useInventoryStore } from "../context/InventoryContext";
import { useSettingsStore } from "../context/SettingsContext";

interface PlateFormProps {
  create: boolean;
  setCreate: (boolean: boolean) => void;
  selectedPlate: Plate;
  setSelectedPlate: (plate: Plate | null) => void;
}

const PLATE_COLORS = [
  "bg-gray-500",
  "bg-yellow-800",
  "bg-emerald-800",
  "bg-blue-800",
  "bg-red-800",
];

const PlateForm: React.FC<PlateFormProps> = ({
  create,
  setCreate,
  selectedPlate,
  setSelectedPlate,
}) => {
  const { t } = useTranslation();
  const { massUnit } = useSettingsStore();
  const { updatePlate, createPlate, deletePlate } = useInventoryStore();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Plate>({
    id: selectedPlate.id,
    weight: selectedPlate.weight,
    color: selectedPlate.color,
    availableAmount: selectedPlate.availableAmount,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setSelectedPlate(null);
    if (create) {
      setCreate(false);
    }
  };

  const handleDelete = () => {
    if (confirm(t("confirmDelete"))) {
      deletePlate(selectedPlate.id);
      setSelectedPlate(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    const weight = Number(formData.weight);
    const availableAmount = Number(formData.availableAmount);

    // Validation
    if (isNaN(weight) || weight <= 0) {
      setError("weightAboveZero");
      return;
    }
    if (isNaN(availableAmount) || availableAmount < 2) {
      setError("minAmountTwo");
      return;
    }
    if (!PLATE_COLORS.includes(formData.color)) {
      setError("colorNotValid");
      return;
    }

    if (create) {
      try {
        createPlate({ ...formData, weight, availableAmount });
        setSelectedPlate(null);
        setCreate(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    } else {
      try {
        updatePlate(selectedPlate.id, { ...formData, weight, availableAmount });
        setSelectedPlate(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }
  };

  return (
    <div
      onClick={handleCancel}
      className="absolute inset-0 flex flex-col items-center bg-black/30"
    >
      <form
        className="absolute top-1/12 flex w-10/12 flex-col gap-4 rounded bg-white p-3 text-black dark:bg-stone-900 dark:text-white"
        name="plateForm"
        id="plateForm"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">
            {create ? t("createPlate") : t("editPlate")}
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
                onChange={handleChange}
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
              {PLATE_COLORS.map((color) => (
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
            <label className="text-lg" htmlFor="availableAmount">
              {t("availableAmount")}
            </label>
            <div className="flex items-center gap-1">
              <input
                className="w-1/2 rounded bg-gray-100 p-2 dark:bg-zinc-700"
                type="number"
                min={2}
                step={1}
                name="availableAmount"
                id="availableAmount"
                value={formData.availableAmount}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="text-black/65 dark:text-white/65">u.</span>
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
            form="plateForm"
          >
            {create ? t("add") : t("update")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlateForm;
