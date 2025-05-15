import { Plate } from "../types/types";

const calculateLoadedBarbell = (
  inputWeight: number,
  barbellWeight: number,
  plates: Plate[],
) => {
  const eachSidePlates = plates.map((plate) => {
    if (plate.availableAmount % 2 === 0) {
      const newPlate = { ...plate, availableAmount: plate.availableAmount / 2 };
      return newPlate;
    } else {
      const newPlate = {
        ...plate,
        availableAmount: (plate.availableAmount - 1) / 2,
      };
      return newPlate;
    }
  });
  const platesToRender: Plate[] = [];
  let weightToCalculate = (inputWeight - barbellWeight) / 2;
  let startIndex = 0; // Keep track of the starting index for the inner loop

  while (weightToCalculate > 0) {
    let foundPlateInIteration = false;
    for (let i = startIndex; i < eachSidePlates.length; i++) {
      const plate = eachSidePlates[i];
      if (plate.weight <= weightToCalculate && plate.availableAmount > 0) {
        // Generates a unique ID
        const uniquePlate = {
          ...plate,
          id: `${plate.id}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // Combine original ID with timestamp and random string
          availableAmount: 1,
        };
        platesToRender.push(uniquePlate);
        weightToCalculate -= plate.weight;
        eachSidePlates[i].availableAmount--;
        startIndex = i; // Start the next iteration from the current plate
        foundPlateInIteration = true;
        break;
      }
      // If we reach the end of the sorted plates, reset startIndex to 0 for the next iteration
      if (i === eachSidePlates.length - 1 && !foundPlateInIteration) {
        startIndex = 0;
      }
    }

    if (!foundPlateInIteration && weightToCalculate > 0) {
      break;
    }
  }

  return platesToRender;
};

export default calculateLoadedBarbell;
