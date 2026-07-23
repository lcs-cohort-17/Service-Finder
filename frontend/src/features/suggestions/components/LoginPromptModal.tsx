/** @addsuggestions-005-author Onke Mbingeleli */
import type { ReactElement } from 'react';

export interface LoginPromptModalProps {
  onClose: () => void;
  onLoginRedirect: () => void;
}

export function LoginPromptModal({ onClose, onLoginRedirect }: LoginPromptModalProps): ReactElement {
  return (
    <div className="modal-overlay show">
      <div className="modal-card" style={{ width: 'min(380px, 92vw)' }}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h3>Sign in to suggest a place</h3>
        <div className="sub">
          You need an account so we can follow up with you if we need more
          details about your suggestion.
        </div>
        <button type="button" className="btn btn-primary" onClick={onLoginRedirect}>
          Log in to continue
        </button>
      </div>
    </div>
  );
}

export default LoginPromptModal;
