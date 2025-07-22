import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import emojiMap from '../../../src/data/emojis.json';

const IngredientContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: grab; /* Change cursor to indicate draggability */
  position: relative;
  user-select: none;
  z-index: 10; /* Ensure draggable ingredient is above other elements */
`;

const IngredientImage = styled(motion.div)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const IngredientName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  max-width: 100px;
  color: #333;
`;

export const Ingredient = ({ ingredient, onSelect, onDragEnd, isSelected }) => {
  const controls = useAnimation();
  const containerRef = useRef(null);

  useEffect(() => {
    // Reset ingredient position if it was selected and then unselected
    if (!isSelected) {
      controls.start({
        x: 0,
        y: 0,
        scale: 1,
        transition: { duration: 0.2 }
      });
    }
  }, [isSelected, controls]);

  const handleDragStart = () => {
    // Trigger the onSelect when drag starts, simulating the previous click behavior
    onSelect(ingredient);
    controls.start({
      scale: 1.1,
      transition: { duration: 0.1 }
    });
  };

  const handleDragTransitionEnd = () => {
    // This is called automatically by framer-motion when drag animation ends
    // We can use this to signal to the parent that dragging has finished
    onDragEnd();
  };
  


  // Choose the appropriate emoji for the ingredient
  const getEmoji = (imageName) => {
    return emojiMap[imageName] || '🍲';
  };
  
  return (
    <IngredientContainer
      ref={containerRef}
      drag
      dragConstraints={containerRef} /* Constrain drag to its parent (itself in this case, but useful for conceptual understanding) */
      dragElastic={1} /* Allows a "rubber band" effect when dragging outside constraints */
      onDragStart={handleDragStart}
      onDragEnd={handleDragTransitionEnd} /* Use framer-motion's onDragEnd */
      whileHover={{ scale: 1.05 }}
      animate={controls}
      style={{
        position: 'relative' // Ensure positioning context for drag
      }}
    >
      <IngredientImage>
        {getEmoji(ingredient.image)}
      </IngredientImage>
      <IngredientName>{ingredient.name}</IngredientName>
    </IngredientContainer>
  );
};
