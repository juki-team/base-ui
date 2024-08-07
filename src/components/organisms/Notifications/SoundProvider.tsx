import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Sound } from '../../../types';
import { SoundContext } from './context';
import { Sounds } from './types';

export function SoundProvider({ children }: PropsWithChildren<{}>) {
  
  const [ sounds, setSounds ] = useState<Sounds | null>(null);
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
    });
  }, []);
  
  return (
    <SoundContext.Provider value={{ sounds }}>
      {children}
    </SoundContext.Provider>
  );
}
