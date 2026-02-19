import { ProfileSetting, Theme } from '@juki-team/commons';
import { useEffect } from 'react';
import { useUserStore } from '../../stores/user/useUserStore';

export const useInjectTheme = (theme?: Theme) => {
  
  const userPreferredTheme = useUserStore(state => state.user.settings?.[ProfileSetting.THEME]);
  
  useEffect(() => {
    document.body.classList.remove('jk-theme-dark');
    document.body.classList.remove('jk-theme-light');
    if ((theme ?? userPreferredTheme) === Theme.DARK) {
      document.body.classList.add('jk-theme-dark');
    } else {
      document.body.classList.add('jk-theme-light');
    }
    return () => {
      document.body.classList.remove('jk-theme-dark');
      document.body.classList.remove('jk-theme-light');
    };
  }, [ userPreferredTheme, theme ]);
};
