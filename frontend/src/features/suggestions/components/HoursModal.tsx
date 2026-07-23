/** @addsuggestions-005-author Onke Mbingeleli */
import type { ReactElement } from 'react';
import { DAYS_OF_WEEK, type SuggestHourEntry } from '../../../types/suggestion.types';

export const DAYS = DAYS_OF_WEEK;

function formatRange(entry: SuggestHourEntry | undefined): string {
  if (!entry || entry.closed) return 'Closed';
  if (!entry.open || !entry.close) return 'Hours not set';
  return `${entry.open} – ${entry.close}`;
}

export interface HoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  hours: SuggestHourEntry[];
  onEditDay: (day: string) => void;
  onEditAll: () => void;
  onEditWeekdays: () => void;
  onEditWeekend: () => void;
  onSave: () => void;
}

export function HoursModal({
  isOpen,
  onClose,
  onBack,
  hours,
  onEditDay,
  onEditAll,
  onEditWeekdays,
  onEditWeekend,
  onSave,
}: HoursModalProps): ReactElement | null {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay show">
      <div className="modal-card" style={{ width: 'min(420px, 92vw)' }}>
        <div className="hours-modal-header">
          <button type="button" onClick={onBack} aria-label="Back">
            ‹ Back
          </button>
          <h3 style={{ margin: 0 }}>Hours</h3>
          <button type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="sub">
          Let people know when this place is open. You can set all days at
          once or fine-tune each one.
        </div>

        <div className="hours-chips">
          <button type="button" className="hours-chip" onClick={onEditAll}>
            Set all days
          </button>
          <button type="button" className="hours-chip" onClick={onEditWeekdays}>
            Set weekdays
          </button>
          <button type="button" className="hours-chip" onClick={onEditWeekend}>
            Set weekend
          </button>
        </div>

        <div>
          {DAYS.map((day) => {
            const entry = hours.find((h) => h.day === day);
            const isClosed = !entry || entry.closed;
            return (
              <div className="hours-row" key={day}>
                <span className="day-name">{day}</span>
                <span className="day-time">
                  <span className={isClosed ? 'closed' : 'open'}>{formatRange(entry)}</span>
                  <button
                    type="button"
                    className="edit-day"
                    onClick={() => onEditDay(day)}
                    aria-label={`Edit hours for ${day}`}
                  >
                    ✎
                  </button>
                </span>
              </div>
            );
          })}
        </div>

        <div className="hours-footer" style={{ marginTop: 16 }}>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={onSave}>
            Save hours
          </button>
        </div>
      </div>
    </div>
  );
}

export default HoursModal;
