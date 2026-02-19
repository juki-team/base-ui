import { ProfileSetting } from '@juki-team/commons';
import { useEffect } from 'react';
import { useUserStore } from '../../stores/user/useUserStore';

const CSS_PROPS = [
  '--body-tx-cr',
  '--body-tx-cr-ht',
  '--body-tx-cr-ht-it',
  '--body-bd-cr',
  '--body-bd-cr-ht',
  '--body-at-cr',
  '--body-at-cr-it',
  '--navbar-tx-cr',
  '--navbar-bd-cr',
  '--navbar-at-cr',
] as const;

export const useInjectCompanyStyles = () => {

  const userPreferredTheme = useUserStore(state => state.user.settings?.[ProfileSetting.THEME]);
  const companyStyles = useUserStore(store => store.company?.styles);

  useEffect(() => {
    const body = document.body;
    const set = (prop: string, value?: string) => {
      body.style.removeProperty(prop);
      if (value) {
        body.style.setProperty(prop, value);
      }
    };

    const theme = companyStyles?.[userPreferredTheme];
    set('--body-tx-cr', theme?.body?.textColor);
    set('--body-tx-cr-ht', theme?.body?.textColorHighlight);
    set('--body-tx-cr-ht-it', theme?.body?.textColorHighlightInset);
    set('--body-bd-cr', theme?.body?.backgroundColor);
    set('--body-bd-cr-ht', theme?.body?.backgroundColorHighlight);
    set('--body-at-cr', theme?.body?.accentColor);
    set('--body-at-cr-it', theme?.body?.accentColorInset);
    set('--navbar-tx-cr', theme?.navbar?.textColor);
    set('--navbar-bd-cr', theme?.navbar?.backgroundColor);
    set('--navbar-at-cr', theme?.navbar?.accentColor);

    return () => {
      CSS_PROPS.forEach(prop => body.style.removeProperty(prop));
    };
  }, [ companyStyles, userPreferredTheme ]);
};