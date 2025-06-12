import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../context/SettingsContext";
import { Language, MassUnit, Theme } from "../../types/types";
import SettingsItem from "./SettingsItem";

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const {
    // decimalSymbol,
    language,
    massUnit,
    theme,
    // setDecimalSymbol,
    setLanguage,
    setMassUnit,
    setTheme,
  } = useSettingsStore();

  const settings = {
    // decimalSymbol: {
    //   label: t("decimalSymbol"),
    //   options: [
    //     { value: ".", label: "." },
    //     { value: ",", label: "," },
    //   ],
    // },
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
        { value: "es", label: t("spanish") },
        { value: "en", label: t("english") },
      ],
    },
    theme: {
      label: t("theme"),
      options: [
        { value: "light", label: t("light") },
        { value: "dark", label: t("dark") },
      ],
    },
  };

  const stateValues: Record<keyof typeof settings, string> = {
    // decimalSymbol,
    massUnit,
    language,
    theme,
  };

  const handleChange = (id: keyof typeof settings, value: string) => {
    // if (id === "decimalSymbol") setDecimalSymbol(value as DecimalSymbol);
    if (id === "massUnit") setMassUnit(value as MassUnit);
    if (id === "language") {
      setLanguage(value as Language);
      i18n.changeLanguage(value.toLowerCase());
    }
    if (id === "theme") {
      setTheme(value as Theme);
    }
  };

  return (
    <ul className="mt-4 flex flex-col items-stretch">
      <hr className="border-0 border-b border-b-gray-400" />
      {Object.entries(settings).map(([id, { label, options }]) => (
        <SettingsItem
          key={id}
          id={id}
          label={label}
          options={options}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleChange(id as keyof typeof settings, e.target.value)
          }
          value={stateValues[id as keyof typeof settings]}
        />
      ))}
    </ul>
  );
};

export default Settings;
