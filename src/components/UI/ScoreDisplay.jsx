import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ScoreContainer = styled.div`
  background-color: #ffd166;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 200px;
  margin: 0 auto;
`;

const ScoreTitle = styled.h3`
  margin: 0;
  color: white;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ScoreValue = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff6b6b;
`;

export const ScoreDisplay = ({ score, newPoints = 0 }) => {
  return (
    <ScoreContainer>
      <ScoreTitle>ניקוד</ScoreTitle>
      <ScoreValue
        key={score} // To reinitialize the animation when the score changes
        initial={{ scale: 1 }}
        animate={newPoints > 0 ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        {score}
        {newPoints > 0 && <span style={{ fontSize: '1rem', color: 'green' }}> +{newPoints}</span>}
      </ScoreValue>
    </ScoreContainer>
  );
};
