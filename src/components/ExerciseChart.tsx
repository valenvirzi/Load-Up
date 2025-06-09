/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ExerciseRecord } from "../context/ExercisesContext";
import sortExerciseHistory from "../utils/sortExerciseHistory";
import workoutDateToText from "../utils/workoutDateToText";
import { useTranslation } from "react-i18next";

interface ExerciseChartProps {
  history: ExerciseRecord[];
}

type ChartDataRecord = {
  date: string;
  average1RM: number;
  workoutVolume: number;
};

const CustomChartLegend = ({ payload }: any) => {
  const { t } = useTranslation();
  return (
    <ul className="flex flex-wrap justify-center gap-x-4 p-2 text-sm">
      {payload.map((entry: any, index: number) => (
        <li
          key={`legend-item-${index}`}
          className="flex items-center space-x-1"
        >
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className="text-gray-700 dark:text-gray-300">
            {/* If attribute name === "average1RM" then set Legend to "1RM", else translate it to the chosen language (with i18 library) */}
            {entry.value === "average1RM" ? "1RM" : t(entry.value)}
          </span>
        </li>
      ))}
    </ul>
  );
};

const ExerciseChart: React.FC<ExerciseChartProps> = ({ history }) => {
  const { t } = useTranslation();
  const sortedHistory = sortExerciseHistory(history, "asc");

  const data: ChartDataRecord[] = sortedHistory.map(
    (record: ExerciseRecord) => {
      return {
        date: workoutDateToText(record.date, false), // false to not include hours and minutes
        average1RM: record.average1RM,
        workoutVolume: record.workoutVolume,
      };
    },
  );

  // Dynamic width depending on the amount of elements on the array, with a minimum of 300px
  const chartContentWidth = Math.max(300, data.length * 80);

  // Payload for the CustomChartLegend.
  // 'value' should be = to 'dataKey' of Line components,
  // 'color' should be = to 'stroke' properties of components.
  const legendPayload = [
    { value: "average1RM", type: "line", color: "#6f35b8" },
    { value: "workoutVolume", type: "line", color: "#3dd476" },
  ];

  // Conditional rendering: Show message if data is not enough (less than 2 records), otherwise render chart
  if (data.length < 2) {
    return (
      <div className="flex h-80 w-full items-center justify-center rounded-lg bg-white p-2 text-center text-gray-500 shadow-lg dark:bg-zinc-900 dark:text-gray-400">
        <p>{t("needMoreData")}</p>
      </div>
    );
  }

  return (
    <div className="flex h-80 w-full flex-col overflow-hidden rounded-lg bg-gray-50 p-2 shadow-lg dark:bg-zinc-900">
      <CustomChartLegend payload={legendPayload} />

      {/* div for horizontal scrolling, flex-grow to take up available vertical space. */}
      <div className="flex-grow overflow-x-auto overflow-y-hidden border-t border-b border-gray-200 pt-2 dark:border-zinc-700">
        <LineChart
          width={chartContentWidth} // Dynamic width
          height={250} // Fixed height
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          {/* Grid lines for the chart background */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e0e0e0"
            className="dark:stroke-zinc-700"
          />

          <XAxis
            dataKey="date" // Data key for the labels
            tick={{ fill: "#757575", fontSize: 12, fontWeight: 700 }}
            interval="preserveStartEnd" // Prevents labels from overlapping
            angle={-30} // Angle the labels for better readability
            textAnchor="end"
            height={60} // Vertical space for labels
            stroke="#757575" // Line color
            className="dark:stroke-gray-200 dark:text-gray-200" // Dark mode styling
          />

          {/* Left Y-Axis for average1RM */}
          <YAxis
            domain={["dataMin - 2", "dataMax + 2"]} // Small "padding" top and bottom
            yAxisId="left" // ID for the axis
            stroke="#6f35b8" // Line color matching the 1RM line
            tick={{ fill: "#6f35b8", fontSize: 12, fontWeight: 700 }}
          />

          {/* Right Y-Axis for workoutVolume */}
          <YAxis
            domain={["dataMin - 40", "dataMax + 40"]} // Small "padding" top and bottom
            yAxisId="right" // ID for the axis
            orientation="right" // Place on the right side
            stroke="#3dd476" // Line color matching the workoutVolume line
            tick={{ fill: "#3dd476", fontSize: 12, fontWeight: 700 }}
          />

          {/* Tooltip for displaying data on hover */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#333" }}
            itemStyle={{ color: "#555" }}
          />

          {/* Line for average1RM data */}
          <Line
            yAxisId="left" // Relate to the left Y-axis
            type="monotone" // "monotone" = Smooth curve
            dataKey="average1RM"
            name="1RM" // Tooltip name
            strokeWidth={2}
            stroke="#6f35b8" // Line color
            activeDot={{ r: 6 }} // Larger dot on hover
          />

          {/* Line for workoutVolume data */}
          <Line
            yAxisId="right" // Relate to the right Y-axis
            type="monotone"
            dataKey="workoutVolume"
            name={t("workoutVolume")}
            strokeWidth={2}
            stroke="#3dd476"
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default ExerciseChart;
