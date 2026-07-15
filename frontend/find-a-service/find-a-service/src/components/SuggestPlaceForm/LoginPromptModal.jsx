/** @addsuggestions-005-author Onke Mbingeleli */
import PropTypes from 'prop-types';

export function LoginPromptModal({ isOpen, onClose, onLoginRedirect }) {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'show' : ''}`}>
      <div className="modal-card" style={{ width: 'min(380px, 92vw)' }}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <h3>📍 Log in to suggest a place</h3>
        <div className="sub">
          Suggestions are tied to your account so we can follow up if we need
          more details before it goes live on the map.
        </div>
        <button type="button" className="btn btn-primary" onClick={onLoginRedirect}>
          Log in to continue
        </button>
      </div>
    </div>
  );
}

LoginPromptModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLoginRedirect: PropTypes.func.isRequired,
};

export default LoginPromptModal;
