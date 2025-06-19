import { useModal } from '../../context/Modal';
import PropTypes from 'prop-types';
import './OpenModalButton.css';

function OpenModalButton({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
  buttonStyle = 'primary', // 'primary' | 'secondary' | 'text'
  icon: IconComponent,
  className = ''
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const handleButtonClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === 'function') onButtonClick();
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`modal-button modal-button--${buttonStyle} ${className}`}
      aria-label={typeof buttonText === 'string' ? buttonText : 'Open modal'}
    >
      {IconComponent && (
        <span className="modal-button__icon">
          <IconComponent />
        </span>
      )}
      <span className="modal-button__text">
        {buttonText}
      </span>
    </button>
  );
}

OpenModalButton.propTypes = {
  modalComponent: PropTypes.element.isRequired,
  buttonText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  onButtonClick: PropTypes.func,
  onModalClose: PropTypes.func,
  buttonStyle: PropTypes.oneOf(['primary', 'secondary', 'text']),
  icon: PropTypes.elementType,
  className: PropTypes.string
};

export default OpenModalButton;