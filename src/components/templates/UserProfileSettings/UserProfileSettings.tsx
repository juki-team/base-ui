import { DataViewMode, Language, MenuViewMode, ProfileSetting, Theme } from '@juki-team/commons';
import { classNames } from '../../../helpers';
import { Button, InputRadio, InputToggle, Select, T } from '../../atoms';
import { useJukiUserSettings } from '../../hooks/useJukiUser';
import {
  DarkModeIcon,
  FlagEnImage,
  FlagEsImage,
  LightModeIcon,
  LineLoader,
  LockIcon,
  VerticalSplitIcon,
  ViewHeadlineIcon,
  ViewModuleIcon,
} from '../../server';
import type { UserProfileSettingsProps } from './types';

export function UserProfileSettings({ user, onClickUpdatePassword }: UserProfileSettingsProps) {
  
  const {
    loading,
    setSettings,
    [ProfileSetting.LANGUAGE]: preferredLanguage,
    [ProfileSetting.THEME]: preferredTheme,
    [ProfileSetting.DATA_VIEW_MODE]: preferredDataViewMode,
    [ProfileSetting.MENU_VIEW_MODE]: preferredMenuViewMode,
    [ProfileSetting.NEWSLETTER_SUBSCRIPTION]: newsletterSubscription,
    [ProfileSetting.TIME_ZONE]: preferredTimeZone,
    [ProfileSetting.FONT_SIZE]: preferredFontSize,
  } = useJukiUserSettings();
  
  return (
    <div className="jk-row gap top stretch">
      <div className="jk-col top extend">
        <h3><T className="tt-se">preferences</T></h3>
        <div className="jk-col stretch gap bc-we jk-br-ie jk-pg-md br-g6 pn-re">
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
                <div className="jk-col stretch gap space-between">
                  <div className="jk-row gap left nowrap">
                    <InputRadio
                      disabled={loading}
                      checked={value === valueFirst}
                      onChange={() => setSettings([ { key, value: valueFirst } ])}
                      label={labelFirst}
                    />
                  </div>
                  <div className="jk-row gap left nowrap">
                    <InputRadio
                      disabled={loading}
                      checked={value === valueSecond}
                      onChange={() => setSettings([ { key, value: valueSecond } ])}
                      label={labelSecond}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="jk-col stretch left gap" style={{ width: '100%' }}>
              <div className="jk-row left extend">
                <T className="tt-se tx-l fw-bd ta-ed ws-np">time zone</T>:&nbsp;
              </div>
              <div className="jk-col stretch gap space-between">
                <Select
                  disabled={loading}
                  options={Intl.supportedValuesOf('timeZone')
                    .map((timeZone) => ({
                      value: timeZone,
                      label: <div className="jk-row left">
                        {timeZone}&nbsp;
                        ({Intl.DateTimeFormat('en-US', {
                        timeZone: timeZone,
                        timeZoneName: 'short',
                      }).formatToParts(new Date()).find(p => p.type === 'timeZoneName')?.value})
                      </div>,
                    }))}
                  selectedOption={{ value: preferredTimeZone }}
                  onChange={({ value }) => setSettings([ { key: ProfileSetting.TIME_ZONE, value } ])}
                />
              </div>
            </div>
            <div className="jk-col stretch left gap" style={{ width: '100%' }}>
              <div className="jk-row left extend">
                <T className="tt-se tx-l fw-bd ta-ed ws-np">font size</T>:&nbsp;
              </div>
              <div className="jk-col stretch gap space-between">
                <Select
                  disabled={loading}
                  options={[ 14, 16, 18, 20, 24, 28, 32 ].map((value) => ({
                    value,
                    label: <div>{value} <T>pixels</T></div>,
                  }))}
                  selectedOption={{ value: preferredFontSize }}
                  onChange={({ value }) => setSettings([ { key: ProfileSetting.FONT_SIZE, value } ])}
                />
              </div>
            </div>
            
            <div className="jk-col left gap nowrap jk-pg-sm" style={{ width: '100%' }}>
              <Button
                size="small"
                type="light"
                onClick={() => setSettings([
                  { key: ProfileSetting.LANGUAGE, value: Language.EN },
                  { key: ProfileSetting.THEME, value: Theme.LIGHT },
                  { key: ProfileSetting.DATA_VIEW_MODE, value: DataViewMode.ROWS },
                  { key: ProfileSetting.MENU_VIEW_MODE, value: MenuViewMode.VERTICAL },
                ])}
              >
                <T className="tt-se">restore default preferences</T>
              </Button>
            </div>
            {/*<div className="jk-divider" />*/}
          
          </div>
        </div>
      </div>
      <div className="jk-col top extend">
        <h3><T className="tt-se">actions</T></h3>
        <div className="jk-col stretch gap bc-we jk-br-ie jk-pg-md br-g6">
          {user?.canUpdatePassword && (
            <Button size="small" icon={<LockIcon />} onClick={onClickUpdatePassword} expand>
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
                  onChange={(newValue) => setSettings([
                    { key: ProfileSetting.NEWSLETTER_SUBSCRIPTION, value: newValue },
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
