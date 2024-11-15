export type DeviceType = { label: string, isMobile: boolean, isBrowser: boolean, type: string, osLabel: string };

export interface JukiUserProviderProps {
  serviceApiUrl: string,
  socketServiceUrl: string,
  serviceApiV2Url: string,
  tokenName: string,
}
