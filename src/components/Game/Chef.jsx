import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ChefContainer = styled(motion.div)`
  width: 150px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: auto;
  }
`;

// Note: Add a chef image to the assets/images directory
// Basic version uses emoji image
export const Chef = ({ isDragging, isCorrect }) => {
  // Chef animations based on state
  const variants = {
    idle: {
      rotate: [0, 0, 0],
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        repeatType: "reverse" 
      }
    },
    dragging: {
      rotate: [0, -5, 0, 5, 0],
      transition: { 
        duration: 1.5, 
        repeat: Infinity 
      }
    },
    correct: {
      rotate: [0, 10, 0, 10, 0],
      scale: [1, 1.1, 1],
      transition: { 
        duration: 0.8, 
      }
    },
    incorrect: {
      rotate: [0, -10, 0, -10, 0],
      transition: { 
        duration: 0.5, 
      }
    }
  };

  // Determine which animation to show
  let animationState = 'idle';
  if (isDragging && isCorrect === undefined) animationState = 'dragging';
  else if (isCorrect === true) animationState = 'correct';
  else if (isCorrect === false) animationState = 'incorrect';

  return (
    <ChefContainer
      animate={animationState}
      variants={variants}
    >
      <div>👨‍🍳</div>
      <h3>שף הניקוד</h3>
    </ChefContainer>
  );
};
