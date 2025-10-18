import { create } from 'zustand';
import { Sounds } from '../../components/types';
import { Sound } from '../../enums';

interface SoundStore {
  sounds: Sounds | null,
  setSounds: (sounds: Sounds) => void,
  playClick: () => void,
  playSuccess: () => void,
  playError: (volume?: number) => void,
  playNotification: () => void,
  playWarning: () => void,
  playMessage: () => void,
  playPop: () => void,
  playBell: () => void,
}

const playSound = async (sound: HTMLAudioElement | undefined, volume = 0.3) => {
  if (sound) {
    sound.volume = volume;
    sound.currentTime = 0;
    await sound.play();
  }
};

export const useSoundStore = create<SoundStore>((set, getState) => ({
  sounds: null,
  setSounds: (sounds) => set({ sounds }),
  playClick: () => playSound(getState().sounds?.[Sound.CLICK], 0.1),
  playSuccess: () => playSound(getState().sounds?.[Sound.SUCCESS], 0.1),
  playError: () => playSound(getState().sounds?.[Sound.ERROR]),
  playNotification: () => playSound(getState().sounds?.[Sound.NOTIFICATION]),
  playWarning: () => playSound(getState().sounds?.[Sound.WARNING]),
  playMessage: () => playSound(getState().sounds?.[Sound.MESSAGE]),
  playPop: () => playSound(getState().sounds?.[Sound.POP]),
  playBell: () => playSound(getState().sounds?.[Sound.BELL]),
}));
