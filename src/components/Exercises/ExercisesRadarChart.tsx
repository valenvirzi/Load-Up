import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Text,
} from "recharts";
import { useExercisesStore } from "../../context/ExercisesContext";
import React from "react";

interface ExercisesRadarChartProps {
  chart: "1RM" | "Volume";
}

// Props for the custom tick component (for PolarRadiusAxis)
interface CustomRadiusTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: number | string;
    coordinate: number;
    index: number;
  };
  textAnchor?: "end" | "middle" | "start" | "inherit" | undefined;
  fill?: string;
  fontSize?: number;
}

// Custom tick component for PolarRadiusAxis to offset numerical labels
const CustomRadiusTick: React.FC<CustomRadiusTickProps> = ({
  x,
  y,
  payload,
  textAnchor,
  fill,
  fontSize,
}) => {
  if (!payload || x === undefined || y === undefined) return null;

  const offset = 8;
  const adjustedY = y - offset;

  return (
    <Text
      x={x}
      y={adjustedY}
      textAnchor={textAnchor || "middle"}
      fill={fill}
      fontSize={fontSize}
      dominantBaseline="middle"
    >
      {payload.value}
    </Text>
  );
};

const ExercisesRadarChart: React.FC<ExercisesRadarChartProps> = ({
  chart = "1RM",
}) => {
  const { exercises } = useExercisesStore();
  const latestWorkoutList = exercises.map((exercise) => {
    return {
      name: exercise.name,
      latestWorkout1RM: exercise.average1RM,
      latestWorkoutVolume: exercise.workoutVolume,
      latestWorkoutDate: exercise.latestWorkoutDate,
    };
  });

  // Format the tick labels (exercise names) on PolarAngleAxis
  const formatExerciseName = (value: string) => {
    const maxLength = 15;
    if (value.length > maxLength) {
      return `${value.substring(0, maxLength)}...`;
    }
    return value;
  };

  return (
    <div className="flex h-60 w-full min-w-3xs items-center justify-center xl:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="85%"
          data={latestWorkoutList}
          margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
        >
          <PolarGrid stroke="#757575" />
          <PolarAngleAxis
            dataKey="name"
            tickFormatter={formatExerciseName} // Formatter for name truncation
            tick={{
              fill: "#6b7280",
              fontSize: 12,
              fontWeight: 500,
            }}
            baselineShift={10}
          />
          <PolarRadiusAxis
            tick={<CustomRadiusTick fill="#757575" />}
            axisLine={{ stroke: "#757575" }}
            angle={90}
            tickFormatter={(value) => value.toString()}
          />
          <Radar
            name={chart === "1RM" ? "1RM" : "workoutVolume"}
            dataKey={
              chart === "1RM" ? "latestWorkout1RM" : "latestWorkoutVolume"
            }
            stroke={chart === "1RM" ? "#5d0ec0" : "#3dd476"}
            fill={chart === "1RM" ? "#5d0ec0" : "#3dd476"}
            fillOpacity={0.5}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExercisesRadarChart;
