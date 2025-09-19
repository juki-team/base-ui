import { ProfileSetting, Theme } from '@juki-team/commons';
import { useEffect } from 'react';
import { useUserStore } from '../stores/user/useUserStore';

export const useInjectTheme = (theme?: Theme) => {
  
  const userPreferredTheme = useUserStore(state => state.user.settings?.[ProfileSetting.THEME]);
  
  useEffect(() => {
    document.querySelector('body')?.classList.remove('jk-theme-dark');
    document.querySelector('body')?.classList.remove('jk-theme-light');
    if ((theme ?? userPreferredTheme) === Theme.DARK) {
      document.querySelector('body')?.classList.add('jk-theme-dark');
    } else {
      document.querySelector('body')?.classList.add('jk-theme-light');
    }
    return () => {
      document.querySelector('body')?.classList.remove('jk-theme-dark');
      document.querySelector('body')?.classList.remove('jk-theme-light');
      if (userPreferredTheme === Theme.DARK) {
        document.querySelector('body')?.classList.add('jk-theme-dark');
      } else {
        document.querySelector('body')?.classList.add('jk-theme-light');
      }
    };
  }, [ userPreferredTheme, theme ]);
};
