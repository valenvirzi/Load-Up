import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Text, // Import Text for custom ticks
} from "recharts";
import { useExercisesStore } from "../../context/ExercisesContext";
import React from "react"; // Ensure React is imported for React.FC

interface ExercisesRadarChartProps {
  chart: "1RM" | "Volume";
}

// Define props for the custom tick component (for PolarRadiusAxis)
interface CustomRadiusTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: number | string;
    coordinate: number; // This is the radius value for the tick
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

  const offset = 8; // Pixels to offset the numerical label from the radial line
  const adjustedY = y - offset; // Move label upwards (away from center for angle=90 axis)

  return (
    <Text
      x={x}
      y={adjustedY}
      textAnchor={textAnchor || "middle"} // Default to "middle" if not provided
      fill={fill}
      fontSize={fontSize}
      dominantBaseline="middle" // Vertically centers the text
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

  // Function to format the tick labels (exercise names) on PolarAngleAxis
  const formatExerciseName = (value: string) => {
    const maxLength = 15; // Max length for exercise name
    if (value.length > maxLength) {
      return `${value.substring(0, maxLength)}...`;
    }
    return value;
  };

  return (
    // The w-full here ensures each chart takes the full width of its container
    // for proper snapping on mobile. min-w-3xs ensures a minimum width on larger screens.
    <div className="flex h-60 w-full min-w-3xs items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="85%" // Reduced for more space from Angle Axis labels
          data={latestWorkoutList}
          margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
        >
          <PolarGrid stroke="#757575" />
          <PolarAngleAxis
            dataKey="name"
            tickFormatter={formatExerciseName} // Use formatter for name truncation
            tick={{
              fill: "#6b7280",
              fontSize: 12, // Adjusted font size for angle axis
              fontWeight: 500,
            }}
            baselineShift={10}
            // Removed textAnchor and baselineShift for Angle Axis, let Recharts handle it
          />
          <PolarRadiusAxis
            tick={<CustomRadiusTick fill="#757575" />} // Use custom tick for offset
            axisLine={{ stroke: "#757575" }}
            angle={90}
            tickFormatter={(value) => value.toString()}
            // Removed textAnchor and baselineShift for Radius Axis
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
