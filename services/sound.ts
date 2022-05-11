import { Audio } from 'expo-av';
import { easeInOutSine } from '../utils/easings';

const fadeOut = (sound: Audio.Sound, duration: number) => {
  const INTERVAL_MS = 50;
  const invocations = Math.floor(duration / INTERVAL_MS);
  let refVolume = 1;
  const volumeStep = refVolume / invocations;
  const interval = setInterval(() => {
    refVolume = refVolume - volumeStep;
    const easedVolume = easeInOutSine(refVolume); // we may need other easings there (depending on taste!)
    sound.setVolumeAsync(easedVolume);
    console.log(refVolume, easedVolume);
    if (refVolume <= 0) {
      clearInterval(interval);
    }
  }, INTERVAL_MS);
};

export const playSound = async () => {
  console.log('💿 Loading Sound');
  const { sound } = await Audio.Sound.createAsync({
    uri: 'https://filesamples.com/samples/audio/mp3/sample4.mp3',
  });
  console.log('💿 Playing Sound');
  await sound.playAsync();
  return sound;
};

export const fadeOutSound = (sound: Audio.Sound) => {
  fadeOut(sound, 1000);
  return sound;
};

export const unloadSound = (sound: Audio.Sound) => {
  console.log('💿 Unloading Sound');
  sound.unloadAsync();
  return sound;
};
