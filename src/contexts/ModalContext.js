// features/ModalContext.js
import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); // Store modal content (JSX)

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null); // Clear modal content when closing
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalContent }}>
      {children}
    </ModalContext.Provider>
  );
};
