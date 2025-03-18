export interface Link {
  title: string;
  url: string;
  src: string;
  srcActive: string;
}

export interface LinkItemProps {
  link: Link;
}

export type DecimalSymbol = "." | ",";
export type MassUnit = "Kg" | "Lb";
export type Language = "English" | "Español";
export type Theme = "dark" | "light";

export type SettingsState = {
  decimalSymbol: DecimalSymbol;
  massUnit: MassUnit;
  language: Language;
  theme: Theme;
  setDecimalSymbol: (symbol: DecimalSymbol) => void;
  setMassUnit: (unit: MassUnit) => void;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
};

export type Option = { value: string; label: string };

export interface SettingsItemProps {
  label: string;
  id: string;
  options: Option[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type Plate = {
  id: string;
  weight: number;
  color: string;
  availableAmount: number;
};

export type Barbell = {
  id: string;
  weight: number;
  color: string;
  type:
    | "Olympic"
    | "Trap"
    | "Straight Curl"
    | "EZ Curl"
    | "Standard"
    | "Swiss"
    | "Roman"
    | "W Curl";
};

export type InventoryStore = {
  plates: Plate[];
  barbells: Barbell[];
  createPlate: (plate: Omit<Plate, "id">) => void;
  removePlate: (id: Plate["id"]) => void;
  updatePlate: (previousId: string, plate: Plate) => void;
  createBarbell: (barbell: Omit<Barbell, "id">) => void;
  removeBarbell: (id: Barbell["id"]) => void;
  updateBarbell: (previousId: string, barbell: Barbell) => void;
};

export enum InventoryComponent {
  Plates = "plates",
  Barbells = "barbells",
}

export interface InventoryComponentSelectorProps {
  inventoryDisplayed: InventoryComponent;
  setInventoryDisplayed: (display: InventoryComponent) => void;
}
