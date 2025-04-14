import { PropsWithChildren, useEffect } from 'react';
import { useSoundStore } from '../../../stores/sound/useSoundStore';
import { Sound } from '../../../types';

export function SoundProvider({ children }: PropsWithChildren<{}>) {
  
  const setSounds = useSoundStore(state => state.setSounds);
  useEffect(() => {
    setSounds({
      [Sound.CLICK]: new Audio('https://files.juki.pub/sounds/click.wav'),
      [Sound.SUCCESS]: new Audio('https://files.juki.pub/sounds/success.mp3'),
      [Sound.ERROR]: new Audio('https://files.juki.pub/sounds/trim-error.mp3'),
      [Sound.NOTIFICATION]: new Audio('https://files.juki.pub/sounds/notification.wav'),
      [Sound.WARNING]: new Audio('https://files.juki.pub/sounds/warning.mp3'),
      [Sound.MESSAGE]: new Audio('https://files.juki.pub/sounds/message.mp3'),
      [Sound.POP]: new Audio('https://files.juki.pub/sounds/pop.wav'),
      [Sound.BELL]: new Audio('https://files.juki.pub/sounds/bell.mp3'),
    });
  }, [ setSounds ]);
  
  return children;
}
