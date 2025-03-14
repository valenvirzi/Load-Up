const useGenerateId = (
  type: "plate" | string,
  weight: number,
  color: string,
) => {
  if (type === "plate") {
    return `${type},${weight},${color}`.toLowerCase();
  } else {
    return `barbell,${type},${weight},${color}`.toLowerCase();
  }
};

export default useGenerateId;
