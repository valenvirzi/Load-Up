import { Barbell, Plate } from "../../types/types";

interface LoadedBarbellProps {
  barbellDisplayed: Barbell;
  renderedPlates: Plate[];
  setRenderedPlates: React.Dispatch<React.SetStateAction<Plate[]>>;
}

const LoadedBarbell: React.FC<LoadedBarbellProps> = ({
  barbellDisplayed,
  renderedPlates,
  setRenderedPlates,
}) => {
  return (
    <section className="flex h-44 overflow-x-auto overflow-y-hidden px-1 pt-2">
      <div
        className={`relative mt-16 flex h-6 w-full min-w-60 items-center gap-1 rounded-sm ${barbellDisplayed.color} text-white`}
      >
        <div
          className={`flex items-center justify-center rounded-sm ${barbellDisplayed.color} p-3`}
        >
          <span className="font-medium">{barbellDisplayed.weight}</span>
        </div>
        {renderedPlates.map((plate) => {
          return (
            <button
              key={plate.id}
              onClick={() => {
                setRenderedPlates((prevPlates) =>
                  prevPlates.filter((p) => p.id !== plate.id),
                );
              }}
              className={`plate z-10 flex h-32 w-9 min-w-9 cursor-pointer items-center justify-center rounded-sm ${plate.color} p-2 md:p-4`}
            >
              <span className="plateWeight font-semibold">{plate.weight}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default LoadedBarbell;
