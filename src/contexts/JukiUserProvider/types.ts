import { UserPingType } from '@juki-team/commons';

export type DeviceType = { label: string, isMobile: boolean, isBrowser: boolean, type: string, osLabel: string };

export type UserDataType = UserPingType & {
  connectionId: string;
}

export interface JukiUserProviderProps {
}
