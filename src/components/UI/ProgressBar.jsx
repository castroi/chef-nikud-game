import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProgressBarContainer = styled.div`
  width: 80%;
  height: 30px;
  background-color: #f0f0f0;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #ffd166 0%, #06d6a0 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressText = styled.span`
  color: white;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const StarContainer = styled.div`
  display: hidden;
  justify-content: center;
  margin-top: 10px;
`;

const Star = styled(motion.span)`
  font-size: 2rem;
  margin: 0 5px;
  color: ${props => props.active ? '#ffd166' : '#e0e0e0'};
`;

export const ProgressBar = ({ progress }) => {
  // חישוב כמה כוכבים להציג לפי ההתקדמות
  const starsCount = Math.floor((progress / 100) * 5);
  
  return (
    <div>
      <ProgressBarContainer>
        <ProgressFill
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        >
          <ProgressText>{progress}%</ProgressText>
        </ProgressFill>
      </ProgressBarContainer>
      
    </div>
  );
};
