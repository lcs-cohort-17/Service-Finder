/** @addsuggestions-005-author Onke Mbingeleli */
import { useEffect, type ReactElement } from 'react';
import type { ToastVariant } from '../../../types/suggestion.types';

export interface SuggestToastProps {
  variant?: ToastVariant;
  message: string;
  onDismiss: () => void;
  autoDismissMs?: number;
}

export function SuggestToast({
  variant = 'success',
  message,
  onDismiss,
  autoDismissMs = 4000,
}: SuggestToastProps): ReactElement {
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

export default SuggestToast;
