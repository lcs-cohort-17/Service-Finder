import type { CSSProperties } from "react";

import "./FilterButtons.css";
import { serviceCategories } from "./categoryStyles";

export interface FilterButtonsProps {
  selectedCategories: string[];
  onSelectionChange: (categories: string[]) => void;
}

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
          const Icon = category.icon;

          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={active}
              className={`filter-button ${active ? "active" : ""}`}
              onClick={() => toggleCategory(category.id)}
              style={{
                "--category-color": category.color,
              } as CSSProperties}
            >
              <span className="filter-icon" aria-hidden="true">
                <Icon size={16} strokeWidth={2.5} />
              </span>

              {category.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
