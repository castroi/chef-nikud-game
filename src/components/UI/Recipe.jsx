import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import emojiMap from '../../data/emojis.json';

const RecipeContainer = styled.div`
  background-color: #fff4e0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
  }
`;

const RecipeTitle = styled.h2`
  color: #ff6b6b;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.8rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 25%;
    width: 50%;
    height: 3px;
    background-color: #ffd166;
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    &:after {
      left: 20%;
      width: 60%;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
    &:after {
      left: 15%;
      width: 70%;
    }
  }
`;

const IngredientList = styled.ul`
  list-style-type: none;
  padding: 0;
  flex: 1;
`;

const IngredientItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  font-size: 1.4rem; /* Slightly larger base */
  padding: 0.8rem 1rem;
  border-radius: 8px;
  background-color: ${props => props.isActive ? '#ffd1663b' : 'transparent'};
  
  &:before {
    margin-left: 10px;
    color: #ff6b6b;
    font-size: 1.5rem;
  }
  
  span {
    margin-left: 8px;
  }
  
  strong {
    color: ${props => props.isActive ? '#ff6b6b' : 'inherit'};
    font-weight: ${props => props.isActive ? 'bold' : 'normal'};
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    padding: 0.6rem 0.8rem;
    &:before {
      margin-left: 8px;
      font-size: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.8rem;
    padding: 0.5rem 0.6rem;
    &:before {
      margin-left: 6px;
      font-size: 1rem;
    }
  }
`;

const IngredientEmoji = styled.span`
  font-size: 1.6rem; /* Slightly larger base emoji */
  margin-left: 10px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-left: 8px;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-left: 6px;
  }
`;


export const Recipe = ({ recipeName, ingredients, currentIngredient }) => {
  return (
    <RecipeContainer>
      <RecipeTitle>{recipeName}</RecipeTitle>
      <IngredientList>
        {ingredients.map((ingredient, index) => (
          <IngredientItem 
            key={index}
            isActive={index === currentIngredient}
            animate={index === currentIngredient ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <IngredientEmoji>
              {emojiMap[ingredient.image] || '🍲'}
            </IngredientEmoji>
            <strong>{ingredient.name}</strong>
          </IngredientItem>
        ))}
      </IngredientList>
    </RecipeContainer>
  );
};
