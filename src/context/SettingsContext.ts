import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SettingsState } from "../types/types";

export const useSettingsStore = create(
  persist<SettingsState>(
    (set) => ({
      decimalSymbol: ".",
      massUnit: "Kg",
      language: "English",
      setDecimalSymbol: (symbol) => set({ decimalSymbol: symbol }),
      setMassUnit: (unit) => set({ massUnit: unit }),
      setLanguage: (language) => set({ language: language }),
    }),
    { name: "LoadUpSettings" },
  ),
);
