/** @addsuggestions-005-author Onke Mbingeleli */
import type { ReactElement } from 'react';

export interface SuggestPlaceButtonProps {
  onClick: () => void;
}

export function SuggestPlaceButton({ onClick }: SuggestPlaceButtonProps): ReactElement {
  return (
    <button type="button" className="float-btn" onClick={onClick}>
      💡 Suggest a place
    </button>
  );
}

export default SuggestPlaceButton;
