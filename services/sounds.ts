import { Audio, AVPlaybackStatus } from 'expo-av';
import { easeInOutSine } from '../utils/easings';
import { Sound as SoundInfos } from '../models/sound';
import { delay } from 'react-native-reanimated/lib/types/lib/reanimated2/animation/delay';

type Sound = Omit<SoundInfos, 'parts'> & {
  parts: (SoundInfos['parts'][number] & {
    AVPlaybackObject: Audio.Sound;
    duration: number | undefined;
  })[];
};

/**********
/* DEBUG
***********/
const __DEBUG = true;
const __soundToString = (sound: SoundInfos, more = false) =>
  more ? `${sound.description} (DL: ${sound.delay})` : sound.description;
const __DEBUG_FORMAT_SOUNDS = (sounds: SoundInfos[] | SoundInfos) =>
  sounds instanceof Array
    ? sounds.map((sound) => __soundToString(sound)).join(', ')
    : __soundToString(sounds as unknown as SoundInfos);

/**********
/* CONSTS
***********/
const FADE_OUT_MS = 800;

/**********
/* SOUNDMAP
***********/
const soundsMap = new Map<number, Sound>();

/**********
/* UTILS
***********/
const fadeOut = async (sound: Audio.Sound, duration: number) => {
  const INTERVAL_MS = 10;
  const invocations = Math.floor(duration / INTERVAL_MS);
  let refVolume = 1;
  const volumeStep = refVolume / invocations;

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      refVolume = refVolume - volumeStep;
      const easedVolume = easeInOutSine(refVolume); // we may need other easings there (depending on taste!)
      sound.setVolumeAsync(easedVolume);
      if (refVolume <= 0) {
        clearInterval(interval);
        resolve(true);
      }
    }, INTERVAL_MS);
  });
};

const fadeIn = async (sound: Audio.Sound, duration: number) => {
  const INTERVAL_MS = 50;
  const invocations = Math.floor(duration / INTERVAL_MS);
  let refVolume = 0;
  const volumeStep = refVolume / invocations;

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      refVolume = refVolume + volumeStep;
      // const easedVolume = easeInOutSine(refVolume) * -1; // we may need other easings there (depending on taste!)
      sound.setVolumeAsync(refVolume);
      if (refVolume >= 1) {
        clearInterval(interval);
        resolve(true);
      }
    }, INTERVAL_MS);
  });
};

const playSound = (soundInfos: SoundInfos, sound: Audio.Sound) => {
  __DEBUG &&
    console.log('▶️ Playing sound:', __DEBUG_FORMAT_SOUNDS(soundInfos));
  // if (sound.start > 0) {
  //   sound.setPositionAsync(sound.start);
  // }
  sound.playAsync();
  // soundsMap.set(soundInfos.id, {infos: soundInfos, sound});
};

const stopAndUnloadSound = async (sound: Audio.Sound, soundId: number) => {
  // if we want more than id, store the sound description in map?
  __DEBUG && console.log('⏹ Stopping sound:', soundId);
  await sound.stopAsync();
  __DEBUG && console.log('⬇️ Unloading sound:', soundId);
  await sound.unloadAsync();
};

/**********
/* EXPORTS
***********/
export const endSounds = (ends: number[], fadeout = true) =>
  Promise.all(
    ends.map(async (soundId) => {
      // const stored = soundsMap.get(soundId);
      // if (stored) {
      //   // first delete async the sound from the soundmap (so that we can play it again while it fades)
      //   // NOTE: if we want to change that behaviour, put this in sync somewhere
      //   soundsMap.delete(soundId);

      //   // then fadeout the currently playing sound
      //   if (fadeout) {
      //     await fadeOut(stored.sound, FADE_OUT_MS);
      //   }
      //   await stopAndUnloadSound(stored.sound, soundId);
      // }
      return true;
    })
  );

export const endAllSoundsImmediately = async () => {
  __DEBUG &&
    console.log(
      '⏹ Ending all currently playing sounds immediately (with no fadeout'
    );
  await endSounds(Array.from(soundsMap.keys()), false);
};

export const disableAudio = async () => await Audio.setIsEnabledAsync(false);
export const enableAudio = async () => await Audio.setIsEnabledAsync(true);

const loadSound = async (soundInfos: SoundInfos) => {
  // 1) create AVPlaybackObject for all parts, attach PlaybackStatusUpdate, add part duration
  const loadedParts = await Promise.all(
    soundInfos.parts.map(async (part, i) => {
      const sound = new Audio.Sound();
      const AVPlaybackStatus = await sound.loadAsync({ uri: part.source });

      // PlaybackStatusUpdate (mainly use for cleaning)
      sound.setOnPlaybackStatusUpdate(async (status: AVPlaybackStatus) => {
        if (status.isLoaded && status.didJustFinish) {
          __DEBUG &&
            console.log(
              '⬇️ Unloading sound:',
              __DEBUG_FORMAT_SOUNDS(soundInfos),
              `part ${i}`,
            );
          sound.unloadAsync();
        }
      });

      return {
        ...part,
        AVPlaybackObject: sound,
        duration:
          AVPlaybackStatus.isLoaded === true
            ? AVPlaybackStatus.durationMillis
            : undefined,
      };
    })
  );

  // 2) save the created AVPlaybackObject in the sounds map alongside sounds infos
  soundsMap.set(soundInfos.id, {
    ...soundInfos,
    parts: loadedParts,
  });

  // 3) compute delays
  const delays = loadedParts.map((_, i) => {
    return loadedParts
      .slice(0, i + 1)
      .reduce((acc, part, i) => acc + ((part.duration || 0) - 2000), 0);
  });
  delays.unshift(0);
  delays.pop();

  // 4) launch timers for every parts when they should play
  loadedParts.forEach(async (part, i) => {
    setTimeout(() => {
      console.log('▶️ Playing sound:', __DEBUG_FORMAT_SOUNDS(soundInfos), `part ${i}`);
      part.AVPlaybackObject.playAsync();
    }, delays[i]);
  });
};

export const playSounds = async (sounds: SoundInfos[]) => {
  __DEBUG && console.log('💿 Currently playing sounds:', dumpSoundsMap());
  __DEBUG &&
    console.log(
      '⬆️ Loading sound:',
      sounds.map((sound) => sound.description).toString()
    );

  try {
    sounds.forEach(async (sound) => {
      const loadedSound = await loadSound(sound);
      return loadedSound;
    });
  } catch (e) {
    console.error(e);
  }
};

export const dumpSoundsMap = () => Array.from(soundsMap.keys());
