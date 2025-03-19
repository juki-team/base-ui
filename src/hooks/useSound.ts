import { useContext, useMemo } from 'react';
import { SoundContext } from '../components/organisms/Notifications/context';
import { Sound } from '../types';

export const useSound = () => {
  
  const { sounds } = useContext(SoundContext);
  
  return useMemo(() => ({
    playClick: () => {
      if (sounds?.[Sound.CLICK]) {
        sounds[Sound.CLICK].volume = 0.1;
        sounds[Sound.CLICK].currentTime = 0;
        sounds[Sound.CLICK].play();
      }
    },
    playSuccess: () => {
      if (sounds?.[Sound.SUCCESS]) {
        sounds[Sound.SUCCESS].volume = 0.4;
        sounds[Sound.SUCCESS].currentTime = 0;
        sounds[Sound.SUCCESS].play();
      }
    },
    playError: (volume = 0.4) => {
      if (sounds?.[Sound.ERROR]) {
        sounds[Sound.ERROR].volume = volume;
        sounds[Sound.ERROR].currentTime = 0;
        sounds[Sound.ERROR].play();
      }
    },
    playNotification: () => {
      if (sounds?.[Sound.NOTIFICATION]) {
        sounds[Sound.NOTIFICATION].volume = 0.4;
        sounds[Sound.NOTIFICATION].currentTime = 0;
        sounds[Sound.NOTIFICATION].play();
      }
    },
    playWarning: () => {
      if (sounds?.[Sound.WARNING]) {
        sounds[Sound.WARNING].volume = 0.4;
        sounds[Sound.WARNING].currentTime = 0;
        sounds[Sound.WARNING].play();
      }
    },
    playMessage: () => {
      if (sounds?.[Sound.MESSAGE]) {
        sounds[Sound.MESSAGE].volume = 0.4;
        sounds[Sound.MESSAGE].currentTime = 0;
        sounds[Sound.MESSAGE].play();
      }
    },
    playPop: () => {
      if (sounds?.[Sound.POP]) {
        sounds[Sound.POP].volume = 0.4;
        sounds[Sound.POP].currentTime = 0;
        sounds[Sound.POP].play();
      }
    },
    playBell: () => {
      if (sounds?.[Sound.BELL]) {
        sounds[Sound.BELL].volume = 0.4;
        sounds[Sound.BELL].currentTime = 0;
        sounds[Sound.BELL].play();
      }
    },
  }), [ sounds ]);
};
