import { useEffect, useState, useCallback } from 'react';
import { playSound, fadeOutSound, ExpoSoundInstance } from '../services/sound';
import { Sound as SoundData } from '../models/sound';

type Sound = SoundData & { instance: ExpoSoundInstance };

export const Sound = ({ data: soundData }: { data: SoundData }) => {
  const [currentSounds, setCurrentSounds] = useState<Sound[]>([]);

  const killSound = useCallback(() => {
    setCurrentSounds(
      currentSounds.filter(
        (currentSound) => currentSound.source !== soundData.source
      )
    );
  }, [currentSounds, soundData]);

  useEffect(() => {
    // DEBUG
    console.log(
      'currentSounds',
      currentSounds.map((currentSound) => currentSound.source)
    );
  }, [currentSounds]);

  useEffect(() => {
    const playSoundFirstThenStopOthers = async () => {
      // first we check if the sound is not currently already playing ; if so, we do nothing
      const alreadyExistingSound = currentSounds.find(
        (currentSound) => currentSound.source === soundData.source
      );
      if (alreadyExistingSound) {
        return null;
      }

      // alright? let's play the sound!
      const soundInstance = await playSound(soundData.source, killSound);

      if (soundData.unique === true) {
        const sameTypeSounds = currentSounds.filter(
          (currentSound) => currentSound.type === soundData.type
        );
        sameTypeSounds.forEach((sound) => {
          fadeOutSound(sound.instance);
        });
        setCurrentSounds(
          currentSounds.filter(
            (currentSound) => currentSound.type !== soundData.type
          )
        );
      }

      setCurrentSounds([
        ...currentSounds,
        { ...soundData, instance: soundInstance },
      ]);
    };

    playSoundFirstThenStopOthers();
  }, [soundData]);
  return null;
};
