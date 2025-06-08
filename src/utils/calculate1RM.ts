const calculate1RM = (weight: number, reps: number): number => {
  if (weight <= 0 || reps <= 0) {
    return 0;
  }

  const epleyMethod1RM: number = weight * (1 + reps / 30);
  const brzyckiMethod1RM: number = weight / (1.0278 - 0.0278 * reps);
  const landerMethod1RM: number = (weight * 100) / (101.3 - 2.67123 * reps);

  const average1RM: number =
    (epleyMethod1RM + brzyckiMethod1RM + landerMethod1RM) / 3;

  return Number(average1RM.toFixed(2));
};

export default calculate1RM;
