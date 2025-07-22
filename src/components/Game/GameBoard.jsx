import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Chef } from './Chef';
import { Pot } from './Pot';
import { Ingredient } from './Ingredient';
import { Recipe } from '../UI/Recipe';
import { ProgressBar } from '../UI/ProgressBar';

const MainLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure it takes full viewport height */
  padding: 1rem; /* Add some overall padding */
  box-sizing: border-box; /* Include padding in element's total width and height */

  @media (max-width: 768px) {
    padding: 0.5rem; /* Less padding on smaller screens */
  }
`;

const GameBoardContainer = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 2rem;
  flex-grow: 1; /* Allow GameBoardContainer to take available vertical space within MainLayoutContainer */
  margin-bottom: 1rem; /* Space between GameBoard and Ingredients */

  @media (max-width: 768px) {
    grid-template-columns: 60% 40%; /* Adjust for tablet - keeping side by side */
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 55% 45%; /* Further adjust for mobile - keeping side by side */
    gap: 0.5rem;
  }
`;

const KitchenArea = styled.div`
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  
  .top-area {
    display: flex;
    justify-content: space-between;
    height: 70%;
  }
  
  .bottom-area {
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
`;

const IngredientsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 12px;
  padding: 1rem;
  gap: 1rem;
`;

const GameMessage = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  font-size: 1.5rem; /* Base font size */
  font-weight: bold;
  color: #ff6b6b;
  white-space: nowrap; /* Keep on one line for larger screens */

  @media (max-width: 768px) {
    top: 15px;
    font-size: 1.1rem; /* Slightly smaller for tablets */
    padding: 0.8rem 1.5rem;
    max-width: 95%; /* Adjust max-width to allow more space for text */
    white-space: normal; /* Allow text to wrap on smaller screens */
    text-align: center;
  }

  @media (max-width: 480px) {
    top: 10px;
    font-size: 0.8rem; /* Smaller font on mobile for better fit */
    padding: 0.4rem 0.8rem; /* Reduced padding */
    max-width: 98%; /* More aggressive max-width for small phones */
  }
`;

export const GameBoard = ({ level, recipe, levelData }) => {
  const [currentIngredientIndex, setCurrentIngredientIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [gameMessage, setGameMessage] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredientOptions, setIngredientOptions] = useState([]);
  
  const currentIngredient = recipe.ingredients[currentIngredientIndex];
  
  useEffect(() => {
    // Reset state when recipe changes
    setCurrentIngredientIndex(0);
    setProgress(0);
    setGameMessage(`בואו נכין ${recipe.name}! מצא את ${recipe.ingredients[0].name}`);
    
    // Create random ingredient options
    generateIngredientOptions();
  }, [recipe]);
  
  useEffect(() => {
    if (currentIngredient) {
      setGameMessage(`בואו נכין ${recipe.name}! מצא את ${currentIngredient.name}`);
      generateIngredientOptions();
    }
  }, [currentIngredientIndex]);
  
  const generateIngredientOptions = () => {
    if (!currentIngredient) return;
    
    // Create shuffled ingredient options
    const options = [
      { ...currentIngredient, isCorrect: true },
      ...currentIngredient.alternatives.map((altName, index) => ({
        name: altName,
        image: currentIngredient.image,
        isCorrect: false
      }))
    ];
    
    // Up to 5 shuffled options
    const shuffled = [...options].sort(() => 0.5 - Math.random()).slice(0, 5);
    setIngredientOptions(shuffled);
  };
  
  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredient(ingredient);
  };
  
  const handleIngredientDrop = (e) => {
    // Check if there's a selected ingredient and if it's the correct one
    if (selectedIngredient) {
      const isCorrect = selectedIngredient.isCorrect;

      if (isCorrect) {
        // Correct answer
        setGameMessage("כל הכבוד! 🎉");
  
      // Update progress
      const newProgress = Math.round(((currentIngredientIndex + 1) / recipe.ingredients.length) * 100);
      setProgress(newProgress);
      
      // Check if we finished the recipe
      if (currentIngredientIndex === recipe.ingredients.length - 1) {
        setTimeout(() => {
          setGameMessage("הידד! סיימת להכין את המתכון! 🍲");
        }, 1000);
      } else {
        // Move to next ingredient
        setTimeout(() => {
          setCurrentIngredientIndex(prevIndex => prevIndex + 1);
        }, 1000);
      }
    } else {
        // Wrong answer
        setGameMessage("זה לא מה שאנחנו מחפשים, בוא ננסה שוב! 😊");
        
        setTimeout(() => {
          setGameMessage(`בואו נכין ${recipe.name}! מצא את ${currentIngredient.name}`);
        }, 1500);
      }
      setSelectedIngredient(null); // Clear selected ingredient after a drop attempt
    }
  };
  
  return (
    <MainLayoutContainer>
      <GameBoardContainer>
        <KitchenArea>
          <GameMessage
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            key={gameMessage}
          >
            {gameMessage}
          </GameMessage>
          
          <div className="top-area">
            <Chef 
              isDragging={!!selectedIngredient} 
              isCorrect={selectedIngredient?.isCorrect} 
            />
            <Pot 
              onDrop={handleIngredientDrop} 
              selectedIngredient={selectedIngredient} 
            />
          </div>
          
          <div className="bottom-area">
            <ProgressBar progress={progress} />
          </div>
        </KitchenArea>
        
        <div>
          <Recipe 
            recipeName={recipe.name} 
            ingredients={recipe.ingredients}
            currentIngredient={currentIngredientIndex}
          />
        </div>
      </GameBoardContainer>
      
      <IngredientsContainer>
        {ingredientOptions.map((ingredient, index) => (
          <Ingredient
            key={index}
            ingredient={ingredient}
            onSelect={handleIngredientSelect}

            onDragEnd={handleIngredientDrop} // Pass the new handler
            isSelected={selectedIngredient === ingredient}
          />
        ))}
      </IngredientsContainer>
    </MainLayoutContainer>
  );
};
