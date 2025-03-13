import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../context/SettingsContext";
import { DecimalSymbol, Language, MassUnit } from "../types/types";
import SettingsItem from "./SettingsItem";

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const {
    decimalSymbol,
    language,
    massUnit,
    setDecimalSymbol,
    setLanguage,
    setMassUnit,
  } = useSettingsStore();

  const settings = {
    decimalSymbol: {
      label: t("decimalSymbol"),
      options: [
        { value: ".", label: "." },
        { value: ",", label: "," },
      ],
    },
    massUnit: {
      label: t("massUnit"),
      options: [
        { value: "Kg", label: "Kg" },
        { value: "Lb", label: "Lb" },
      ],
    },
    language: {
      label: t("language"),
      options: [
        { value: "en", label: t("english") },
        { value: "es", label: t("spanish") },
      ],
    },
  };

  const stateValues: Record<keyof typeof settings, string> = {
    decimalSymbol,
    massUnit,
    language,
  };

  const handleChange = (id: keyof typeof settings, value: string) => {
    if (id === "decimalSymbol") setDecimalSymbol(value as DecimalSymbol);
    if (id === "massUnit") setMassUnit(value as MassUnit);
    if (id === "language") {
      setLanguage(value as Language);
      i18n.changeLanguage(value.toLowerCase());
    }
  };

  return (
    <ul className="flex flex-col items-stretch">
      {Object.entries(settings).map(([id, { label, options }]) => (
        <SettingsItem
          key={id}
          id={id}
          label={label}
          options={options}
          onChange={(e) =>
            handleChange(id as keyof typeof settings, e.target.value)
          }
          value={stateValues[id as keyof typeof settings]}
        />
      ))}
    </ul>
  );
};

export default Settings;
