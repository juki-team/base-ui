import { ProfileSetting } from '@juki-team/commons';
import { useEffect } from 'react';
import { useUserStore } from '../../stores/user/useUserStore';

export const useInjectCompanyStyles = () => {
  
  const userPreferredTheme = useUserStore(state => state.user.settings?.[ProfileSetting.THEME]);
  const companyStyles = useUserStore(store => store.company?.styles);
  
  useEffect(() => {
    document.querySelector('body')?.style.removeProperty('--body-tx-cr');
    document.querySelector('body')?.style.removeProperty('--body-tx-cr-ht');
    document.querySelector('body')?.style.removeProperty('--body-tx-cr-ht-it');
    document.querySelector('body')?.style.removeProperty('--body-bd-cr');
    document.querySelector('body')?.style.removeProperty('--body-bd-cr-ht');
    document.querySelector('body')?.style.removeProperty('--body-at-cr');
    document.querySelector('body')?.style.removeProperty('--navbar-tx-cr');
    document.querySelector('body')?.style.removeProperty('--navbar-bd-cr');
    document.querySelector('body')?.style.removeProperty('--navbar-at-cr');
    
    if (companyStyles?.[userPreferredTheme]?.body?.textColor) {
      document.querySelector('body')?.style.setProperty('--body-tx-cr', companyStyles?.[userPreferredTheme]?.body?.textColor);
    }
    if (companyStyles?.[userPreferredTheme]?.body?.textColorHighlight) {
      document.querySelector('body')?.style.setProperty('--body-tx-cr-ht', companyStyles?.[userPreferredTheme]?.body?.textColorHighlight);
    }
    if (companyStyles?.[userPreferredTheme]?.body?.textColorHighlightInset) {
      document.querySelector('body')?.style.setProperty('--body-tx-cr-ht-it', companyStyles?.[userPreferredTheme]?.body?.textColorHighlightInset);
    }
    if (companyStyles?.[userPreferredTheme]?.body?.backgroundColor) {
      document.querySelector('body')?.style.setProperty('--body-bd-cr', companyStyles?.[userPreferredTheme]?.body?.backgroundColor);
    }
    if (companyStyles?.[userPreferredTheme]?.body?.backgroundColorHighlight) {
      document.querySelector('body')?.style.setProperty('--body-bd-cr-ht', companyStyles?.[userPreferredTheme]?.body?.backgroundColorHighlight);
    }
    if (companyStyles?.[userPreferredTheme]?.body?.accentColor) {
      document.querySelector('body')?.style.setProperty('--body-at-cr', companyStyles?.[userPreferredTheme]?.body?.accentColor);
    }
    if (companyStyles?.[userPreferredTheme]?.body?.accentColorInset) {
      document.querySelector('body')?.style.setProperty('--body-at-cr-it', companyStyles?.[userPreferredTheme]?.body?.accentColorInset);
    }
    
    if (companyStyles?.[userPreferredTheme]?.navbar?.textColor) {
      document.querySelector('body')?.style.setProperty('--navbar-tx-cr', companyStyles?.[userPreferredTheme]?.navbar?.textColor);
    }
    if (companyStyles?.[userPreferredTheme]?.navbar?.backgroundColor) {
      document.querySelector('body')?.style.setProperty('--navbar-bd-cr', companyStyles?.[userPreferredTheme]?.navbar?.backgroundColor);
    }
    if (companyStyles?.[userPreferredTheme]?.navbar?.accentColor) {
      document.querySelector('body')?.style.setProperty('--navbar-at-cr', companyStyles?.[userPreferredTheme]?.navbar?.accentColor);
    }
    
    return () => {
      document.querySelector('body')?.style.removeProperty('--body-tx-cr');
      document.querySelector('body')?.style.removeProperty('--body-tx-cr-ht');
      document.querySelector('body')?.style.removeProperty('--body-tx-cr-ht-it');
      document.querySelector('body')?.style.removeProperty('--body-bd-cr');
      document.querySelector('body')?.style.removeProperty('--body-bd-cr-ht');
      document.querySelector('body')?.style.removeProperty('--body-at-cr');
      document.querySelector('body')?.style.removeProperty('--navbar-tx-cr');
      document.querySelector('body')?.style.removeProperty('--navbar-bd-cr');
      document.querySelector('body')?.style.removeProperty('--navbar-at-cr');
    };
  }, [ companyStyles, userPreferredTheme ]);
};
