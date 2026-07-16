/** @addsuggestions-005-author Onke Mbingeleli. */
import PropTypes from 'prop-types';

export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay show">
      <div className="modal-card" style={{ width: 'min(400px, 92vw)' }}>
        <div className="hours-modal-header">
          <button type="button" onClick={onBack} aria-label="Back">
            ←
          </button>
          <h3 style={{ margin: 0 }}>Hours</h3>
          <button type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div>
          {hours.map((entry) => (
            <div key={entry.day} className="hours-row">
              <span className="day-name">{entry.day}</span>
              <div className="day-time">
                <span className={entry.closed ? 'closed' : 'open'}>
                  {entry.closed ? 'Closed' : `${entry.open} – ${entry.close}`}
                </span>
                <button
                  type="button"
                  className="edit-day"
                  onClick={() => onEditDay(entry.day)}
                  aria-label={`Edit ${entry.day} hours`}
                >
                  ✏️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="hours-chips">
          <button type="button" className="hours-chip" onClick={onEditAll}>
            Edit all hours
          </button>
          <button type="button" className="hours-chip" onClick={onEditWeekdays}>
            Edit Mon–Fri
          </button>
          <button type="button" className="hours-chip" onClick={onEditWeekend}>
            Edit Sat–Sun
          </button>
        </div>

        <div className="hours-footer">
          <button type="button" className="btn btn-ghost" style={{ width: 'auto' }} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" style={{ width: 'auto' }} onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

HoursModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  hours: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      closed: PropTypes.bool.isRequired,
      open: PropTypes.string,
      close: PropTypes.string,
    })
  ).isRequired,
  onEditDay: PropTypes.func.isRequired,
  onEditAll: PropTypes.func.isRequired,
  onEditWeekdays: PropTypes.func.isRequired,
  onEditWeekend: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default HoursModal;
