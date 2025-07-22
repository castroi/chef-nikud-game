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
      <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '0.8em', color: '#555' }}>
        Version: 0.1.0 | <a href="https://github.com/castroi/chef-nikud-game" target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style={{ verticalAlign: 'middle' }}><path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg></a>
      </div>
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

      <footer>
        <p>שף הניקוד - משחק לתרגול ניקוד בעברית | כל הזכויות שמורות © {new Date().getFullYear()}</p>
      </footer>
    </GlobalStyle>
  );
}

export default App;
