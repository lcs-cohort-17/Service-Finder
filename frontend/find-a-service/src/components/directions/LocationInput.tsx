interface LocationInputProps {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  ariaLabel: string
}

function LocationInput({
  id,
  value,
  onChange,
  placeholder,
  ariaLabel,
}: LocationInputProps) {
  return (
    <input
      id={id}
      className="route-input"
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      autoComplete="off"
    />
  )
}

export default LocationInput