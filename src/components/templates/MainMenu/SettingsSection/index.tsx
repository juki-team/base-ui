import { Language, ProfileSetting, Theme } from '@juki-team/commons';
import React, { Dispatch, KeyboardEventHandler, ReactNode, SyntheticEvent } from 'react';
import { classNames } from '../../../../helpers';
import { useJukiUI } from '../../../../hooks/useJukiUI';
import { useJukiUserSettings } from '../../../../hooks/useJukiUser';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { Modal, Popover, T } from '../../../atoms';
import { AppsIcon, FlagEnImage, FlagEsImage, HelpIcon, LoadingIcon, SpinIcon } from '../../../server';
import { HelpSection } from '../../HelpSection/HelpSection';

export const LanguageSetting = ({ isOpen, small, popoverPlacement }: {
  isOpen: boolean,
  small: boolean,
  popoverPlacement: 'top' | 'bottom' | 'right',
}) => {
  
  const { loading, setSettings, [ProfileSetting.LANGUAGE]: preferredLanguage } = useJukiUserSettings();
  
  const isEs = preferredLanguage === Language.ES;
  
  return (
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={isOpen ? '' : isEs ? 'english' : 'español'}
      data-tooltip-place={popoverPlacement}
      data-tooltip-t-class-name="tt-se"
      className={classNames('jk-row gap center extend', { 'cr-pr': !loading })}
      onClick={loading ? undefined : () => setSettings([
        {
          key: ProfileSetting.LANGUAGE,
          value: preferredLanguage === Language.EN ? Language.ES : Language.EN,
        },
      ])}
    >
      {loading
        ? <LoadingIcon />
        : (isEs
            ? <div className="jk-row" style={{ width: 24, height: 24 }}><FlagEnImage /></div>
            : <div className="jk-row" style={{ width: 24, height: 24 }}><FlagEsImage /></div>
        )}
      {isOpen && (
        <div className="flex-1 ta-lt">
          <T className="tt-se">{isEs ? 'english' : 'español'}</T>
        </div>
      )}
    </div>
  );
};

export const ThemeSetting = ({ isOpen, small, popoverPlacement }: {
  isOpen: boolean,
  small: boolean,
  popoverPlacement: 'top' | 'bottom' | 'right',
}) => {
  
  const { loading, setSettings, [ProfileSetting.THEME]: preferredTheme } = useJukiUserSettings();
  
  const isDark = preferredTheme === Theme.DARK;
  
  const changeThemeAndToggle = loading ? undefined : (event?: SyntheticEvent) => {
    event?.stopPropagation();
    event?.preventDefault();
    void setSettings([
      {
        key: ProfileSetting.THEME,
        value: preferredTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
      },
    ]);
  };
  
  const handleKeypress: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.code === 'Enter') {
      changeThemeAndToggle?.();
    }
  };
  
  return (
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={isOpen ? '' : isDark ? 'switch to light mode' : 'switch to dark mode'}
      data-tooltip-place={popoverPlacement}
      data-tooltip-t-class-name="tt-se"
      className={classNames('jk-row gap center extend', { 'cr-pr': !loading })}
      onClick={changeThemeAndToggle}
    >
      {loading
        ? <SpinIcon />
        : (
          <div
            className={classNames('jk-theme-toggle-input container--toggle', { 'cr-pr': !loading })}
            title="color mode toggle"
          >
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
          <T className="tt-se">{isDark ? 'light mode' : 'dark mode'}</T>
        </div>
      )}
    </div>
  );
};

export interface SettingsSectionProps {
  isMobile: boolean,
  isOpen: boolean,
  helpOpen: boolean,
  setHelpOpen: Dispatch<boolean>,
  popoverPlacement: 'top' | 'bottom' | 'right',
  moreApps?: ReactNode,
}

export const SettingsSection = (props: SettingsSectionProps) => {
  
  const { isMobile, isOpen, helpOpen, setHelpOpen, popoverPlacement, moreApps } = props;
  
  const userPreferredTheme = useUserStore(state => state.user.settings[ProfileSetting.THEME]);
  const { viewPortSize, components: { Image } } = useJukiUI();
  
  const isDark = userPreferredTheme === Theme.DARK;
  
  const margin = (popoverPlacement === 'right' && isOpen) || !(viewPortSize === 'md' && popoverPlacement === 'bottom');
  
  const helpContent = (
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={isOpen ? '' : 'help'}
      data-tooltip-place={popoverPlacement}
      data-tooltip-t-class-name="tt-se"
      className="jk-row gap center extend cr-pr"
      onClick={() => setHelpOpen(true)}
    >
      <HelpIcon />
      {isOpen && (
        <div className="flex-1 ta-lt">
          <T className="tt-se">help</T>
        </div>
      )}
    </div>
  );
  
  return (
    <>
      <LanguageSetting
        isOpen={isOpen}
        small={margin}
        popoverPlacement={popoverPlacement}
      />
      <ThemeSetting
        isOpen={isOpen}
        small={margin}
        popoverPlacement={popoverPlacement}
      />
      <Modal
        isOpen={helpOpen && !isMobile}
        onClose={() => setHelpOpen(false)}
        className="wh-ao"
      >
        <div className="jk-col nowrap extend stretch jk-pg-md">
          <div className="jk-row">
            <HelpSection />
            <div className="jk-row ">
              <Image
                src="https://images.juki.pub/c/juki-help-2-image.svg"
                alt="help"
                height={220}
                width={220}
              />
            </div>
          </div>
        </div>
      </Modal>
      {helpContent}
      {moreApps && (
        <Popover
          popoverClassName="bc-we jk-br-ie elevation-1"
          content={
            <div className="jk-col gap more-apps-popover jk-pg-sm">
              <div className="fw-bd tt-se"><T>more apps</T></div>
              <div className={classNames('jk-col gap stretch', { 'cr-py': !isDark, 'cr-b2': isDark })}>
                {moreApps}
              </div>
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
