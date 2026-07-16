// @vitest-environment jsdom

import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { SearchBar } from "../components/SearchBar/SearchBar";

afterEach(() => {
  cleanup();
});

describe("SearchBar", () => {
  it("renders with the default placeholder", () => {
    render(<SearchBar value="" onSearchChange={() => {}} />);
    expect(screen.getByPlaceholderText("Search services…")).toBeInTheDocument();
  });

  it("renders a custom placeholder when provided", () => {
    render(<SearchBar placeholder="Find a clinic…" value="" onSearchChange={() => {}} />);
    expect(screen.getByPlaceholderText("Find a clinic…")).toBeInTheDocument();
  });

  it("hides the clear button when the input is empty", () => {
    render(<SearchBar value="" onSearchChange={() => {}} />);
    const clearBtn = screen.getByLabelText("Clear search");
    expect(clearBtn).not.toHaveClass("cwu-search__clear--visible");
  });

  it("shows the clear button once there is a search value", () => {
    // Pass a value so the clear button's visibility logic triggers correctly in controlled mode
    render(<SearchBar value="clinic" onSearchChange={() => {}} />);
    const clearBtn = screen.getByLabelText("Clear search");
    expect(clearBtn).toHaveClass("cwu-search__clear--visible");
  });

  it("calls onSearchChange with the typed value", () => {
    const onSearchChange = vi.fn();
    render(<SearchBar value="" onSearchChange={onSearchChange} />);
    const input = screen.getByLabelText("Search services");
    
    fireEvent.change(input, { target: { value: "hospital" } });
    expect(onSearchChange).toHaveBeenCalledWith("hospital");
  });

  it("calls onClear and updates via props when the clear button is pressed", () => {
    const onClear = vi.fn();
    const onSearchChange = vi.fn();
    
    // Render as a controlled component with an initial value
    const { rerender } = render(
      <SearchBar value="taxi rank" onSearchChange={onSearchChange} onClear={onClear} />
    );
    const input = screen.getByLabelText("Search services") as HTMLInputElement;
    expect(input.value).toBe("taxi rank");

    // Click clear
    fireEvent.click(screen.getByLabelText("Clear search"));
    
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onSearchChange).toHaveBeenLastCalledWith("");

    // Re-render with the new empty value to simulate the parent state updating
    rerender(<SearchBar value="" onSearchChange={onSearchChange} onClear={onClear} />);
    expect(input.value).toBe("");
  });

  it("respects a controlled value prop", () => {
    render(<SearchBar value="pharmacy" onSearchChange={() => {}} />);
    const input = screen.getByLabelText("Search services") as HTMLInputElement;
    expect(input.value).toBe("pharmacy");
  });

  it("disables the input and clear button when disabled prop is true", () => {
    render(<SearchBar disabled value="x" onSearchChange={() => {}} />);
    expect(screen.getByLabelText("Search services")).toBeDisabled();
    expect(screen.getByLabelText("Clear search")).toBeDisabled();
  });
});