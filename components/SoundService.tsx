import { useEffect } from 'react';
import { endSounds, playSounds } from '../services/sounds';
import { Sound } from '../models/sound';

export const SoundService = ({ sounds, ends }: { sounds: Sound[], ends: number[] }) => {
  useEffect(() => {
    const playSoundAsync = async () => {
      await endSounds(ends);
      await playSounds(sounds);
    };
    playSoundAsync();
  }, [sounds, ends]);

  return null;
};
