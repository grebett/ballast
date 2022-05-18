import { Audio, AVPlaybackStatus } from 'expo-av';
import { easeInOutSine } from '../utils/easings';
import { Sound as SoundData } from '../models/sound';

type Sounds = { [key: string]: SoundData & { instance?: Audio.Sound } };

const __DEBUG = false;
const FADE_OUT_MS = 800;

const soundsMap: Sounds = {};

const fadeOut = (
  sound: Audio.Sound,
  duration: number,
  deleteSoundInSoundsMap: () => void,
  soundSource?: string,
) => {
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
      __DEBUG && console.log('💿 Stopping sound :', soundSource);
      sound.stopAsync();
      __DEBUG && console.log('💿 Unloading sound :', soundSource);
      sound.unloadAsync();
      deleteSoundInSoundsMap();
    }
  }, INTERVAL_MS);
};

// const preventPlayIfAlreadyInSoundsMap = (soundData: SoundData) => {
//   if (soundsMap[soundData.source] !== undefined) {
//     return true;
//   }
//   return false;
// };

export const playSound = async (soundData: SoundData) => {
  // 1) No Dupes
  // if (preventPlayIfAlreadyInSoundsMap(soundData)) {
  //   return;
  // }

  // // 2) Fadeout other sounds of the same type if new sound is unique
  // if (soundData.unique === true) {
  //   // console.log('DUMP HERE BECAUSE UNIQUE', dumpSoundsMap());
  //   Object.entries(soundsMap)
  //     .filter(([, sound]) => sound.type === soundData.type)
  //     .forEach(([, sound]) => {
  //       if (sound.instance) {
  //         __DEBUG && console.log('💿 Fading out sound: ', sound.source);
  //         // QUESTION: what happens if user keep going back and forth?
  //         fadeOut(sound.instance, FADE_OUT_MS, () => {
  //           delete soundsMap[sound.source];
  //         }, sound.source);
  //       }
  //     });
  // }

  // // 3) Load and play new sound
  // __DEBUG && console.log('💿 Loading Sound', soundData);
  // const { sound } = await Audio.Sound.createAsync(
  //   {
  //     uri: soundData.source,
  //   },
  //   {},
  //   (status: AVPlaybackStatus) => {
  //     if (status.isLoaded && status.didJustFinish) {
  //       __DEBUG && console.log('💿 Unloading sound: ', soundData.source);
  //       sound.unloadAsync();
  //       delete soundsMap[soundData.source];
  //     }
  //   }
  // );
  // soundsMap[soundData.source] = { ...soundData, instance: sound };
  // __DEBUG && console.log('💿 Playing sound', soundData.source);
  // await sound.playAsync();
};

export const dumpSoundsMap = () => {
  const map = { ...soundsMap };
  for (let key in map) {
    delete map[key].instance;
  }
  return map;
};
