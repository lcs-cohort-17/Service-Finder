// frontend/src/features/directions/components/TurnByList.tsx
import type { RouteInstruction } from "../../../types/directions.types";

interface TurnByListProps {
  instructions: RouteInstruction[];
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

function TurnByList({ instructions }: TurnByListProps) {
  if (instructions.length === 0) return null;

  return (
    <ol className="turn-by-list">
      {instructions.map((step, index) => (
        <li key={index} className="turn-by-step">
          <span className="turn-by-instruction">{step.instruction}</span>
          {step.distance > 0 && (
            <span className="turn-by-distance"> — {formatDistance(step.distance)}</span>
          )}
        </li>
      ))}
    </ol>
  );
}

export default TurnByList;