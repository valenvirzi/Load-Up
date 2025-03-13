// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// type Plate = {
//   id: string;
//   weight: number;
//   color: string;
//   availableAmount: number;
// };

// type Barbell = {
//   id: string;
//   weight: number;
//   color: string;
//   type:
//     | "Olympic"
//     | "Trap"
//     | "Straight Curl"
//     | "EZ Curl"
//     | "Standard"
//     | "Swiss"
//     | "Roman"
//     | "W Curl";
// };

// type InventoryStore = {
//   plates: Plate[];
//   barbells: Barbell[];
// };

// export const useInventoryStore = create(
//   persist<InventoryStore>(
//     (set) => ({
//       plates: [],
//       barbells: [],
//     }),
//     { name: "LoadUpInventory" },
//   ),
// );
