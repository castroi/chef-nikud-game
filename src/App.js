import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GameBoard } from './components/Game/GameBoard';
import levelsData from './data/levels.json';
import recipesData from './data/recipes.json';

// Import Alef font with Hebrew support
// Download this CSS file from Google Fonts
const GlobalStyle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap');
  
  direction: rtl;
  font-family: 'Alef', sans-serif;
  background-color: #f9f3e5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;

  @media (max-width: 768px) {
    font-size: 14px; /* Smaller base font size for mobile */
    /* Add any other global mobile-specific styles here */
  }

  @media (max-width: 480px) {
    font-size: 12px; /* Even smaller base font size for small mobile */
  }
`;

const Header = styled.header`
  width: 100%;
  background-color: #ff6b6b;
  padding: 1rem 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: white;
    font-size: 2.5rem;
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 0; /* Slightly less padding on mobile */
    h1 {
      font-size: 1.8rem; /* Smaller font size for header on mobile */
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0; /* Even less padding */
    h1 {
      font-size: 1.5rem; /* Even smaller font size for header */
    }
  }
`;

const GameContainer = styled.main`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    width: 95%; /* Take up more width on smaller screens */
    padding: 1rem; /* Reduced padding for mobile */
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    width: 98%; /* Take up even more width */
    padding: 0.8rem; /* Further reduced padding */
    margin-bottom: 0.8rem;
  }
`;

const LevelSelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  
  h2 {
    margin-bottom: 1.5rem;
    color: #ff6b6b;
  }
  
  .levels {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  
  button {
    background-color: #ffd166;
    border: none;
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #333;
    font-family: 'Alef', sans-serif;
    
    &:hover {
      transform: scale(1.1);
      background-color: #ffbc00;
    }
    
    &.active {
      background-color: #06d6a0;
      color: white;
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.2rem; /* Smaller heading on mobile */
      margin-bottom: 1rem;
    }
    .levels {
      gap: 0.5rem; /* Smaller gap between buttons */
    }
    button {
      width: 3rem; /* Smaller buttons on mobile */
      height: 3rem;
      font-size: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1rem; /* Even smaller heading on very small mobile */
      margin-bottom: 0.8rem;
    }
    .levels {
      gap: 0.3rem; /* Even smaller gap between buttons */
    }
    button {
      width: 2.5rem; /* Even smaller buttons on very small mobile */
      height: 2.5rem;
      font-size: 1rem;
    }
  }
`;

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentRecipe, setCurrentRecipe] = useState(null);

  useEffect(() => {
    // When the level changes, get the appropriate recipe
    const recipe = recipesData.find(r => r.level === currentLevel);
    setCurrentRecipe(recipe);
  }, [currentLevel]);

  const selectLevel = (level) => {
    setCurrentLevel(level);
  };

  return (
    <GlobalStyle>
      <Header>
        <h1>שף הניקוד 🧑‍🍳</h1>
      </Header>

      <GameContainer>
        <LevelSelect>
          <h2>בחר רמה</h2>
          <div className="levels">
            {levelsData.slice(0, 5).map((level) => (
              <button
                key={level.id}
                className={currentLevel === level.id ? 'active' : ''}
                onClick={() => selectLevel(level.id)}
              >
                {level.id}
              </button>
            ))}
          </div>
        </LevelSelect>

        {currentRecipe && (
          <GameBoard 
            level={currentLevel}
            recipe={currentRecipe}
            levelData={levelsData.find(l => l.id === currentLevel)}
          />
        )}
      </GameContainer>
    </GlobalStyle>
  );
}

export default App;
