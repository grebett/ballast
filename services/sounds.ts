import { Audio, AVPlaybackStatus } from 'expo-av';
import { easeInOutSine } from '../utils/easings';
import { Sound } from '../models/sound';

// DEBUG
const __DEBUG = true;
const __soundToString = (sound: Sound, more = false) =>
  more
    ? `${sound.description} (DU: ${sound.duration} / ST: ${sound.start} / DL: ${sound.delay})`
    : sound.description;
const __DEBUG_FORMAT_SOUNDS = (sounds: Sound[] | Sound) =>
  sounds instanceof Array
    ? sounds.map((sound) => __soundToString(sound)).join(', ')
    : __soundToString(sounds as unknown as Sound);

// CONSTS
const FADE_OUT_MS = 800;

const soundsMap = new Map<number, Audio.Sound>();

const fadeOut = (
  sound: Audio.Sound,
  duration: number,
  deleteSoundInSoundsMap: () => void,
  soundId: number
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
      __DEBUG && console.log('💿 Stopping sound:', soundId); // I could do more but it's not logic to add data just for debug...
      sound.stopAsync();
      __DEBUG && console.log('💿 Unloading sound:', soundId);
      sound.unloadAsync();
      deleteSoundInSoundsMap();
    }
  }, INTERVAL_MS);
};

const playSound = (sound: Sound, loadedSound: Audio.Sound) => {
  __DEBUG && console.log('💿 Playing sound:', __DEBUG_FORMAT_SOUNDS(sound));
  if (sound.start > 0) {
    loadedSound.setPositionAsync(sound.start);
  }
  loadedSound.playAsync();
  soundsMap.set(sound.id, loadedSound);
};

export const endSounds = (ends: number[]) => {
  ends.forEach((soundId) => {
    const sound = soundsMap.get(soundId);
    if (sound) {
      fadeOut(sound, FADE_OUT_MS, () => soundsMap.delete(soundId), soundId);
    }
  });
};

export const playSounds = async (sounds: Sound[]) => {
  // 1) No Dupes (or we could stop the previous one and launch a new one?)
  sounds = sounds.filter((sound) => soundsMap.get(sound.id) === undefined);

  // 2) Load and play new sound
  __DEBUG &&
    console.log(
      '💿 Loading sound:',
      sounds.map((sound) => sound.description).toString()
    );
  sounds.forEach(async (sound) => {
    const { sound: loadedSound } = await Audio.Sound.createAsync(
      {
        uri: sound.sources.main,
      },
      {},
      (status: AVPlaybackStatus) => {
        if (status.isLoaded && status.didJustFinish) {
          __DEBUG &&
            console.log('💿 Unloading sound:', __DEBUG_FORMAT_SOUNDS(sound));
          loadedSound.unloadAsync();
        }
      }
    );
    // 3) Play the song (with delay if needed)
    if (sound.delay > 0) {
      setTimeout(() => playSound(sound, loadedSound), sound.delay);
    } else {
      playSound(sound, loadedSound);
    }
    return loadedSound;
  });
};

export const dumpSoundsMap = () => {
  console.log(soundsMap);
};
