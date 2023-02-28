import { DataViewMode, Language, MenuViewMode, ProfileSetting, Theme, UserProfileResponseDTO } from '@juki-team/commons';
import React from 'react';
import {
  Button,
  DarkModeIcon,
  FlagEnImage,
  FlagEsImage,
  InputRadio,
  InputToggle,
  LightModeIcon,
  LineLoader,
  LockIcon,
  T,
  VerticalSplitIcon,
  ViewHeadlineIcon,
  ViewModuleIcon,
} from '../../components';
import { classNames } from '../../helpers';
import { useJukiUserToggleSetting } from '../../hooks';

interface UserProfileSettingsProps {
  user: UserProfileResponseDTO,
  onClickUpdatePassword: () => void,
}

export function UserProfileSettings({ user, onClickUpdatePassword }: UserProfileSettingsProps) {
  
  const {
    loading,
    toggleSetting,
    [ProfileSetting.LANGUAGE]: preferredLanguage,
    [ProfileSetting.THEME]: preferredTheme,
    [ProfileSetting.DATA_VIEW_MODE]: preferredDataViewMode,
    [ProfileSetting.MENU_VIEW_MODE]: preferredMenuViewMode,
    [ProfileSetting.NEWSLETTER_SUBSCRIPTION]: newsletterSubscription,
  } = useJukiUserToggleSetting();
  
  return (
    <div className="jk-row gap top stretch">
      <div className="jk-col top extend">
        <h3><T>preferences</T></h3>
        <div
          className="jk-col stretch gap bc-we jk-border-radius-inline jk-pad-md br-g6 pn-re"
          style={{ width: 300 }}
        >
          {loading && <LineLoader />}
          <div className="jk-col gap left stretch">
            {[
              {
                key: ProfileSetting.LANGUAGE,
                title: 'language',
                value: preferredLanguage,
                valueFirst: Language.EN,
                labelFirst: (
                  <div className="jk-row nowrap">
                    <div className="jk-row" style={{ width: 24, height: 24 }}><FlagEnImage /></div>
                    &nbsp;<T className="ws-np tt-se">english</T>
                  </div>
                ),
                valueSecond: Language.ES,
                labelSecond: (
                  <div className="jk-row nowrap">
                    <div className="jk-row" style={{ width: 24, height: 24 }}><FlagEsImage /></div>
                    &nbsp;<T className="ws-np tt-se">español</T>
                  </div>
                ),
              },
              {
                key: ProfileSetting.THEME,
                title: 'theme',
                value: preferredTheme,
                valueFirst: Theme.LIGHT,
                labelFirst: (
                  <div className="jk-row nowrap">
                    <LightModeIcon />
                    <T className="ws-np tt-se">light</T>
                  </div>
                ),
                valueSecond: Theme.DARK,
                labelSecond: (
                  <div className="jk-row nowrap">
                    <DarkModeIcon />
                    <T className="ws-np tt-se">dark</T>
                  </div>
                ),
              },
              {
                key: ProfileSetting.DATA_VIEW_MODE,
                title: 'data view',
                value: preferredDataViewMode,
                valueFirst: DataViewMode.ROWS,
                labelFirst: (
                  <div className="jk-row nowrap">
                    <ViewHeadlineIcon />
                    <T className="ws-np tt-se">rows</T>
                  </div>
                ),
                valueSecond: DataViewMode.CARDS,
                labelSecond: (
                  <div className="jk-row nowrap">
                    <ViewModuleIcon />
                    <T className="ws-np tt-se">cards</T>
                  </div>
                ),
              },
              {
                key: ProfileSetting.MENU_VIEW_MODE,
                title: 'menu view',
                value: preferredMenuViewMode,
                valueFirst: MenuViewMode.VERTICAL,
                labelFirst: (
                  <div className="jk-row nowrap">
                    <VerticalSplitIcon rotate={180} />
                    <T className="ws-np tt-se">vertical</T>
                  </div>
                ),
                valueSecond: MenuViewMode.HORIZONTAL,
                labelSecond: (
                  <div className="jk-row nowrap">
                    <VerticalSplitIcon rotate={-90} />
                    <T className="ws-np tt-se">horizontal</T>
                  </div>
                ),
              },
            ].map(({ title, key, value, valueFirst, labelFirst, valueSecond, labelSecond }) => (
              <div className="jk-col stretch left gap" style={{ width: '100%' }} key={key}>
                <div className="jk-row left extend">
                  <T className="tt-se tx-l fw-bd ta-ed ws-np">{title}</T>:&nbsp;
                </div>
                <div className="jk-row stretch gap space-between block extend">
                  <div className="jk-row gap left nowrap">
                    <InputRadio
                      disabled={loading}
                      checked={value === valueFirst}
                      onChange={() => toggleSetting([{ key, value: valueFirst }])}
                      label={labelFirst}
                    />
                  </div>
                  <div className="jk-row gap left nowrap">
                    <InputRadio
                      disabled={loading}
                      checked={value === valueSecond}
                      onChange={() => toggleSetting([{ key, value: valueSecond }])}
                      label={labelSecond}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <div className="jk-col left gap nowrap jk-pad-sm" style={{ width: '100%' }}>
              <Button
                size="small"
                type="outline"
                onClick={() => toggleSetting([
                  { key: ProfileSetting.LANGUAGE, value: Language.EN },
                  { key: ProfileSetting.THEME, value: Theme.LIGHT },
                  { key: ProfileSetting.DATA_VIEW_MODE, value: DataViewMode.ROWS },
                  { key: ProfileSetting.MENU_VIEW_MODE, value: MenuViewMode.VERTICAL },
                ])}
              >
                <T>restore default preferences</T>
              </Button>
            </div>
            {/*<div className="jk-divider" />*/}
          
          </div>
        </div>
      </div>
      <div className="jk-col top extend">
        <h3><T>actions</T></h3>
        <div className="jk-col stretch gap bc-we jk-border-radius-inline jk-pad-md br-g6" style={{ width: 300 }}>
          {user?.canUpdatePassword && (
            <Button size="small" icon={<LockIcon />} onClick={onClickUpdatePassword} extend>
              <T className="ws-np">update password</T>
            </Button>
          )}
          <div className="jk-col left gap nowrap" style={{ width: '100%' }}>
            <div className="jk-row left extend">
              <T className="tt-se tx-l fw-bd ta-ed ws-np">newsletter subscription</T>:&nbsp;
            </div>
            <div className="jk-row stretch gap space-between block extend">
              <div className="jk-row gap left nowrap">
                <InputToggle
                  disabled={loading}
                  checked={newsletterSubscription}
                  onChange={() => toggleSetting([
                    { key: ProfileSetting.NEWSLETTER_SUBSCRIPTION, value: !newsletterSubscription },
                  ])}
                  leftLabel={
                    <div className={classNames('jk-row nowrap', { 'fw-bd': !newsletterSubscription })}>
                      <T className="ws-np tt-se">no subscribed</T>
                    </div>
                  }
                  rightLabel={
                    <div className={classNames('jk-row nowrap', { 'fw-bd': newsletterSubscription })}>
                      <T className="ws-np tt-se">subscribed</T>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
