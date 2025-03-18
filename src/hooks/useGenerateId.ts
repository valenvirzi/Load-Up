const useGenerateId = (type: "plate" | string, weight: number) => {
  if (type === "plate") {
    return `${type},${weight}`.toLowerCase();
  } else {
    return `barbell,${type},${weight}`.toLowerCase();
  }
};

export default useGenerateId;
