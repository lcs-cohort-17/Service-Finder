/** @addsuggestions-005-author Onke Mbingeleli.. */
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export function SuggestToast({ variant = 'success', message, onDismiss, autoDismissMs = 4000 }) {
  useEffect(() => {
    if (autoDismissMs === 0) return undefined;
    const timer = setTimeout(onDismiss, autoDismissMs);
    return () => clearTimeout(timer);
  }, [autoDismissMs, onDismiss]);

  return (
    <div className={`suggest-toast ${variant}`} role="status" aria-live="polite">
      <span className="dot" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

SuggestToast.propTypes = {
  variant: PropTypes.oneOf(['success', 'error']),
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
  autoDismissMs: PropTypes.number,
};

export default SuggestToast;
