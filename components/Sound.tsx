import { useEffect } from 'react';
import { playSound } from '../services/sound';
import { Sound as SoundData } from '../models/sound';

export const Sound = ({ data }: { data: SoundData }) => {
  useEffect(() => {
    const playSoundAsync = async () => {
      await playSound(data);
    };
    playSoundAsync();
  }, [data]);

  return null;
};
