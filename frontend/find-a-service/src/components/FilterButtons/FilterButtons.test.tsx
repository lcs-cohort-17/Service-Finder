/* TESTING */

import { render, screen, fireEvent } from '@testing-library/react';
import { FilterButtons } from './FilterButtons';
import { SERVICE_CATEGORIES } from '../../data/services';

describe('FilterButtons', () => {
  const mockToggle = vi.fn();
  const mockClear = vi.fn();

  it('renders all category buttons', () => {
    render(
      <FilterButtons
        categories={SERVICE_CATEGORIES}
        selected={[]}
        onToggle={mockToggle}
        onClearAll={mockClear}
      />
    );
    SERVICE_CATEGORIES.forEach((cat) => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });
  });

  it('applies active class to selected categories', () => {
    const selected = [SERVICE_CATEGORIES[0], SERVICE_CATEGORIES[1]];
    render(
      <FilterButtons
        categories={SERVICE_CATEGORIES}
        selected={selected}
        onToggle={mockToggle}
        onClearAll={mockClear}
      />
    );
    // Use regex to match the 'active' class (CSS Module)
    const firstBtn = screen.getByText(selected[0]);
    const secondBtn = screen.getByText(selected[1]);
    const thirdBtn = screen.getByText(SERVICE_CATEGORIES[2]);
    expect(firstBtn).toHaveClass(/active/);
    expect(secondBtn).toHaveClass(/active/);
    expect(thirdBtn).not.toHaveClass(/active/);
  });

  it('calls onToggle when a button is clicked', () => {
    render(
      <FilterButtons
        categories={SERVICE_CATEGORIES}
        selected={[]}
        onToggle={mockToggle}
        onClearAll={mockClear}
      />
    );
    const firstCategory = SERVICE_CATEGORIES[0];
    fireEvent.click(screen.getByText(firstCategory));
    expect(mockToggle).toHaveBeenCalledWith(firstCategory);
  });

  it('shows clear all button when categories are selected and calls onClearAll', () => {
    render(
      <FilterButtons
        categories={SERVICE_CATEGORIES}
        selected={[SERVICE_CATEGORIES[0]]}
        onToggle={mockToggle}
        onClearAll={mockClear}
      />
    );
    const clearAllBtn = screen.getByText('Clear all');
    expect(clearAllBtn).toBeInTheDocument();
    fireEvent.click(clearAllBtn);
    expect(mockClear).toHaveBeenCalled();
  });
});