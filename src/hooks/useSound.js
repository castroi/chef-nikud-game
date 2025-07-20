import { useEffect, useCallback } from 'react';

// Hook for managing game sounds
export const useSound = () => {
  // Check if browser supports audio
  const hasAudio = typeof Audio !== 'undefined';
  
  // Sounds organized by type
  const sounds = {
    correct: hasAudio ? new Audio() : null,
    wrong: hasAudio ? new Audio() : null,
    hover: hasAudio ? new Audio() : null,
    complete: hasAudio ? new Audio() : null,
    bubbles: hasAudio ? new Audio() : null
  };
  
  // Here we'll need to define the actual sound files
  useEffect(() => {
    if (hasAudio) {
      // We'll define the files when we have actual files
      // For example:
      // sounds.correct.src = "/assets/sounds/correct.mp3";
    }
  }, [hasAudio]);
  
  // Functions for playing sounds
  const playSound = useCallback((type) => {
    const sound = sounds[type];
    if (sound) {
      sound.currentTime = 0; // Start from the beginning
      
      // Attempt to play
      const playPromise = sound.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Failed to play sound:', error);
        });
      }
    }
  }, [sounds]);
  
  // Function to mute all sounds
  const stopAllSounds = useCallback(() => {
    Object.values(sounds).forEach(sound => {
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    });
  }, [sounds]);
  
  return {
    playCorrectSound: () => playSound('correct'),
    playWrongSound: () => playSound('wrong'),
    playHoverSound: () => playSound('hover'),
    playCompleteSound: () => playSound('complete'),
    playBubblesSound: () => playSound('bubbles'),
    stopAllSounds
  };
};
