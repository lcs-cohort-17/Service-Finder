export type TransportMode = 'walking' | 'cycling' | 'driving'

interface TransportModeSelectorProps {
  selectedMode: TransportMode
  onChange: (mode: TransportMode) => void
}

const transportModes: Array<{
  value: TransportMode
  label: string
  icon: string
}> = [
  { value: 'walking', label: 'Walking', icon: '🚶' },
  { value: 'cycling', label: 'Cycling', icon: '🚴' },
  { value: 'driving', label: 'Driving', icon: '🚗' },
]

function TransportModeSelector({
  selectedMode,
  onChange,
}: TransportModeSelectorProps) {
  return (
    <div
      className="transport-mode-selector"
      role="group"
      aria-label="Select transport mode"
    >
      {transportModes.map((mode) => {
        const isSelected = selectedMode === mode.value

        return (
          <button
            key={mode.value}
            type="button"
            className={isSelected ? 'mode-button active' : 'mode-button'}
            onClick={() => onChange(mode.value)}
            aria-label={mode.label}
            aria-pressed={isSelected}
            title={mode.label}
          >
            <span aria-hidden="true">{mode.icon}</span>
          </button>
        )
      })}
    </div>
  )
}

export default TransportModeSelector