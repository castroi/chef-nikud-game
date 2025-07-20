import React from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const IngredientContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  user-select: none;
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

export const Ingredient = ({ ingredient, onSelect, isSelected }) => {
  const controls = useAnimation();
  
  const handleClick = () => {
    // If ingredient is already selected, do nothing
    if (isSelected) return;
    
    // Activate "lifting" animation
    controls.start({
      y: -10,
      scale: 1.1,
      transition: { duration: 0.2 }
    }).then(() => {
      onSelect(ingredient);
    });
  };
  
  // Error effect - shake
  const wrongAnimation = async () => {
    await controls.start({
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.4 }
    });
    await controls.start({ scale: 1, y: 0 });
  };
  
  // Choose the appropriate emoji for the ingredient
  const getEmoji = (imageName) => {
    const emojiMap = {
      'onion.png': '🧅',
      'carrot.png': '🥕',
      'potato.png': '🥔',
      'salt.png': '🧂',
      'pepper.png': '🌶️',
      'oil.png': '🫗',
      'tomato.png': '🍅',
      'flour.png': '🌾',
      'cheese.png': '🧀',
      'olive.png': '🫒',
      'sugar.png': '🌇',
      'egg.png': '🥚',
      'water.png': '💧',
      'yeast.png': '🍞'
    };
    
    return emojiMap[imageName] || '🍲';
  };
  
  return (
    <IngredientContainer
      whileHover={{ scale: 1.05 }}
      animate={controls}
      onClick={handleClick}
    >
      <IngredientImage>
        {getEmoji(ingredient.image)}
      </IngredientImage>
      <IngredientName>{ingredient.name}</IngredientName>
    </IngredientContainer>
  );
};
