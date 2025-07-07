import React, { useEffect } from 'react'; // Import useEffect
import { useModal } from '../contexts/ModalContext';
import './styless/Modal.css'; // Import the CSS file

const Modal = () => {
  const { isModalOpen, closeModal, modalContent, modalOptions } = useModal();

  useEffect(() => {
    // Prevent scrolling when the modal is open
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'unset'; // Re-enable scrolling
    }

    // Cleanup function to re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'unset'; // Ensure scrolling is re-enabled
    };
  }, [isModalOpen]); // Run this effect whenever isModalOpen changes

  if (!isModalOpen || !modalContent) {
    return null; // Don't render the modal if it's not open or has no content
  }

  return (
    <div className={`modal-overlay ${modalOptions.noOverlay ? 'no-overlay' : ''}`} onClick={closeModal}>
      <div className={`modal-content ${modalOptions.plain ? 'no-bg' : ''}`} onClick={(e) => e.stopPropagation()}>
        {modalContent}
        <button className="close-button" onClick={closeModal}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
