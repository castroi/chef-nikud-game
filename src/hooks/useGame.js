import { useState, useEffect } from 'react';

// Hook for managing game logic
export const useGame = (level, recipe) => {
  const [currentIngredientIndex, setCurrentIngredientIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [newPoints, setNewPoints] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [gameMessage, setGameMessage] = useState("");
  
  // Define points for correct answers according to difficulty level
  const pointsMap = {
    'קל': 10,
    'בינוני': 15,
    'מתקדם': 20,
    'מומחה': 30
  };
  
  // Reset the game when the level or recipe changes
  useEffect(() => {
    if (recipe) {
      setCurrentIngredientIndex(0);
      setScore(0);
      setNewPoints(0);
      setIsComplete(false);
      setGameMessage(`בואו נכין ${recipe.name}! מצא את ${recipe.ingredients[0].name}`);
    }
  }, [level, recipe]);
  
  // Update current ingredient
  const moveToNextIngredient = () => {
    if (currentIngredientIndex < recipe.ingredients.length - 1) {
      const nextIndex = currentIngredientIndex + 1;
      setCurrentIngredientIndex(nextIndex);
      setGameMessage(`מצוין! עכשיו מצא את ${recipe.ingredients[nextIndex].name}`);
      return false; // Not finished yet
    } else {
      setGameMessage("הידד! סיימת להכין את המתכון! 🍲");
      setIsComplete(true);
      return true; // Recipe completed
    }
  };
  
  // Handle correct answer
  const handleCorrectAnswer = (difficulty) => {
    // Calculate points
    const points = pointsMap[difficulty] || 10;
    setNewPoints(points);
    setScore(prevScore => prevScore + points);
    
    // Positive reinforcement message
    setGameMessage("כל הכבוד! 🎉");
    
    // After a short delay, move to next ingredient
    return new Promise(resolve => {
      setTimeout(() => {
        const isCompleted = moveToNextIngredient();
        resolve(isCompleted);
      }, 1500);
    });
  };
  
  // Handle wrong answer
  const handleWrongAnswer = () => {
    setGameMessage("זה לא מה שאנחנו מחפשים, בוא ננסה שוב! 😊");
    
    // After a short delay, return to the original message
    return new Promise(resolve => {
      setTimeout(() => {
        setGameMessage(`בואו נכין ${recipe.name}! מצא את ${recipe.ingredients[currentIngredientIndex].name}`);
        resolve(false);
      }, 1500);
    });
  };
  
  return {
    currentIngredientIndex,
    currentIngredient: recipe?.ingredients[currentIngredientIndex],
    score,
    newPoints,
    isComplete,
    gameMessage,
    handleCorrectAnswer,
    handleWrongAnswer,
    resetNewPoints: () => setNewPoints(0)
  };
};
