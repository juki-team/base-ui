import { UserPingType } from '@juki-team/commons';

export type DeviceType = { label: string, isMobile: boolean, isBrowser: boolean, type: string, osLabel: string };

export type UserDataType = UserPingType;

export interface JukiUserProviderProps {
}
