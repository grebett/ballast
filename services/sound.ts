import { Audio, AVPlaybackStatus } from 'expo-av';
import { easeInOutSine } from '../utils/easings';

export type ExpoSoundInstance = Audio.Sound;

const fadeOut = (sound: Audio.Sound, duration: number) => {
  const INTERVAL_MS = 50;
  const invocations = Math.floor(duration / INTERVAL_MS);
  let refVolume = 1;
  const volumeStep = refVolume / invocations;
  const interval = setInterval(() => {
    refVolume = refVolume - volumeStep;
    const easedVolume = easeInOutSine(refVolume); // we may need other easings there (depending on taste!)
    sound.setVolumeAsync(easedVolume);
    if (refVolume <= 0) {
      clearInterval(interval);
      console.log('💿 Stopping Sound');
      sound.stopAsync();
      console.log('💿 Unloading Sound');
      sound.unloadAsync();
    }
  }, INTERVAL_MS);
};

const unloadSound = (sound: Audio.Sound, onUnload: () => void) => {
  console.log('💿 Unloading Sound');
  sound.unloadAsync();
  onUnload();
  return sound;
};

export const playSound = async (source: string, onUnload: () => void) => {
  console.log('💿 Loading Sound');
  const { sound } = await Audio.Sound.createAsync({
    uri: source,
  }, {}, (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      unloadSound(sound, onUnload);
    }
  });
  console.log('💿 Playing Sound');
  await sound.playAsync();
  return sound;
};

export const fadeOutSound = (sound: Audio.Sound, duration = 1000) => {
  console.log('💿 Fading out Sound');
  fadeOut(sound, duration);
  return sound;
};

