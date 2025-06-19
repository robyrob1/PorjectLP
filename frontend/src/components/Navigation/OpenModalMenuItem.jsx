import { useModal } from '../../context/Modal';
import './OpenModalMenuItem.css';

function OpenModalMenuItem({
  modalComponent,
  itemText,
  onItemClick,
  onModalClose,
  icon: IconComponent // Optional: icon component to display with text
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const handleMenuItemClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === 'function') onItemClick();
  };

  return (
    <li 
      className="modal-menu-item"
      onClick={handleMenuItemClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleMenuItemClick()}
    >
      {IconComponent && (
        <span className="modal-menu-item__icon">
          <IconComponent />
        </span>
      )}
      <span className="modal-menu-item__text">
        {itemText}
      </span>
    </li>
  );
}

export default OpenModalMenuItem;