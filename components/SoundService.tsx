import { useEffect } from 'react';
import { endSounds, endAllSounds, playSounds } from '../services/sounds';
import { Sound } from '../models/sound';

export enum READING_DIRECTIONS {
  INITIAL,
  FORWARD,
  BACKWARD,
};

export const SoundService = ({
  sounds,
  ends,
  readingDirection,
}: {
  sounds: Sound[];
  ends: number[];
  readingDirection: READING_DIRECTIONS;
}) => {
  useEffect(() => {
    const playSoundAsync = async () => {
      if (readingDirection === READING_DIRECTIONS.BACKWARD) {
        // end all the sounds
        await endAllSounds();
        // play all the sounds including the "part" ones from the starting point
        await playSounds(sounds, true);
      } else if (readingDirection === READING_DIRECTIONS.FORWARD) {
        // end only the previous sounds that should ened
        await endSounds(ends);
        // play all the sounds but the "part" ones
        await playSounds(sounds, false);
      } else {
        // on initial state, play all the sounds
        await playSounds(sounds, true);
      }
    };
    playSoundAsync();
  }, [sounds, ends]);

  return null;
};
