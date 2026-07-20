// frontend/src/features/directions/components/ModeSelector.tsx
import type { TransportMode } from "../../../types/directions.types";

interface ModeOption {
  value: TransportMode;
  label: string;
}

const MODES: ModeOption[] = [
  { value: "driving", label: "Driving" },
  { value: "walking", label: "Walking" },
  { value: "cycling", label: "Cycling" },
];

interface ModeSelectorProps {
  value: TransportMode;
  onChange: (mode: TransportMode) => void;
}

function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div className="mode-selector" role="radiogroup" aria-label="Transport mode">
      {MODES.map((mode) => (
        <label key={mode.value} className="mode-option">
          <input
            type="radio"
            name="transport-mode"
            value={mode.value}
            checked={value === mode.value}
            onChange={() => onChange(mode.value)}
          />
          {mode.label}
        </label>
      ))}
    </div>
  );
}

export default ModeSelector;
