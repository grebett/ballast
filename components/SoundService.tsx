import { useEffect, useState } from 'react';
import { StyleSheet, Button, View } from 'react-native';

import {
  endSounds,
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

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
  }
});

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
        switch (readingDirection) {
          case READING_DIRECTIONS.BACKWARD: {
            await endAllSoundsImmediately();
            // TODO: play the sounds when they were stopped and no more simply at the current part
            playSounds(sounds, { playParts: true });
            return;
          }
          case READING_DIRECTIONS.FORWARD: {
            endSounds(ends);
            playSounds(sounds, { playParts: false });
            return;
          }
          default: {
            playSounds(sounds, { playParts: true });
          }
        }
      }
    };
    playSoundAsync();
  }, [sounds, ends]);

  return (
    <View style={styles.button}>
      <Button
        title={audioEnabled ? 'Couper le son' : 'Réactiver le son'}
        onPress={async () =>
          audioEnabled
            ? await endAllSoundsImmediately().then(async () => {
                await disableAudio();
                setAudioState(false);
              })
            : await enableAudio().then(async () => {
                await playSounds(sounds, { playParts: true });
                setAudioState(true);
              })
        }
      ></Button>
    </View>
  );
};
