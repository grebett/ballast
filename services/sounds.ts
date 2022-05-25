import { Audio, AVPlaybackStatus } from 'expo-av';
import { easeInOutSine } from '../utils/easings';
import { Sound } from '../models/sound';

/**********
/* DEBUG
***********/
const __DEBUG = true;
const __soundToString = (sound: Sound, more = false) =>
  more
    ? `${sound.description} (DU: ${sound.duration} / ST: ${sound.start} / DL: ${sound.delay})`
    : sound.description;
const __DEBUG_FORMAT_SOUNDS = (sounds: Sound[] | Sound) =>
  sounds instanceof Array
    ? sounds.map((sound) => __soundToString(sound)).join(', ')
    : __soundToString(sounds as unknown as Sound);

/**********
/* CONSTS
***********/
const FADE_OUT_MS = 800;

/**********
/* SOUNDMAP
***********/
const soundsMap = new Map<number, Audio.Sound>();

/**********
/* UTILS
***********/
const fadeOut = async (sound: Audio.Sound, duration: number) => {
  const INTERVAL_MS = 50;
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

const playSound = (sound: Sound, loadedSound: Audio.Sound) => {
  __DEBUG && console.log('▶️ Playing sound:', __DEBUG_FORMAT_SOUNDS(sound));
  if (sound.start > 0) {
    loadedSound.setPositionAsync(sound.start);
  }
  loadedSound.playAsync();
  soundsMap.set(sound.id, loadedSound);
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
      const sound = soundsMap.get(soundId);
      if (sound) {
        // first delete async the sound from the soundmap (so that we can play it again while it fades)
        // NOTE: if we want to change that behaviour, put this in sync somewhere
        soundsMap.delete(soundId);

        // then fadeout the currently playing sound
        if (fadeout) {
          await fadeOut(sound, FADE_OUT_MS);
        }
        await stopAndUnloadSound(sound, soundId);
      }
    })
  );

export const endAllSoundsImmediately = async () => {
  __DEBUG && console.log('⏹ Ending all currently playing sounds immediately (with no fadeout');
  await endSounds(Array.from(soundsMap.keys()), false);
};

export const disableAudio = async () => await Audio.setIsEnabledAsync(false);
export const enableAudio = async () => await Audio.setIsEnabledAsync(true);

export const playSounds = async (sounds: Sound[], options = { playParts: false }) => {
  // 1) No Dupes (or we could stop the previous one and launch a new one in the data, but cumbersome?)
  sounds = sounds.filter((sound) => soundsMap.get(sound.id) === undefined);

  // 2) Don't play the parts of a multipart sound
  if (options.playParts === false) {
    sounds = sounds.filter(
      (sound) =>
        sound.multipart === false ||
        (sound.multipart === true && sound.start === 0)
    );
  }

  // 3) Load and play new sounds
  __DEBUG && console.log('💿 Currently playing sounds:', dumpSoundsMap());
  __DEBUG &&
    console.log(
      '⬆️ Loading sound:',
      sounds.map((sound) => sound.description).toString()
    );

  try {
    sounds.forEach(async (sound) => {
      const { sound: loadedSound } = await Audio.Sound.createAsync(
        {
          uri: sound.sources.main,
        },
        {},
        (status: AVPlaybackStatus) => {
          if (status.isLoaded && status.didJustFinish) {
            __DEBUG &&
              console.log('⬇️ Unloading sound:', __DEBUG_FORMAT_SOUNDS(sound));
            loadedSound.unloadAsync();
            soundsMap.delete(sound.id);
          }
        }
      );
      if (sound.delay > 0) {
        setTimeout(() => playSound(sound, loadedSound), sound.delay);
      } else {
        playSound(sound, loadedSound);
      }
      return loadedSound;
    });
  } catch (e) {
    console.error(e);
  }
};

export const dumpSoundsMap = () => Array.from(soundsMap.keys());
