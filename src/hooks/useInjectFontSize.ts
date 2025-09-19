import { ProfileSetting } from '@juki-team/commons';
import { useEffect } from 'react';
import { useUserStore } from '../stores/user/useUserStore';

export const useInjectFontSize = (fontSize?: number) => {
  
  const userPreferredFontSize = useUserStore(state => state.user.settings?.[ProfileSetting.FONT_SIZE]);
  
  useEffect(() => {
    document.querySelector('body')?.style.removeProperty('--base-text-size');
    document.querySelector('body')?.style.setProperty('--base-text-size', `${fontSize ?? userPreferredFontSize}px`);
    
    return () => {
      document.querySelector('body')?.style.removeProperty('--base-text-size');
      document.querySelector('body')?.style.setProperty('--base-text-size', `${userPreferredFontSize}px`);
    };
  }, [ userPreferredFontSize, fontSize ]);
};
