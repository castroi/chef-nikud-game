// Functions for managing the scoring system

// Scoring key by difficulty level
const BASE_POINTS = {
  'קל': 10,
  'בינוני': 15,
  'מתקדם': 20,
  'מומחה': 30
};

// Optimal execution time for each difficulty level (in seconds)
const OPTIMAL_TIME = {
  'קל': 5,
  'בינוני': 7,
  'מתקדם': 10,
  'מומחה': 15
};

// Calculating score with time bonus
export const calculateBaseScore = (difficulty) => {
  return BASE_POINTS[difficulty] || 10;
};

// Calculating score with time bonus
export const calculateScoreWithTimeBonus = (difficulty, timeSpentInSeconds) => {
  const basePoints = calculateBaseScore(difficulty);
  const optimalTime = OPTIMAL_TIME[difficulty] || 5;
  
  // If the player was faster than the optimal time, receives a bonus
  if (timeSpentInSeconds <= optimalTime) {
    return Math.round(basePoints * 1.5); // 50% 
  } 
  // If takes more than 3 times the optimal time, receives only the basic score
  else if (timeSpentInSeconds > optimalTime * 3) {
    return basePoints;
  } 
  // Otherwise, the score is gradually reduced as it takes more time
  else {
    const timeRatio = 1 - (timeSpentInSeconds - optimalTime) / (optimalTime * 2);
    return Math.round(basePoints * (1 + timeRatio * 0.5));
  }
};

// Calculating stars based on performance at the level
export const calculateStars = (score, maxPossibleScore) => {
  const percentage = (score / maxPossibleScore) * 100;
  
  if (percentage >= 90) {
    return 5; // Excellent
  } else if (percentage >= 75) {
    return 4; // Very Good
  } else if (percentage >= 60) {
    return 3; // Good
  } else if (percentage >= 40) {
    return 2; // Fair
  } else {
    return 1; // Sufficient
  }
};

// Calculating level score
export const calculateLevelScore = (correctAnswers, totalQuestions, avgTime, difficulty) => {
  const accuracyPercentage = (correctAnswers / totalQuestions) * 100;
  const baseScore = calculateBaseScore(difficulty) * totalQuestions;
  
  // Accuracy bonus
  let accuracyMultiplier = 1.0;
  if (accuracyPercentage >= 90) {
    accuracyMultiplier = 1.5; // 50% bonus for excellent accuracy
  } else if (accuracyPercentage >= 75) {
    accuracyMultiplier = 1.25; // 25% bonus for good accuracy
  }
  
  // Time bonus - using the existing function
  const optimalTime = OPTIMAL_TIME[difficulty] || 5;
  const timeRatio = optimalTime / avgTime;
  let timeMultiplier = Math.min(1.5, Math.max(1.0, timeRatio));
  
  // Final score
  return Math.round(baseScore * accuracyMultiplier * timeMultiplier);
};
