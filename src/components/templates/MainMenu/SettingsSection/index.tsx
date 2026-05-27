import { Language, ProfileSetting, Theme } from '@juki-team/commons/enums';
import type { Dispatch, KeyboardEventHandler, ReactNode, SyntheticEvent } from 'react';
import { usePageStore } from '../../../../stores/page/usePageStore';
import { useUIStore } from '../../../../stores/ui/useUIStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { Div } from '../../../atoms/Div/Div';
import { Modal } from '../../../atoms/Modal/Modal';
import { T } from '../../../atoms/T/T';
import { Popover } from '../../../atoms/_lazy_/Popover';
import { SpinIcon } from '../../../atoms/server/icons/SpinIcon';
import { AppsIcon } from '../../../atoms/server/icons/google/AppsIcon';
import { HelpIcon } from '../../../atoms/server/icons/google/HelpIcon';
import { LoadingIcon } from '../../../atoms/server/icons/google/LoadingIcon';
import { classNames } from '../../../helpers/commons';
import { useJukiUserSettings } from '../../../hooks/useJukiUser';
import { HelpSection } from '../../HelpSection/HelpSection';

export const LanguageSetting = ({
  isOpen,
  popoverPlacement,
}: {
  isOpen: boolean;
  small: boolean;
  popoverPlacement: 'top' | 'bottom' | 'right';
}) => {
  const { loading, setSettings, [ProfileSetting.LANGUAGE]: preferredLanguage } = useJukiUserSettings();
  const { Image } = useUIStore((store) => store.components);

  const isEs = preferredLanguage === Language.ES;

  return (
    <Div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={isEs ? 'switch to english' : 'cambiar a español'}
      data-tooltip-place={popoverPlacement}
      className={classNames('jk-row gap center extend', { 'cr-pr': !loading })}
      onClick={
        loading
          ? undefined
          : () =>
              setSettings([
                {
                  key: ProfileSetting.LANGUAGE,
                  value: preferredLanguage === Language.EN ? Language.ES : Language.EN,
                },
              ])
      }
      onKeyDownClick
    >
      {loading ? (
        <LoadingIcon />
      ) : isEs ? (
        <div className="jk-row pn-re" style={{ width: 24, height: 24 }}>
          <Image alt="ES image" width={24} height={24} src="https://images.juki.pub/assets/image-es.png" />
        </div>
      ) : (
        <div className="jk-row pn-re" style={{ width: 24, height: 24 }}>
          <Image alt="US image" width={24} height={24} src="https://images.juki.pub/assets/image-us.png" />
        </div>
      )}
      {isOpen && (
        <div className="flex-1 ta-lt">
          <T className="tt-se">{isEs ? 'español' : 'english'}</T>
        </div>
      )}
    </Div>
  );
};

export const ThemeSetting = ({
  isOpen,
  popoverPlacement,
}: {
  isOpen: boolean;
  small: boolean;
  popoverPlacement: 'top' | 'bottom' | 'right';
}) => {
  const { loading, setSettings, [ProfileSetting.THEME]: preferredTheme } = useJukiUserSettings();

  const isDark = preferredTheme === Theme.DARK;

  const changeThemeAndToggle = loading
    ? undefined
    : (event?: SyntheticEvent) => {
        event?.stopPropagation();
        event?.preventDefault();
        void setSettings([
          {
            key: ProfileSetting.THEME,
            value: preferredTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
          },
        ]);
      };

  const handleKeypress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code === 'Enter') {
      changeThemeAndToggle?.();
    }
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: keyboard interaction is handled by the inner <input role="switch"> via handleKeypress
    // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard handled by inner <input role="switch">
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={isDark ? 'switch to light mode' : 'switch to dark mode'}
      data-tooltip-place={popoverPlacement}
      className={classNames('jk-row gap center extend', { 'cr-pr': !loading })}
      onClick={changeThemeAndToggle}
    >
      {loading ? (
        <SpinIcon />
      ) : (
        <div className={classNames('jk-theme-toggle-input container--toggle', { 'cr-pr': !loading })} title="color mode toggle">
          <input
            role="switch"
            aria-checked={isDark}
            onKeyDown={handleKeypress}
            type="checkbox"
            id="toggle"
            className="toggle--checkbox"
            checked={!isDark}
            readOnly
          />
          <label
            htmlFor="toggle"
            className={classNames('toggle--label', { 'cr-pr': !loading })}
            // aria-label={ariaLabel}
          >
            <span className="toggle--label-background"></span>
          </label>
        </div>
      )}
      {isOpen && (
        <div className="flex-1 ta-lt">
          <T className="tt-se">{isDark ? 'dark mode' : 'light mode'}</T>
        </div>
      )}
    </div>
  );
};

export interface SettingsSectionProps {
  isMobile: boolean;
  isOpen: boolean;
  helpOpen: boolean;
  setHelpOpen: Dispatch<boolean>;
  popoverPlacement: 'top' | 'bottom' | 'right';
  moreApps?: ReactNode;
}

export const SettingsSection = (props: SettingsSectionProps) => {
  const { isMobile, isOpen, helpOpen, setHelpOpen, popoverPlacement, moreApps } = props;

  const userPreferredTheme = useUserStore((state) => state.user.settings[ProfileSetting.THEME]);
  const { Image } = useUIStore((store) => store.components);
  const viewPortSize = usePageStore((store) => store.viewPort.screen);

  const isDark = userPreferredTheme === Theme.DARK;

  const margin = (popoverPlacement === 'right' && isOpen) || !(viewPortSize === 'md' && popoverPlacement === 'bottom');

  const helpContent = (
    <Div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={isOpen ? '' : 'help'}
      data-tooltip-place={popoverPlacement}
      className="jk-row gap center extend"
      onClick={() => setHelpOpen(true)}
      onKeyDownClick
    >
      <HelpIcon />
      {isOpen && (
        <div className="flex-1 ta-lt">
          <T className="tt-se">help</T>
        </div>
      )}
    </Div>
  );

  return (
    <>
      <LanguageSetting isOpen={isOpen} small={margin} popoverPlacement={popoverPlacement} />
      <ThemeSetting isOpen={isOpen} small={margin} popoverPlacement={popoverPlacement} />
      <Modal isOpen={helpOpen && !isMobile} onClose={() => setHelpOpen(false)} className="wh-ao">
        <div className="jk-col nowrap extend stretch jk-pg-md">
          <div className="jk-row">
            <HelpSection />
            <div className="jk-row ">
              <Image src="https://images.juki.pub/c/juki-help-2-image.svg" alt="help" height={220} width={220} />
            </div>
          </div>
        </div>
      </Modal>
      {helpContent}
      {moreApps && (
        <Popover
          popoverClassName="bc-sf-hi jk-br-ie elevation-1"
          content={
            <div className="jk-col gap more-apps-popover jk-pg-sm">
              <div className="fw-bd tt-se">
                <T>more apps</T>
              </div>
              <div className={classNames('jk-col gap stretch', { 'cr-tx-ht': !isDark, 'cr-b2': isDark })}>{moreApps}</div>
            </div>
          }
          placement={popoverPlacement}
          offset={4}
        >
          <div
            // data-tooltip-id="jk-tooltip"
            // data-tooltip-content={isOpen ? '' : 'more apps'}
            // data-tooltip-place={popoverPlacement}
            // data-tooltip-t-class-name="tt-se"
            className="jk-row gap center extend cr-pr"
          >
            <AppsIcon />
            {isOpen && (
              <div className="flex-1 ta-lt">
                <T className="tt-se">more apps</T>
              </div>
            )}
          </div>
        </Popover>
      )}
    </>
  );
};
