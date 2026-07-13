/* TESTING */

import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders input with value and calls onChange on typing', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="test" onChange={handleChange} onClear={() => {}} />);
    const input = screen.getByPlaceholderText('Search services...');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledWith('new value');
  });

  it('calls onClear when clear button is clicked and input has value', () => {
    const handleClear = vi.fn();
    render(<SearchBar value="hello" onChange={() => {}} onClear={handleClear} />);
    const clearBtn = screen.getByLabelText('Clear search');
    fireEvent.click(clearBtn);
    expect(handleClear).toHaveBeenCalled();
  });

  it('does not show clear button when input is empty', () => {
    render(<SearchBar value="" onChange={() => {}} onClear={() => {}} />);
    const clearBtn = screen.queryByLabelText('Clear search');
    // Check that it has the 'hidden' class (using regex to match CSS Module)
    expect(clearBtn).toHaveClass(/hidden/);
  });
});