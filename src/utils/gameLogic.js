// Helper functions for operating the game logic

// Function that shuffles an array (Fisher-Yates algorithm)
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Creates random scoring options for the game
export const generateNikudOptions = (correctNikud, count = 4) => {
  const allNikudOptions = [
    'קמץ',
    'פתח',
    'צירה',
    'סגול',
    'חולם',
    'חיריק',
    'שורוק',
    'קובוץ',
    'שווא',
    'חטף פתח',
    'חטף סגול',
    'חטף קמץ',
    'דגש קל',
    'דגש חזק'
  ];
  
  // Filters out the correct scoring option from the possibilities
  const availableOptions = allNikudOptions.filter(nikud => nikud !== correctNikud);
  
  // Shuffles the remaining options and selects the required amount
  const shuffled = shuffleArray(availableOptions);
  const wrongOptions = shuffled.slice(0, count - 1);
  
  // Returns all options, including the correct one, shuffled
  return shuffleArray([correctNikud, ...wrongOptions]);
};

// Function that returns a suitable emoji for an ingredient based on the image file name
export const getIngredientEmoji = (imageName) => {
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
    'sugar.png': '🍚',
    'egg.png': '🥚',
    'water.png': '💧',
    'yeast.png': '🍞'
  };
  
  return emojiMap[imageName] || '🍲';
};

// Checks if the answer is correct
export const checkAnswer = (selectedOption, correctOption) => {
  return selectedOption === correctOption;
};

// Returns a random feedback message for a correct answer
export const getCorrectFeedback = () => {
  const messages = [
    "כל הכבוד! 🎉",
    "נהדר! 👏",
    "מצוין! ⭐",
    "יופי! 😊",
    "מדהים! 🌟",
    "נכון מאוד! 👍"
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

// Returns a random feedback message for an incorrect answer
export const getWrongFeedback = () => {
  const messages = [
    "זה לא מה שאנחנו מחפשים, בוא ננסה שוב! 😊",
    "לא בדיוק, נסה פעם נוספת! 🤔",
    "כמעט! נסה שוב! 😉",
    "לא, לא, זה לא הניקוד הנכון. 🔍",
    "המתכון לא צריך את זה עכשיו... 🧐"
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};
