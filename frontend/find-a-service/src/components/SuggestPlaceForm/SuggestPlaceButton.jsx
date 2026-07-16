/** @addsuggestions-005-author Onke Mbingeleli*/
import PropTypes from 'prop-types';

export function SuggestPlaceButton({ onClick }) {
  return (
    <button type="button" className="float-btn" onClick={onClick}>
      💡 Suggest a place
    </button>
  );
}

SuggestPlaceButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SuggestPlaceButton;
