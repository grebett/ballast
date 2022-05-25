import { useEffect, useState } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

import {
  endSounds,
  endAllSounds,
  playSounds,
  disableAudio,
  enableAudio,
  endAllSoundsImmediately,
} from '../services/sounds';
import { Sound } from '../models/sound';

export enum READING_DIRECTIONS {
  INITIAL,
  FORWARD,
  BACKWARD,
}

export const SoundService = ({
  sounds,
  ends,
  readingDirection,
}: {
  sounds: Sound[];
  ends: number[];
  readingDirection: READING_DIRECTIONS;
}) => {
  const [audioEnabled, setAudioState] = useState<boolean>(true);

  useEffect(() => {
    const playSoundAsync = async () => {
      if (audioEnabled) {
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
      }
    };
    playSoundAsync();
  }, [sounds, ends]);

  return (
    <Button
      title={audioEnabled ? 'Couper le son' : 'Réactiver le son'}
      onPress={async () =>
        audioEnabled
          ? await endAllSoundsImmediately().then(async () => {
              await disableAudio();
              setAudioState(false);
            })
          : await enableAudio().then(async () => {
              await playSounds(sounds, true);
              setAudioState(true);
            })
      }
    ></Button>
  );
};
