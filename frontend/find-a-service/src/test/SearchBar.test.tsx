// @vitest-environment jsdom

import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent , cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { SearchBar } from "../components/SearchBar/SearchBar";

afterEach(() => {
  cleanup();
});

describe("SearchBar", () => {
  it("renders with the default placeholder", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Search services…")).toBeInTheDocument();
  });

  it("renders a custom placeholder when provided", () => {
    render(<SearchBar placeholder="Find a clinic…" />);
    expect(screen.getByPlaceholderText("Find a clinic…")).toBeInTheDocument();
  });

  it("hides the clear button when the input is empty", () => {
    render(<SearchBar />);
    const clearBtn = screen.getByLabelText("Clear search");
    expect(clearBtn).not.toHaveClass("cwu-search__clear--visible");
  });

  it("shows the clear button once the user types", () => {
    render(<SearchBar />);
    const input = screen.getByLabelText("Search services");
    fireEvent.change(input, { target: { value: "clinic" } });
    const clearBtn = screen.getByLabelText("Clear search");
    expect(clearBtn).toHaveClass("cwu-search__clear--visible");
  });

  it("calls onSearchChange with the typed value (uncontrolled mode)", () => {
    const onSearchChange = vi.fn();
    render(<SearchBar onSearchChange={onSearchChange} />);
    const input = screen.getByLabelText("Search services");
    fireEvent.change(input, { target: { value: "hospital" } });
    expect(onSearchChange).toHaveBeenCalledWith("hospital");
  });

  it("clears the input and calls onClear when the clear button is pressed", () => {
    const onClear = vi.fn();
    const onSearchChange = vi.fn();
    render(<SearchBar onSearchChange={onSearchChange} onClear={onClear} />);
    const input = screen.getByLabelText("Search services") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "taxi rank" } });
    expect(input.value).toBe("taxi rank");

    fireEvent.click(screen.getByLabelText("Clear search"));
    expect(input.value).toBe("");
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onSearchChange).toHaveBeenLastCalledWith("");
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
