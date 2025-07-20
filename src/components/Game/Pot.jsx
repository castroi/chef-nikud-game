import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PotContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PotImage = styled(motion.div)`
  width: 150px;
  height: 150px;
  background-color: #5a5a5a;
  border-radius: 50% 50% 10% 10%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  
  &:before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    height: 40px;
    background-color: #444;
    border-radius: 50%;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background-color: #ff6b6b;
    border-radius: 0 0 10% 10%;
    opacity: 0.8;
  }
`;

const SteamAnimation = styled(motion.div)`
  position: absolute;
  top: -30px;
  left: 40px;
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
`;

const DropZone = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  z-index: 2;
`;

export const Pot = ({ onDrop }) => {
  const [isBoiling, setIsBoiling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animation for cooking steam
  const steamVariants = {
    idle: {
      opacity: 0,
    },
    boiling: {
      opacity: [0.7, 0],
      y: [-20, -60],
      x: [0, 10, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  };

  const handleDragEnter = () => {
    setIsHovered(true);
  };

  const handleDragLeave = () => {
    setIsHovered(false);
  };

  const handleDrop = () => {
    setIsBoiling(true);
    onDrop();
    
    // After boiling animation, return to normal state
    setTimeout(() => {
      setIsBoiling(false);
    }, 2000);
  };

  return (
    <PotContainer>
      <SteamAnimation
        variants={steamVariants}
        animate={isBoiling ? 'boiling' : 'idle'}
      />
      <SteamAnimation
        variants={steamVariants}
        animate={isBoiling ? 'boiling' : 'idle'}
        style={{ left: '70px', animationDelay: '0.5s' }}
      />
      <SteamAnimation
        variants={steamVariants}
        animate={isBoiling ? 'boiling' : 'idle'}
        style={{ left: '100px', animationDelay: '1s' }}
      />

      <PotImage
        initial={{ scale: 1 }}
        animate={{ 
          scale: isHovered ? 1.1 : 1,
          rotate: isBoiling ? [0, 1, 0, -1, 0] : 0, 
        }}
        transition={{ 
          duration: isBoiling ? 0.3 : 0.2,
          repeat: isBoiling ? 5 : 0,
        }}
      />
      <DropZone
        onHoverStart={handleDragEnter}
        onHoverEnd={handleDragLeave}
        onTap={handleDrop}
      />
    </PotContainer>
  );
};
