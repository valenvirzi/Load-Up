import { useState } from "react";
import { Plate } from "../types/types";
import { useTranslation } from "react-i18next";
import { useInventoryStore } from "../context/InventoryContext";

interface PlateFormProps {
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
  selectedPlate,
  setSelectedPlate,
}) => {
  const { t } = useTranslation();
  const { updatePlate } = useInventoryStore();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Plate>({
    id: selectedPlate.id,
    weight: selectedPlate.weight,
    color: selectedPlate.color,
    availableAmount: selectedPlate.availableAmount,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleColorChange = (color: string) => {
    setFormData((prev) => ({ ...prev, color }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      updatePlate(selectedPlate.id, formData);
      setSelectedPlate(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center bg-black/25">
      <form
        className="absolute top-1/12 flex w-10/12 flex-col gap-2 rounded bg-white px-3 py-2 text-black"
        name="plateForm"
        id="plateForm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl">Edit Plate</h2>
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <label htmlFor="weight">{t("weight")}</label>
            <input
              type="number"
              name="weight"
              id="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3>{t("color")}</h3>
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
          <div className="flex flex-col gap-1">
            <label htmlFor="availableAmount">{t("availableAmount")}</label>
            <input
              type="number"
              name="availableAmount"
              id="availableAmount"
              value={formData.availableAmount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="cursor-pointer rounded-full px-6 py-3 text-violet-800"
            type="button"
            onClick={() => setSelectedPlate(null)}
          >
            {t("cancel")}
          </button>
          <button
            className="cursor-pointer rounded-full bg-violet-800 px-6 py-3 text-white"
            type="submit"
            form="plateForm"
          >
            {t("update")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlateForm;
