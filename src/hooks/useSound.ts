import { useEffect, useState } from 'react';

export enum Sound {
  CLICK,
  SUCCESS,
  ERROR,
  NOTIFICATION,
  WARNING,
  MESSAGE,
  POP,
  BELL,
}

export const useSound = () => {
  
  const [ sounds, setSounds ] = useState<{ [key in Sound]: HTMLAudioElement } | null>(null);
  useEffect(() => {
    setSounds({
      [Sound.CLICK]: new Audio('https://files.juki.pub/sounds/click.wav'),
      [Sound.SUCCESS]: new Audio('https://files.juki.pub/sounds/success.mp3'),
      [Sound.ERROR]: new Audio('https://files.juki.pub/sounds/error.mp3'),
      [Sound.NOTIFICATION]: new Audio('https://files.juki.pub/sounds/notification.wav'),
      [Sound.WARNING]: new Audio('https://files.juki.pub/sounds/warning.mp3'),
      [Sound.MESSAGE]: new Audio('https://files.juki.pub/sounds/message.mp3'),
      [Sound.POP]: new Audio('https://files.juki.pub/sounds/pop.wav'),
      [Sound.BELL]: new Audio('https://files.juki.pub/sounds/bell.mp3'),
    })
  }, []);
  
  return {
    playClick: () => sounds?.[Sound.CLICK].play(),
    playSuccess: () => sounds?.[Sound.SUCCESS].play(),
    playError: () => sounds?.[Sound.ERROR].play(),
    playNotification: () => sounds?.[Sound.NOTIFICATION].play(),
    playWarning: () => sounds?.[Sound.WARNING].play(),
    playMessage: () => sounds?.[Sound.MESSAGE].play(),
    playPop: () => sounds?.[Sound.POP].play(),
    playBell: () => sounds?.[Sound.BELL].play(),
  }
}
