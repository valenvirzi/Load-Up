export interface Link {
  title: string;
  src: string;
  srcActive: string;
}

export type DecimalSymbol = "." | ",";
export type MassUnit = "Kg" | "Lb";
export type Language = "English" | "Español";

export type SettingsState = {
  decimalSymbol: DecimalSymbol;
  massUnit: MassUnit;
  language: Language;
  setDecimalSymbol: (symbol: DecimalSymbol) => void;
  setMassUnit: (unit: MassUnit) => void;
  setLanguage: (language: Language) => void;
};

export type Option = { value: string; label: string };

export interface SettingsItemProps {
  label: string;
  id: string;
  options: Option[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
