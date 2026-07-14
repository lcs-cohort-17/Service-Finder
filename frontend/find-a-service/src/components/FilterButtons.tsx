import "./FilterButtons.css";

export interface Category {
  id: string;
  label: string;
  color: string;
}

export interface FilterButtonsProps {
  selectedCategories: string[];
  onSelectionChange: (categories: string[]) => void;
}

const serviceCategories: Category[] = [
  { id: "hospital", label: "Hospitals", color: "#ef4444" },
  { id: "clinic", label: "Clinics", color: "#14b8a6" },
  { id: "library", label: "Libraries", color: "#6366f1" },
  { id: "shelter", label: "Shelters", color: "#8b5cf6" },
  { id: "police", label: "Police", color: "#111827" },
  { id: "taxi", label: "Taxi Ranks", color: "#f59e0b" },
  { id: "bus", label: "Bus Stops", color: "#fb923c" },
  { id: "train", label: "Train Stations", color: "#ec4899" },
];

export default function FilterButtons({
  selectedCategories,
  onSelectionChange,
}: FilterButtonsProps) {

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onSelectionChange(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      onSelectionChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <section className="filter-container">

      <h2 className="filter-title">SHOW ON MAP</h2>

      <div className="filter-grid">

        {serviceCategories.map((category) => {

          const active = selectedCategories.includes(category.id);

          return (

            <button
              key={category.id}
              type="button"
              aria-pressed={active}
              className={`filter-button ${active ? "active" : ""}`}
              onClick={() => toggleCategory(category.id)}
            >
              <span
                className="dot"
                style={{ backgroundColor: category.color }}
              />

              {category.label}

            </button>

          );

        })}

      </div>

    </section>
  );
}