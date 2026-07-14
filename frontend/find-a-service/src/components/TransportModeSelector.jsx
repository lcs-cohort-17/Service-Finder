// src/components/TransportModeSelector.jsx

const MODES = [
  { value: "driving", label: "Driving" },
  { value: "walking", label: "Walking" },
  { value: "cycling", label: "Cycling" },
];

// Controlled component: parent owns the selected mode.
// value: "driving" | "walking" | "cycling"
// onChange: (mode: string) => void
function TransportModeSelector({ value, onChange }) {
  return (
    <div className="transport-mode-selector" role="radiogroup" aria-label="Transport mode">
      {MODES.map((mode) => (
        <label key={mode.value} className="transport-mode-option">
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

export default TransportModeSelector;