import { ProfileSetting } from '@juki-team/commons';
import { useEffect } from 'react';
import { useUserStore } from '../../stores/user/useUserStore';

export const useInjectFontSize = (fontSize?: number) => {
  
  const userPreferredFontSize = useUserStore(state => state.user.settings?.[ProfileSetting.FONT_SIZE]);
  
  useEffect(() => {
    document.querySelector('body')?.style.removeProperty('--tx-bs');
    document.querySelector('body')?.style.setProperty('--tx-bs', `${fontSize ?? userPreferredFontSize}px`);
    
    return () => {
      document.querySelector('body')?.style.removeProperty('--tx-bs');
    };
  }, [ userPreferredFontSize, fontSize ]);
};
