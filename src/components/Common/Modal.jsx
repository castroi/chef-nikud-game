import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-width: 90%;
  width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  direction: rtl;
  text-align: center;
`;

const ModalTitle = styled.h2`
  color: #ff6b6b;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const ModalBody = styled.div`
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 15px;
  left: 15px; // RTL
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #aaa;
  
  &:hover {
    color: #ff6b6b;
    background-color: #f5f5f5;
  }
`;

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  showCloseButton = true,
}) => {
  // Modal animations
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { delay: 0.1, type: 'spring', stiffness: 300, damping: 25 } },
    exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } },
  };

  // Closing the modal when pressing the overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          onClick={handleOverlayClick}
        >
          <ModalContent
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {showCloseButton && (
              <CloseButton 
                onClick={onClose}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </CloseButton>
            )}

            <ModalTitle>{title}</ModalTitle>
            
            <ModalBody>{children}</ModalBody>
            
            {actions && (
              <ButtonGroup>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || 'primary'}
                    onClick={action.onClick}
                  >
                    {action.label}
                  </Button>
                ))}
              </ButtonGroup>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};
