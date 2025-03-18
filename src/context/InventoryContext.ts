import { create } from "zustand";
import { persist } from "zustand/middleware";
import useGenerateId from "../hooks/useGenerateId";
import { Barbell, InventoryStore, Plate } from "../types/types";

export const useInventoryStore = create(
  persist<InventoryStore>(
    (set) => ({
      plates: [
        {
          id: "plate,20,bg-gray-500",
          weight: 20,
          color: "bg-gray-500",
          availableAmount: 8,
        },
        {
          id: "plate,15,bg-gray-500",
          weight: 15,
          color: "bg-gray-500",
          availableAmount: 8,
        },
        {
          id: "plate,10,bg-gray-500",
          weight: 10,
          color: "bg-gray-500",
          availableAmount: 8,
        },
        {
          id: "plate,5,bg-gray-500",
          weight: 5,
          color: "bg-gray-500",
          availableAmount: 8,
        },
        {
          id: "plate,2.5,bg-gray-500",
          weight: 2.5,
          color: "bg-gray-500",
          availableAmount: 8,
        },
        {
          id: "plate,1.25,bg-gray-500",
          weight: 1.25,
          color: "bg-gray-500",
          availableAmount: 8,
        },
      ],
      barbells: [
        {
          id: "barbell,standard,1.25,bg-zinc-700",
          weight: 20,
          color: "bg-zinc-700",
          type: "Standard",
        },
      ],

      createPlate: (newPlate: Omit<Plate, "id">) =>
        set((state) => {
          const id = useGenerateId("plate", newPlate.weight, newPlate.color);
          if (state.plates.some((p) => p.id === id)) return state;
          return { plates: [...state.plates, { ...newPlate, id }] };
        }),

      removePlate: (id: string) =>
        set((state) => ({
          plates: state.plates.filter((p) => p.id !== id),
        })),

      updatePlate: (previousId: string, updatedPlate: Plate) =>
        set((state) => {
          const plateIndex = state.plates.findIndex((p) => p.id === previousId);
          if (plateIndex === -1) return state;
          // The plate you are trying to update doesn't exist.

          const oldPlate = state.plates[plateIndex];
          const newPlate = { ...oldPlate, ...updatedPlate };

          const shouldIdChange =
            oldPlate.color !== newPlate.color ||
            oldPlate.weight !== newPlate.weight;

          // If neither the plate color nor the plate weight changes (aka just the availableAmount changes / everything stays the same), update the plate without changing the ID. Otherwise, generate a new ID.
          if (!shouldIdChange) {
            const updatedPlates = [...state.plates];
            updatedPlates[plateIndex] = { ...newPlate };

            return { plates: updatedPlates };
          }

          const newId = useGenerateId("plate", newPlate.weight, newPlate.color);
          if (
            newId !== previousId &&
            state.plates.some((p) => p.id === newId)
          ) {
            return state;
            // A plate with this characteristics already exists.
          }

          const updatedPlates = [...state.plates];
          updatedPlates[plateIndex] = { ...newPlate, id: newId };

          return { plates: updatedPlates };
        }),

      createBarbell: (newBarbell: Omit<Barbell, "id">) =>
        set((state) => {
          const id = useGenerateId(
            newBarbell.type,
            newBarbell.weight,
            newBarbell.color,
          );
          if (state.barbells.some((b) => b.id === id)) return state;
          return { barbells: [...state.barbells, { ...newBarbell, id }] };
        }),

      removeBarbell: (id: string) =>
        set((state) => ({
          barbells: state.barbells.filter((b) => b.id !== id),
        })),

      updateBarbell: (previousId: string, updatedBarbell: Barbell) =>
        set((state) => {
          const barbellIndex = state.barbells.findIndex(
            (b) => b.id === previousId,
          );
          if (barbellIndex === -1) return state;
          // The barbell you are trying to update doesn't exist.

          const oldBarbell = state.barbells[barbellIndex];
          const newBarbell = { ...oldBarbell, ...updatedBarbell };

          const newId = useGenerateId(
            newBarbell.type,
            newBarbell.weight,
            newBarbell.color,
          );
          if (newId === previousId) {
            return state;
            // None of the barbell characteristics have changed.
          }
          if (
            newId !== previousId &&
            state.barbells.some((b) => b.id === newId)
          ) {
            return state;
            // A barbell with this characteristics already exists.
          }

          const updatedBarbells = [...state.barbells];
          updatedBarbells[barbellIndex] = { ...newBarbell, id: newId };

          return { barbells: updatedBarbells };
        }),
    }),
    { name: "LoadUpInventory" },
  ),
);
