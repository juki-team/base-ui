import { Language, ProfileSetting, Theme } from '@juki-team/commons';
import React, { Dispatch, ReactNode } from 'react';
import { classNames } from '../../../../helpers';
import { useJukiUI } from '../../../../hooks/useJukiUI';
import { useJukiUserSettings } from '../../../../hooks/useJukiUser';
import { useUserStore } from '../../../../stores/user/useUserStore';
import {
  AppsIcon,
  DarkModeIcon,
  FlagEnImage,
  FlagEsImage,
  HelpIcon,
  LightModeIcon,
  LoadingIcon,
  Modal,
  Popover,
  T,
} from '../../../atoms';
import { HelpSection } from '../../HelpSection';

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
      className="jk-row center extend language-setting"
      onClick={loading ? undefined : () => setSettings([
        {
          key: ProfileSetting.LANGUAGE,
          value: preferredLanguage === Language.EN ? Language.ES : Language.EN,
        },
      ])}
      style={{ cursor: loading ? 'initial' : 'pointer' }}
    >
      {loading
        ? <LoadingIcon style={{ margin: '0 var(--pad-xt)' }} />
        : (
          isEs
            ? <div
              className="jk-row"
              style={{ ...{ width: 24, height: 24 }, ...(small ? { margin: '0 var(--pad-xt)' } : {}) }}
            >
              <FlagEnImage />
            </div>
            : <div
              className="jk-row"
              style={{ ...{ width: 24, height: 24 }, ...(small ? { margin: '0 var(--pad-xt)' } : {}) }}
            >
              <FlagEsImage />
            </div>
        )}
      {isOpen && (
        <div style={{ marginRight: 'var(--pad-xt)' }} className="flex-1 ta-cr">
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
  
  return (
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={isOpen ? '' : isDark ? 'light mode' : 'dark mode'}
      data-tooltip-place={popoverPlacement}
      data-tooltip-t-class-name="tt-se"
      className="jk-row center extend theme-setting"
      onClick={loading ? undefined : () => setSettings([
        {
          key: ProfileSetting.THEME,
          value: preferredTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
        },
      ])}
      style={{ cursor: loading ? 'initial' : 'pointer' }}
    >
      {loading
        ? <LoadingIcon style={{ margin: '0 var(--pad-xt)' }} />
        : (
          isDark
            ? <LightModeIcon style={small ? { margin: '0 var(--pad-xt)' } : undefined} />
            : <DarkModeIcon style={small ? { margin: '0 var(--pad-xt)' } : undefined} />
        )}
      {isOpen && (
        <div style={{ marginRight: 'var(--pad-xt)' }} className="flex-1 ta-cr">
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
      className="jk-row center extend"
      onClick={() => setHelpOpen(true)}
    >
      <HelpIcon style={margin ? { margin: '0 var(--pad-xt)' } : undefined} />
      {isOpen && (
        <div style={{ marginRight: 'var(--pad-xt)' }} className="flex-1 ta-cr">
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
          content={
            <div className="jk-col gap more-apps-popover jk-pg-sm jk-br-ie bc-we elevation-1">
              <div className="fw-bd tt-se"><T>more apps</T></div>
              <div className={classNames('jk-col gap stretch', { 'cr-py': !isDark, 'cr-b2': isDark })}>
                {moreApps}
              </div>
            </div>
          }
          triggerOn="click"
          placement={popoverPlacement}
          offset={4}
        >
          <div
            data-tooltip-id="jk-tooltip"
            data-tooltip-content={isOpen ? '' : 'more apps'}
            data-tooltip-place={popoverPlacement}
            data-tooltip-t-class-name="tt-se"
            className="jk-row center extend"
          >
            <AppsIcon style={margin ? { margin: '0 var(--pad-xt)' } : undefined} />
            {isOpen && (
              <div style={{ marginRight: 'var(--pad-xt)' }} className="flex-1 ta-cr">
                <T className="tt-se">more apps</T>
              </div>
            )}
          </div>
        </Popover>
      )}
    </>
  );
};
