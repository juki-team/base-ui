import { Language, ProfileSetting, Theme } from '@juki-team/commons';
import React, { Dispatch, ReactNode } from 'react';
import { classNames } from '../../../../helpers';
import { useJukiUI, useJukiUser, useJukiUserToggleSetting } from '../../../../hooks';
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

export const LanguageSetting = ({ isOpen, small }: { isOpen: boolean, small: boolean }) => {
  
  const { loading, toggleSetting, [ProfileSetting.LANGUAGE]: preferredLanguage } = useJukiUserToggleSetting();
  
  const isEs = preferredLanguage === Language.ES;
  
  return (
    <div
      className="jk-row center extend"
      onClick={loading ? undefined : () => toggleSetting([
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
          {isEs
            ? <T className="tt-se">english</T>
            : <T className="tt-se">español</T>}
        </div>
      )}
    </div>
  );
};

export const ThemeSetting = ({ isOpen, small }: { isOpen: boolean, small: boolean }) => {
  
  const { loading, toggleSetting, [ProfileSetting.THEME]: preferredTheme } = useJukiUserToggleSetting();
  
  const isDark = preferredTheme === Theme.DARK;
  
  return (
    <div
      className="jk-row center extend"
      onClick={loading ? undefined : () => toggleSetting([
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
          {isDark
            ? <T className="tt-se">light mode</T>
            : <T className="tt-se">dark mode</T>}
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
  
  const { user: { settings: { [ProfileSetting.THEME]: preferredTheme } } } = useJukiUser();
  const { viewPortSize, components: { Image } } = useJukiUI();
  
  const isDark = preferredTheme === Theme.DARK;
  
  const margin = (popoverPlacement === 'right' && isOpen) || !(viewPortSize === 'md' && popoverPlacement === 'bottom');
  
  return (
    <>
      <LanguageSetting
        isOpen={isOpen}
        small={margin}
      />
      <ThemeSetting
        isOpen={isOpen}
        small={margin}
      />
      <Modal
        isOpen={helpOpen && !isMobile}
        onClose={() => setHelpOpen(false)}
        closeWhenClickOutside
        className="wh-ao"
      >
        <div className="jk-col nowrap extend stretch jk-pad-md">
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
      <div className="jk-row center extend" onClick={() => setHelpOpen(true)}>
        <HelpIcon style={margin ? { margin: '0 var(--pad-xt)' } : undefined} />
        {isOpen && (
          <div style={{ marginRight: 'var(--pad-xt)' }} className="flex-1 ta-cr">
            <T className="tt-se">help</T>
          </div>
        )}
      </div>
      {moreApps && (
        <Popover
          content={
            <div className="jk-col gap more-apps-popover jk-pad-sm">
              <div className="fw-bd tt-se"><T>more apps</T></div>
              <div className={classNames('jk-col gap stretch', { 'cr-py': !isDark, 'cr-b2': isDark })}>
                {moreApps}
              </div>
            </div>
          }
          triggerOn="click"
          placement={popoverPlacement}
        >
          <div className="jk-row center extend">
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
