import { Plate } from "../types/types";

const calculateTotalWeight = (plates: Plate[]): number => {
  if (!plates || plates.length === 0) {
    return 0;
  }
  let totalWeight = 0;
  for (const plate of plates) {
    totalWeight += plate.weight;
  }
  return totalWeight * 2;
};

export default calculateTotalWeight;
