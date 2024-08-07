import { useContext } from 'react';
import { SoundContext } from '../components/organisms/Notifications/context';
import { Sound } from '../types';

export const useSound = () => {
  
  const { sounds } = useContext(SoundContext);
  
  return {
    playClick: () => sounds?.[Sound.CLICK].play(),
    playSuccess: () => sounds?.[Sound.SUCCESS].play(),
    playError: () => sounds?.[Sound.ERROR].play(),
    playNotification: () => sounds?.[Sound.NOTIFICATION].play(),
    playWarning: () => sounds?.[Sound.WARNING].play(),
    playMessage: () => sounds?.[Sound.MESSAGE].play(),
    playPop: () => sounds?.[Sound.POP].play(),
    playBell: () => sounds?.[Sound.BELL].play(),
  };
};
