import { Search, X } from 'lucide-react';
import { useState } from 'react';
import type { Service } from '../../../types/service.types';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  results: Service[];
  onSelect: (service: Service) => void;
}

/** Kept at its existing filename to avoid breaking the team's imports. */
export default function SerachBar({ value, onChange, results, onSelect }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const showResults = isOpen && value.trim().length > 0;

  return (
    <div className="service-search-wrap">
      <label className="service-search">
        <Search size={19} aria-hidden="true" />
        <input
          type="search"
          value={value}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => { onChange(event.target.value); setIsOpen(true); }}
          placeholder="Search services, categories or addresses"
          aria-label="Search services"
        />
        {value && (
          <button type="button" onClick={() => { onChange(''); setIsOpen(false); }} aria-label="Clear search">
            <X size={17} aria-hidden="true" />
          </button>
        )}
      </label>
      {showResults && (
        <div className="search-results" role="listbox" aria-label="Matching services">
          {results.slice(0, 6).map((service) => (
            <button
              key={service.id}
              type="button"
              className="search-result"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => { onSelect(service); setIsOpen(false); }}
            >
              <span className="search-result-name">{service.name}</span>
              <span className="search-result-meta">{service.category}{service.address ? ` · ${service.address}` : ''}</span>
            </button>
          ))}
          {results.length === 0 && <p className="search-no-results">No matching services</p>}
        </div>
      )}
    </div>
  );
}
