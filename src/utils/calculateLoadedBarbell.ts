import { Plate } from "../types/types";

// TODO: Show message when available weight isn't enough to reach desired weight
const calculateLoadedBarbell = (
  inputWeight: number,
  barbellWeight: number,
  plates: Plate[],
) => {
  // Determine the smallest plate weight for messaging logic
  const smallestPlateWeight =
    plates.length > 0 ? Math.min(...plates.map((p) => p.weight)) : Infinity; // If no plates, set to Infinity so any remaining weight triggers "weightNotReached"

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

  let message = ""; // Initialize message as empty

  // Determine the message based on the remaining weight to calculate
  if (weightToCalculate > 0) {
    // If there's a remaining weight and it's greater than or equal to the smallest plate,
    // it means we couldn't reach the target weight within a reasonable margin.
    if (weightToCalculate >= smallestPlateWeight) {
      message = "weightNotReached";
    }
    // If 0 < weightToCalculate < smallestPlateWeight, the message remains empty,
    // as the difference is considered negligible (cannot be covered by any single plate).
  }

  // Return the plates to render and the determined message
  return { platesToRender, message };
};

export default calculateLoadedBarbell;
