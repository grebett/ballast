import { useEffect } from 'react';
import { playSound } from '../services/sound';
import { Sound } from '../models/sound';

export const SoundService = ({ sounds, ends }: { sounds: Sound[], ends: number[] }) => {
  useEffect(() => {
    const playSoundAsync = async () => {
      // await playSound(data);
      console.log(sounds, ends);
    };
    playSoundAsync();
  }, [sounds, ends]);

  return null;
};
