import { useSettingsStore } from "../context/SettingsContext";
import { DecimalSymbol, Language, MassUnit } from "../types/types";
import SettingsItem from "./SettingsItem";

const settings = {
  decimalSymbol: {
    label: "Decimal symbol",
    options: [
      { value: ".", label: "." },
      { value: ",", label: "," },
    ],
  },
  massUnit: {
    label: "Mass unit of measure",
    options: [
      { value: "kg", label: "Kg" },
      { value: "lb", label: "Lb" },
    ],
  },
  language: {
    label: "Language",
    options: [
      { value: "English", label: "English" },
      { value: "Spanish", label: "Español" },
    ],
  },
};

const Settings: React.FC = () => {
  const {
    decimalSymbol,
    language,
    massUnit,
    setDecimalSymbol,
    setLanguage,
    setMassUnit,
  } = useSettingsStore();

  const stateValues: Record<keyof typeof settings, string> = {
    decimalSymbol,
    massUnit,
    language,
  };

  const handleChange = (id: keyof typeof settings, value: string) => {
    if (id === "decimalSymbol") setDecimalSymbol(value as DecimalSymbol);
    if (id === "massUnit") setMassUnit(value as MassUnit);
    if (id === "language") setLanguage(value as Language);
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
