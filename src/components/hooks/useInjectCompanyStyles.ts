import { ProfileSetting } from '@juki-team/commons';
import { useEffect } from 'react';
import { useUserStore } from '../../stores/user/useUserStore';

export const useInjectCompanyStyles = () => {
  
  const userPreferredTheme = useUserStore(state => state.user.settings?.[ProfileSetting.THEME]);
  const companyStyles = useUserStore(store => store.company?.styles);
  
  useEffect(() => {
    document.querySelector('body')?.style.removeProperty('--cr-body');
    document.querySelector('body')?.style.removeProperty('--cr-ht-body');
    document.querySelector('body')?.style.removeProperty('--bc-body');
    document.querySelector('body')?.style.removeProperty('--bc-ht-body');
    document.querySelector('body')?.style.removeProperty('--cr-navbar');
    document.querySelector('body')?.style.removeProperty('--bc-navbar');
    
    if (companyStyles?.[userPreferredTheme]?.body?.color) {
      document.querySelector('body')?.style.setProperty('--cr-body', companyStyles?.[userPreferredTheme]?.body?.color);
    }
    if (companyStyles?.[userPreferredTheme]?.body?.colorHighlight) {
      document.querySelector('body')?.style.setProperty('--cr-ht-body', companyStyles?.[userPreferredTheme]?.body?.colorHighlight);
    }
    if (companyStyles?.[userPreferredTheme]?.body?.backgroundColor) {
      document.querySelector('body')?.style.setProperty('--bc-body', companyStyles?.[userPreferredTheme]?.body?.backgroundColor);
    }
    if (companyStyles?.[userPreferredTheme]?.body?.backgroundColorHighlight) {
      document.querySelector('body')?.style.setProperty('--bc-ht-body', companyStyles?.[userPreferredTheme]?.body?.backgroundColorHighlight);
    }
    
    if (companyStyles?.[userPreferredTheme]?.navbar?.color) {
      document.querySelector('body')?.style.setProperty('--cr-navbar', companyStyles?.[userPreferredTheme]?.navbar?.color);
    }
    if (companyStyles?.[userPreferredTheme]?.navbar?.backgroundColor) {
      document.querySelector('body')?.style.setProperty('--bc-navbar', companyStyles?.[userPreferredTheme]?.navbar?.backgroundColor);
    }
    
    return () => {
      document.querySelector('body')?.style.removeProperty('--cr-body');
      document.querySelector('body')?.style.removeProperty('--cr-ht-body');
      document.querySelector('body')?.style.removeProperty('--bc-body');
      document.querySelector('body')?.style.removeProperty('--bc-ht-body');
      document.querySelector('body')?.style.removeProperty('--cr-navbar');
      document.querySelector('body')?.style.removeProperty('--bc-navbar');
    };
  }, [ companyStyles, userPreferredTheme ]);
};
