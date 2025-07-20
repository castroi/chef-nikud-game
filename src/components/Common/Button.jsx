import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledButton = styled(motion.button)`
  background-color: ${props => props.variant === 'primary' ? '#ff6b6b' : 
                              props.variant === 'secondary' ? '#06d6a0' : 
                              props.variant === 'warning' ? '#ffd166' : 
                              '#e0e0e0'};
  color: ${props => props.variant === 'primary' || props.variant === 'secondary' ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-family: 'Alef', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  &:active {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #f0f0f0;
    color: #888;
    cursor: not-allowed;
    transform: translateY(0);
    box-shadow: none;
  }
`;

export const Button = ({ 
  children, 
  variant = 'primary',
  onClick, 
  disabled = false,
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...props}
    >
      {children}
    </StyledButton>
  );
};
